import React, { Component } from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {postCategory} from '../api/apiCategory';

const FormSchema = Yup.object().shape({
    "name":Yup.string().required("Required")
})

const initialValues={
    name:''
}

export default class CreateCats extends Component {
    constructor(){
        super();
        this.state={
            unsuccessfulPost: false,
            successfulPost:false
        }
    }

    handleSubmit=async({name})=>{
        const res = await postCategory(localStorage.getItem('token'),name)
        if (res){
            this.setState({successfulPost:true})
        }else{
            this.setState({unsuccessfulPost:true})
        }
    }

    render() {
        return (
            <div>
                {this.state.successfulPost?<small style={{color:"green"}}>Your category was created</small>:''}
                {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Creating Category, Please Try again</small>:''}


                <br/>
                <h1>Create Category</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={FormSchema}
                onSubmit={(values,{resetForm})=>{
                    this.handleSubmit(values);
                    resetForm(initialValues);
                }}
                >
               {
                   ({errors, touched}) => (
                       <Form>
                           <label htmlFor="name" className="form-label">New Category Name</label>
                           <Field name="name" className="form-control"/>
                           {errors.name && touched.name ? (<div style={{color:"red"}}>{errors.name}</div>):null}

                           <button className="btn btn-primary form-control" type="submit">Create</button>
                       </Form>
                   )
               }    

            </Formik>
            </div>
        )
    }
}
