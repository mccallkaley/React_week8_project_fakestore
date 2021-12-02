import React, { Component } from 'react'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';
import axios from 'axios'
//import {getCategories} from '../api/apiCategory'
//import {postItem} from '../api/apiItems'

const FormSchema = Yup.object().shape({
    "title": Yup.string().required("Required"),
    "description": Yup.string().required("Required"),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must be a Valid Price").required("Required"),
    "image":Yup.string().required("Required"),
    "category":Yup.number().integer().required("Required")
})

const initialValues = {
    title:'',
    price:'',
    description:'',
    image:'',
    category:''
}

export default class CreateItems extends Component {
    constructor() {
        super();
        this.state={
            tokenError:false,
            serverErrorCats:false,
            categories:[],
            unsuccessfulPost: false,
            succussfulPost:false
        }
    }

    componentDidMount(){
        
    }

    handleSubmit=({title, price, description, image, category})=>{
        axios.post(`https://fakestoreapi.com/products`, {
            title:title,
            price:price,
            description:description,
            image:image,
            category:category
        })
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log("Item Created"))
    }


    render() {
        const styles={

            pageStyles:{
                backgroundColor: "pink",
                padding:"80px",
                minHeight:"94vh"
            },
            formHead:{
                color: "azure",
                fontWeight:"bold"
            }

        }
        return (
            <div style={styles.pageStyles}>
                <br/>
                <Formik
                initialValues={initialValues}
                validationSchema={FormSchema}
                onSubmit={
                    (values, {resetForm}) => {
                        this.handleSubmit(values);
                        resetForm(initialValues)
                    }
                }
                >
                    {
                        ({errors, touched})=>(
                            <Form>
                                <label style={styles.formLabels} htmlFor="title" className="form-label">Item Name</label>
                                <Field name="title" className="form-control"/>
                                {errors.title && touched.title ? (<div style={{color:'red'}}>{errors.title}</div>):null}

                                <label style={styles.formLabels} htmlFor="price" className="form-label">Price</label>
                                <Field name="price" className="form-control"/>
                                {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>):null}

                                <label style={styles.formLabels} htmlFor="description" className="form-label">Description</label>
                                <Field name="description" className="form-control"/>
                                {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>):null}

                                <label style={styles.formLabels} htmlFor="image" className="form-label">Image</label>
                                <Field name="image" className="form-control"/>
                                {errors.image && touched.image ? (<div style={{color:'red'}}>{errors.image}</div>):null}

                                <label style={styles.formLabels} htmlFor="category" className="form-label">Category</label>
                                <Field  name="category" className="form-control"/>
                         
                                {errors.category && touched.category ? (<div style={{color:'red'}}>{errors.category}</div>):null}
                                <br/>
                                <button className="btn btn-primary form-control" type="submit">Create Item</button>
                            </Form>
                        )
                    }

                </Formik>
            </div>
        )
    }
}
