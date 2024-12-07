import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import { nanoid } from "@reduxjs/toolkit";
import * as yup from "yup";


function Content() {
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

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

  const submit = (values, { resetForm }) => {
    // const contact = { ...values, id: nanoid() };
    console.log(values); // Output the form values with generated ID
    resetForm(); // Reset form to initial values
    closeModal(); // Close the modal
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button variant="outlined" color="primary" onClick={handleModal}>
          Add Contact
        </Button>
      </Box>
      <Formik initialValues={init} validationSchema={validation} onSubmit={submit}>
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Modal open={open} onClose={closeModal}>
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
                  sx={{ marginBottom: "10px" }}
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
                  sx={{ marginBottom: "10px" }}
                />
                <TextField
                  id="id"
                  label="id"
                  name="id"
                  value={values.id}
                  disabled
                  fullWidth
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Submit
                </Button>
              </Form>
            </Box>
          </Modal>
        )}
      </Formik>
    </>
  );
}

export default Content;
