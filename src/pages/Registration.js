import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
    const navigate = useNavigate();
    
    const initialValues = {
      username: "",
      password: "",
    }

    const validationSchema = Yup.object().shape({
      username: Yup.string().min(3).max(15).required("Required"),
      password: Yup.string().min(4).max(20).required("Required"),
    });

    const onSubmit = (data) => {
      axios.post("http://localhost:3001/auth", data).then(() => {
        navigate("/login");
      });
    };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
          <label htmlFor='username'>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field name="username" id="inputCreatePost" placeholder="Ex. John123..." />

          <label htmlFor='password'>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field name="password" id="inputCreatePost" type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
