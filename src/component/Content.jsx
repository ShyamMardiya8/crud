import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Formik, Form } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addStore, addSubContact, deleteStore, editStore } from "../Slice/Slice";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: "15px",
  borderRadius: "10px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const SubContactBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9f9f9",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
}));

function Content() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(null);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const select = useSelector((state) => state.slice.store);

  const init = {
    id: nanoid(),
    name: "",
    number: "",
    subContact: [],
  };

  const validation = yup.object({
    name: yup.string().required("Name is required"),
    number: yup
      .string()
      .matches(/^\d{10}$/, "Number must be exactly 10 digits")
      .required("Number is required"),
  });

  const handleModal = () => {
    setData(null);
    setSub(null);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSub(null);
    setData(null);
  };

  const submit = (values, { resetForm }) => {
    if (data) {
      dispatch(editStore({ id: values.id, updates: values }));
    } else if (sub) {
      dispatch(addSubContact({ id: sub, values }));
    } else {
      dispatch(addStore(values));
    }
    resetForm();
    closeModal();
  };

  const handleEdit = (item) => {
    setData(item);
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteStore(id));
  };

  const handleSubContact = (id) => {
    setOpen(true);
    setData(null);
    setSub(id);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleModal}>
          Add Contact
        </Button>
      </Box>

      <Formik
        initialValues={data || init}
        validationSchema={validation}
        onSubmit={submit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Modal open={open} onClose={closeModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                bgcolor: "background.paper",
                borderRadius: "10px",
                boxShadow: 24,
                padding: "20px",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                {data ? "Edit Contact" : sub ? "Add Sub-Contact" : "Add Contact"}
              </Typography>
              <Form>
                <TextField
                  id="name"
                  label="Name"
                  value={values.name}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ marginBottom: "15px" }}
                />
                <TextField
                  id="number"
                  label="Number"
                  value={values.number}
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  sx={{ marginBottom: "15px" }}
                />
                {!sub && (
                  <TextField
                    id="id"
                    label="ID"
                    value={values.id}
                    disabled
                    fullWidth
                    sx={{ marginBottom: "15px" }}
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  {data
                    ? "Save Changes"
                    : sub
                    ? "Add Sub-Contact"
                    : "Add Contact"}
                </Button>
              </Form>
            </Box>
          </Modal>
        )}
      </Formik>

      {select &&
        select.map((item) => (
          <StyledCard key={item.id}>
            <CardContent>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Contact Number: {item.number}
              </Typography>
              {item.subContact?.length > 0 && (
                <SubContactBox>
                  <Typography variant="subtitle2">Sub-Contacts:</Typography>
                  {item.subContact.map((sub) => (
                    <Typography key={sub.id} variant="body2">
                      - {sub.name} ({sub.number})
                    </Typography>
                  ))}
                </SubContactBox>
              )}
            </CardContent>
            <CardActions>
              <IconButton
                color="primary"
                onClick={() => handleSubContact(item.id)}
              >
                <AddIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleEdit(item)}>
                <ModeEditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(item.id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </StyledCard>
        ))}
    </>
  );
}

export default Content;
  