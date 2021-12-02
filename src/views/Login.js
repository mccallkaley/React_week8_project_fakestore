
import React, { Component } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import getToken from "../api/apiBasicAuth";
import { Redirect } from "react-router";

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid e-mail format")
    .required("Required"),
  password: Yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      redirect: false,
    };
  }

  handleSubmit = async ({ email, password }) => {
    const response_object = await getToken(email, password);
    this.setState({ error: response_object.error });
    this.props.setToken(response_object.token);
    if (response_object.token) {
      this.setState({ redirect: true });
      this.props.setUser("McCall")
      console.log(response_object.token);
    }
  };

  render() {
    const styles = {
      error: { color: "red" },
    };

    return (
      <div>
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: "/",
              props: { token: localStorage.getItem("token") },
            }}
          />
        ) : (
          ""
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={(values) => {
            console.log(values);
            this.handleSubmit(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field name="email" className="form-control" />
              {errors.email && touched.email ? (
                <div style={styles.error}>{errors.email}</div>
              ) : null}

              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Field name="password" className="form-control" type="password" />
              {errors.password && touched.password ? (
                <div style={styles.error}>{errors.password}</div>
              ) : null}
              <small style={styles.error}>{this.state.error}</small>
              <br />
              <Button type="submit">Login</Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}





/*
import React, { Component } from 'react';
import * as Yup from 'yup';
import {Formik, Form, Field} from 'formik';
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router";
import axios from 'axios';
// import { render } from '@testing-library/react';


const formSchema = Yup.object().shape({
    "username": Yup.string().required("Required"),

    "password": Yup.string().required("Required")
})

const initialValues = {
    username:'',
    password:''
}




export default class Login extends Component {

    constructor() {
        super();
        this.state={
            error:'',
            redirect:false
        };
    }



    handleSubmit = ({username, password}) => {
        
        axios.post('https://fakestoreapi.com/auth/login', {
            username: username, 
            password: password
        })
        .then(response=>{
            this.props.setToken(response.data.token);
            this.props.setName(username);
            return response;

        })
        .then(response=>{
            if (response.data.token){
                this.setState({redirect:true})
            }
            return response;
        })
    }

    render() {
        const styles={
            error: {color:'red'},
            formLabels:{
                color: "azure"
            },
            pageStyles:{
                backgroundColor: "grey",
                padding:"80px",
                paddingBottom:"54vh"
            },
            formHead:{
                color: "azure",
                fontWeight:"bold"
            }

        }
        return (
            <div style={styles.pageStyles}>
                {this.state.redirect ? <Redirect to={{pathname:"/", props:{token:this.props.token}}}/> :''}

                <center><h1 style={styles.formHead}>Login</h1></center>
                <Formik initialValues={initialValues}
                    validationSchema={formSchema}
                    onSubmit={
                        (values)=>{
                            this.handleSubmit(values);
                        }
                    }>
                    {
                        ({errors, touched})=>(
                            <Form>
                                <label style={styles.formLabels} htmlFor="username" className="form-label">Username</label>
                                <Field name="username" className="form-control" />
                                {errors.username && touched.username ? (<div style={styles.error}>{errors.username}</div>):null}

                                <label style={styles.formLabels} htmlFor="password" className="form-label">Password</label>
                                <Field name="password" type="password" className="form-control" />
                                {errors.password && touched.password ? (<div style={styles.error}>{errors.password}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <br/>
                                <Button type="submit" className="btn btn-primary">Login</Button>

                            </Form>
                        )
                    }

                </Formik>
            </div>
        );
    }
}

 */