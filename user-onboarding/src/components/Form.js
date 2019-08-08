import React from "react";
import { withFormik, Form, Field } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

const userForm = ({errors, touched, values}) => {
    return(
        <Form>
            <Field type="text" name="username"/>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field type="email" name="email"/>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type="password" name="password"/>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type="checkbox" name="terms" checked={values.terms}/>
            <h3>Terms of Service</h3>
            <button type="submit">Submit</button>
        </Form>
    )
}

const FormikForm = withFormik({
    mapPropsToValues({username, email, password, terms}) {
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    handleSubmit() {
        
    }
})(userForm);

export default FormikForm;