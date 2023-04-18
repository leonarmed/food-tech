import React from "react";
import { Box, Modal, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 400, sm: 600 },
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({
  children,
  open,
  modalOpen,
  modalClose,
  type,
}) {
  return (
    <div className="modal-container">
      {!type && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={modalOpen}
          sx={{
            position: "relative",
            right: 20,
            transform: "translateY(-5px)",
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <Modal
        open={open}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
