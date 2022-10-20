import React, { useContext } from "react";

import { createBlog } from "../libs/CreateBlog";
import ModalContext from "../store/modal-context";
import BlogsList from "../components/HomePage/BlogsList";
import NewBlogForm from "../components/NewBlogForm/NewBlogForm";
import MUIModal from "../ui/Modal/MUIModal";

import { useQuery, NetworkStatus, Context } from "@apollo/client";
import GET_ALL_BLOGS from "../queries/getAllBlogs";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import CssBaseline from "@mui/material/CssBaseline";
import { ContentfulBlog, BlogCollection } from "../libs/interfaces";

function HomePage() {
  const modalContext: Context = useContext(ModalContext);
  const { data, loading, error, refetch, networkStatus } = useQuery<BlogCollection>(
    GET_ALL_BLOGS,
    {
      fetchPolicy: "no-cache", // Doesn't check cache before making a network request
      notifyOnNetworkStatusChange: true,
    }
  );
  var blogs: ContentfulBlog[] | undefined= data?.blogCollection.blogs.map((blog) => Object.assign({}, blog));
  const style: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  if (loading || networkStatus === NetworkStatus?.refetch) {
    return (
      <div style={style}>
        <BeatLoader color="#ff1a1a" />
      </div>
    );
  }

  if(error) {
    toast.error("Error happened, Please try again");
    modalContext.modalCloseHandler();
  }

  type submitHandlerParams = {
    title: string,
    author: string,
    description: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  }
  async function submitHandler({ title, author, description, setIsLoading }: submitHandlerParams) {
    setIsLoading(true);
    const obj: {status: string} = await createBlog({
      title,
      author,
      description,
    });
    setIsLoading(false);
    if (obj?.status == "success") {
      onSuccess();
      modalContext.modalCloseHandler();
    } else {
      onError();
      modalContext.modalCloseHandler();
    }
  }

  function onError() {
    refetch();
    toast.error("Error happened, Please try again");
  }

  function onSuccess() {
    refetch();
    toast.success("Blog Post Created Successfully!");
  }

  const content = () => {
    if (loading) {
      return <p>Loading ...</p>;
    } else {submitHandler
      return (
        <div>
          <CssBaseline />
          <ToastContainer />
          {modalContext.isOpen && (
            <MUIModal
              open={modalContext.isOpen}
              onCloseHandler={modalContext.modalCloseHandler}
            >
              <NewBlogForm submitHandler={submitHandler} title={undefined} author={undefined} description={undefined} action={"create"}/>
            </MUIModal>
          )}
          <BlogsList blogs={blogs} />
        </div>
      );
    }
  };

  return content();
}

export default HomePage;
