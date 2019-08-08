import React, { useState, useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({errors, touched, values, status}) => {
    const [users, setUsers] = useState([])
    console.log(users);

    useEffect(() => {
        if (status) {
          setUsers([...users, status]);
        }
      }, [status]);
    
    return(
        <div className="format">
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
            {users.map(user => (
        <p key={user.id}>{user.username}</p>
      ))}
        </div>
    )
};

const FormikForm = withFormik({
    mapPropsToValues({username, email, password, terms}) {
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required("Name!"),
        email: Yup.string().required("Email!")
    }),

    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users_", values)
            .then(res => {setStatus(res.data)})
            .catch(err => console.log(err.response))
    }
})(UserForm);

export default FormikForm;