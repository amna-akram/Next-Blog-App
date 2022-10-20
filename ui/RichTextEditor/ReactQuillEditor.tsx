import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import classes from "./ReactQuillEditor.module.css";

function ReactQuillEditor({ onDescriptionChangeHandler, value }) {
  const formats: string[] = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "color",
    "background-color",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "code-block",
  ];
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: ["normal", "large", "huge"] }],
        [{ color: [] }],
        [{ background: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "code-block"],
      ],
      placeholder: "Compose an epic...",
      "emoji-toolbar": true,
      "emoji-textarea": true,
      "emoji-shortname": true,
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      onChange={onDescriptionChangeHandler}
      bounds={classes.scrolling_container}
      scrollingContainer={classes.parent_scroll}
      value={value}
    >
      <div className={classes.editing_area} />
    </ReactQuill>
  );
}

export default ReactQuillEditor;
