import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField'
import {nanoid} from '@reduxjs/toolkit'

function Content() {
  const [number, setNumber] = useState("")
  const [name, setName] = useState("")
  const [open, isOpen] = useState(false);
  const id = nanoid()

  const handleModal = () => {
    isOpen(true);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" color="primary" onClick={handleModal}>
          Add Contact
        </Button>
      </Box>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
            <Box sx={{ width: "100%"}}>
            <TextField
              id="name"
              label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{width: "100%", marginBottom: "10px"}}
            />
            <TextField
              id="number"
              label="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              sx={{width: "100%", marginBottom: "10px"}}
            />
            <TextField
              id="number"
              label="number"
              value={id}
              disabled
              sx={{width: "100%", marginBottom: "10px"}}
            />
            <Button variant="contained" color="primary" >
              Submit
            </Button>
            </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Content;
