import React, { useRef, useState } from "react";

import { BounceLoader } from "react-spinners";
import { Card, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import classes from "./NewBlogForm.module.css";
import ReactQuillEditor from "../../ui/RichTextEditor/ReactQuillEditor";

type FormProps = {
  title: string | undefined,
  author: string | undefined,
  description: string | undefined,
  action: string,
  submitHandler: Function,
}
function NewBlogForm(props: FormProps) {
  const [isLoading, setIsLoading]: [false, React.Dispatch<React.SetStateAction<false>>] = useState(false);

  const titleInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const authorInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  function onDescriptionChangeHandler(content: string) {
    htmlText = content;
  }

  const style: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  if (isLoading) {
    return (
      <div style={style}>
        <BounceLoader color="#702963" />
      </div>
    );
  }

  var htmlText = "";

  async function submitHandler() {
    await props.submitHandler({
      title: titleInputRef.current!.value,
      author: authorInputRef.current!.value,
      description: htmlText,
      setIsLoading: setIsLoading,
    });
  }

  return (
    <div>
      <Typography id="modal-modal-title" variant="h4" component="h2" className={classes.title}>
        {props.action == "update" ? "Update Blog" : "Add New Blog" }
        </Typography>
      <Card className={classes.card}>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="title">Blog Title</label>
            <input type="text" required id="title" ref={titleInputRef} value={props.title} />
          </div>

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" required id="author" ref={authorInputRef} value={props.author} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <div className={classes.editor}>
              <ToastContainer />
              <ReactQuillEditor
                onDescriptionChangeHandler={onDescriptionChangeHandler}
                value={props.description}
              />
            </div>
          </div>
          <div className={classes.actions}>
            <button>{props.action == "update" ? "Update Blog" : "Add Blog" }</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NewBlogForm;
