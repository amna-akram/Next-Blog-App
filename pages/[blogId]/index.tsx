import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import { NextRouter, useRouter } from "next/router";
import dynamic from "next/dynamic";

import { updateBlog } from "../../libs/UpdateBlog";
import ModalContext from "../../store/modal-context";
import NewBlogForm from "../../components/NewBlogForm/NewBlogForm";
import MUIModal from "../../ui/Modal/MUIModal";

import classes from "./DetailPage.module.css";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import { BeatLoader } from "react-spinners";

import { useQuery, NetworkStatus, Context, QueryResult } from "@apollo/client";
import GET_SINGLE_BLOG from "../../queries/getSingleBlog";
import { deleteBlog } from "../../libs/DeleteBlog";

import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContentfulBlog, SingleBlog } from "../../libs/interfaces";

type BlogVar = {
  blogId: string
}
function DetailPage() {
  const modalContext: Context = useContext(ModalContext);
  const router: NextRouter = useRouter();
  const id: string = router.asPath.replace("/", "");
  const { data, loading, error, refetch, networkStatus }: QueryResult<SingleBlog, BlogVar> = useQuery<SingleBlog, BlogVar>(
    GET_SINGLE_BLOG,
    {
      variables: { blogId: id },
      fetchPolicy: "no-cache", // Doesn't check cache before making a network request
      notifyOnNetworkStatusChange: true,
    }
  );
  
  const blog: ContentfulBlog | undefined = data?.blog;
  const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<any>>] = useState(false);

  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
  const style: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  async function deleteBlogHandler() {
    setIsLoading(true);
    const status: string = await deleteBlog(id);
    if (status == "success") {
      toast.success("Blog Post Deleted Successfully!");
    } else {
      toast.error("Deletion Failed");
    }

    router.push("/");
    setIsLoading(false);
  }

  function onDeleteSubmit() {
    confirmAlert({
      title: "Confirm to submit",
      message: `Are you sure you want to delete blog "${blog?.title}"`,
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteBlogHandler(),
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  }
  function updateBlogHandler() {
    modalContext.modalOpenHandler();
  }

  type submitHandlerProps = {
    title: string,
    author: string,
    description: string,
    setIsLoading: Function
  }
  async function submitHandler({ title, author, description, setIsLoading }: submitHandlerProps ) {
    setIsLoading(true);
    const status = await updateBlog({
      id: blog?.sys?.id!,
      title,
      author,
      description,
    });
    setIsLoading(false);
    if (status == "success") {
      onSuccess();
      modalContext.modalCloseHandler();
    } else {
      onError();
      modalContext.modalCloseHandler();
    }
  }

  function onError() {
    toast.error("Update Failed, Please try again");
  }

  function onSuccess() {
    refetch();
    toast.success("Blog Post Updated Successfully!");
  }

  if (loading || isLoading || networkStatus === NetworkStatus?.refetch) {
    return (
      <div style={style}>
        <BeatLoader color="#ff1a1a" />
      </div>
    );
  }
  if (error) {
    return <p> {error.message} </p>;
  }
  return (
    <section className={classes.detail}>
      {modalContext.isOpen && (
        <MUIModal
          open={modalContext.isOpen}
          onCloseHandler={modalContext.modalCloseHandler}
        >
          <NewBlogForm
            submitHandler={submitHandler}
            title={blog!.title}
            author={blog!.author}
            description={blog!.description}
            action="update"
          />
        </MUIModal>
      )}
      <ToastContainer />
      <div className={classes.top}>
        <div className={classes.verticle}>
          <DeleteIcon
            sx={{ color: "#FF0000" }}
            className={classes.deleteIcon}
            onClick={onDeleteSubmit}
          />
          <EditTwoToneIcon
            sx={{ color: "#0437F2" }}
            className={classes.editIcon}
            onClick={updateBlogHandler}
          />
        </div>
        <div>
          <p className={classes.side_text}>
            Author: <span> {blog?.author} </span>
          </p>
          <p className={classes.side_text}>
            Publish on:
            <span>
              {moment(blog?.sys.firstPublishedAt).format("MMMM Do YYYY")}{" "}
            </span>
          </p>
          <p className={classes.side_text}>
            Last Updated:
            <span> {moment(blog?.sys.publishedAt).fromNow()} </span>
          </p>
        </div>
      </div>
      <h1 className={classes.title}>{blog?.title}</h1>
      <div className={classes.quillStyle}>
        <ReactQuill value={blog?.description} readOnly={true} theme={"bubble"}>
          <div className={classes.editing_area} />
        </ReactQuill>
      </div>
    </section>
  );
}

export default DetailPage;
