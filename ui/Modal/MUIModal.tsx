import { Modal, Box } from "@mui/material";

function MUIModal(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1500,
    height: 900,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onCloseHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {props.children}
      </Box>
    </Modal>
  );
}

export default MUIModal;
