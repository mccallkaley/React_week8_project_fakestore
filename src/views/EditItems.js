import React, { Component } from 'react';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const formSchema = Yup.object().shape({
    "title": Yup.string().required("Required"),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must be a Valid Price").required("Required"),
    "description": Yup.string(),
    "image": Yup.string(),
    "category": Yup.string()
})


class EditItems extends Component {

    constructor() {
        super();
        this.state={
            tokenError:false,
            serverErrorCats:false,
            categories:[],
            items:[],
            item:{},
            unsuccessfulPost: false,
            successfulPost: false,
            unsuccessfulDelete: false,
            successfulDelete: false,
            serverErrorItem:false

        };
    }

    componentDidMount() {
        this.allProducts();
      }
    allProducts = () =>{
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
          {this.setState({products:response.data})}  
      })};
      /*allProducts = () =>{
        return axios
        .get('https://fakestoreapi.com/products')
        .then((response) => response.data);
    };*/

    

    handleSubmit=({title, price, description, image, category}, id)=>{
        axios.put(`https://fakestoreapi.com/products/${id}`, {
            title:title,
            price:price,
            description:description,
            image:image,
            category:category
        })
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log("Edit Complete"))
    }
    handleDeleteItem=({title, price, description, image, category}, id)=>{
        axios.delete(`https://fakestoreapi.com/products/${id}`, {
            title:title,
            price:price,
            description:description,
            image:image,
            category:category
        })
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log("Item Deleted"))
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

        const item = JSON.parse(localStorage.getItem('itemToEdit'));
        return (
            <div style={styles.pageStyles}>
                <label htmlFor="itemsList" className="form-label">Choose Item to Edit</label>
                <select id="options" name="itemsList" className="form-select form-select-lg mb-3" onChange={(event)=>this.handlePullDown(event)}>
                    <option defaultValue={0} label="--Choose an item--"/>
                    {this.allProducts}
                    {this.state.items?.map(
                        (item)=><option key={item.id} id={item.id} item={item} label={item.title}/>
                    )}

                    

                </select>
                
                
                <br/>
                    <hr/>
                    
                    <Button variant="danger" onClick={()=>this.handleDeleteItem()}>Delete Item</Button>
                    <hr/>
                    <br/>
                <Formik 
                    initialValues={
                        {
                            title: item?.title ?? '',
                            description: item?.description ?? '',
                            price: item?.price ?? '',
                            image: item?.image ?? '',
                            category: item?.category ?? ''
                        }
                    }
                    validationSchema={formSchema}
                    onSubmit={
                        (values)=>{
                            this.handleSubmit(values, item?.id);
                        }
                    }>
                    {
                        ({errors, touched})=>(
                            <Form>
                                <label style={styles.formLabels} htmlFor="title" className="form-label">Item Name</label>
                                <Field name="title" className="form-control" />
                                {errors.title && touched.title ? (<div style={styles.error}>{errors.title}</div>):null}

                                <br/>
                                <label style={styles.formLabels} htmlFor="price" className="form-label">Price</label>
                                <Field name="price" type="price" className="form-control" />
                                {errors.price && touched.price ? (<div style={styles.error}>{errors.price}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels} htmlFor="description" className="form-label">Description</label>
                                <Field name="description" type="description" className="form-control" />
                                {errors.description && touched.description ? (<div style={styles.error}>{errors.description}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>

                                <label style={styles.formLabels}  htmlFor="image" className="form-label">Image</label>
                                <Field name="image" className="form-control"/>
                                {errors.image && touched.image ? (<div style={{color:'red'}}>{errors.image}</div>):null}

                                <label  style={styles.formLabels} htmlFor="category" className="form-label">Category</label>
                                <Field name="category" type="category" className="form-control" />
                                {errors.category && touched.category ? (<div style={styles.error}>{errors.category}</div>):null}
                                <small style={styles.error}>{this.state.error}</small>


                                <br/>
                                <Button type="submit" className="btn btn-primary">Submit Edit</Button>

                            </Form>
                            
                        )
                    }

                </Formik>
            </div>
        );
    }
}

export default EditItems;







/*import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';
//import {getCategories} from '../api/apiCategory'
//import {putItem, getItems, deleteItem} from '../api/apiItems'
import axios from 'axios'


const FormSchema = Yup.object().shape({
    "title": Yup.string().required("Required"),
    "description": Yup.string().required("Required"),
    "price":Yup.string().matches(/^\d+(\.\d{1,2})?$/,"Must be a Valid Price").required("Required"),
    "image":Yup.string().required("Required"),
    "category":Yup.number().integer().required("Required")
})


export default class EditItems extends Component {

    constructor() {
        super();
        this.state={
            tokenError:false,
            serverErrorCats:false,
            categories:[],
            items:[],
            item:{},
            unsuccessfulPost: false,
            successfulPost: false,
            unsuccessfulDelete: false,
            successfulDelete: false,
            serverErrorItem:false
            
        }
    }

    componentDidMount(){

    };



    handlePullDown=(event)=>{
        const newId = event.target.value;
        if (newId===0){return}
        const newitem = this.state.items.filter((i)=>i.id===parseInt(newId))[0];
        this.setState({item:newitem})
    }

    handleDeleteItem=({title, price, description, image, category}, id)=>{
        axios.delete(`https://fakestoreapi.com/products/${id}`, {
            title:title,
            price:price,
            description:description,
            image:image,
            category:category
        })
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log("Item Deleted"))
    }

    handleSubmit=({title, price, description, image, category}, id)=>{
        axios.put(`https://fakestoreapi.com/products/${id}`, {
            title:title,
            price:price,
            description:description,
            image:image,
            category:category
        })
        .then(res=>res.data)
        .then(json=>console.log(json))
        .then(()=>console.log("Edit Complete"))
    }

    render() {
        const item = JSON.parse(localStorage.getItem('itemToEdit'));
        return (
            <div>
                
                <label htmlFor="itemsList" className="form-label">Choose Item to Edit</label>
                <select id="options" name="itemsList" className="form-select form-select-lg mb-3" onChange={(event)=>this.handlePullDown(event)}>
                    <option defaultValue={0} label="--Choose an item--"/>
                    {this.state.items?.map(
                        (item)=><option key={item.id} value={item.id} label={item.title}/>
                    )}
                </select>
                {Object.entries(this.state.item??{}).length>0
                    ?
                    <>
                    <br/>
                    <hr/>
                    <Button variant="danger" onClick={()=>this.handleDeleteItem()}>Delete Item</Button>
                    <hr/>
                    <br/>
                    <Formik
                        initialValues={
                            {
                                title: item?.title ?? '',
                                description: item?.description ?? '',
                                price: item?.price ?? '',
                                image: item?.image ?? '',
                                category: item?.category ?? ''
                            }
                        }
                        enableReinitialize
                        validationSchema={FormSchema}

                        onSubmit={
                            (values)=>{
                                this.handleSubmit(values, item?.id);
                            }
                    }
                        onSubmit={
                            (values)=>{
                                this.handleDeleteItem(values, item?.id);
                            }
                    }>
                        {({ errors, touched })=>(
                            <Form>
                                <label htmlFor="title" className="form-label">Item Name</label>
                                <Field name="title" className="form-control"/>
                                {errors.title && touched.title ? (<div style={{color:'red'}}>{errors.title}</div>):null}

                                <label htmlFor="price" className="form-label">Price</label>
                                <Field name="price" className="form-control"/>
                                {errors.price && touched.price ? (<div style={{color:'red'}}>{errors.price}</div>):null}

                                <label htmlFor="description" className="form-label">Description</label>
                                <Field name="description" className="form-control"/>
                                {errors.description && touched.description ? (<div style={{color:'red'}}>{errors.description}</div>):null}

                                <label htmlFor="image" className="form-label">Image</label>
                                <Field name="image" className="form-control"/>
                                {errors.image && touched.image ? (<div style={{color:'red'}}>{errors.image}</div>):null}

                                <label htmlFor="category" className="form-label">Category</label>
                                <Field as="select" name="category" className="form-select" >
                                    {this.state.categories?.map(
                                        (c)=><option key={c.id} value={c.id}>{c.name}</option>
                                    )}
                                </Field>
                                {errors.category && touched.category ? (<div style={{color:'red'}}>{errors.category}</div>):null}
                                

                                <button className="btn btn-primary form-control" type="submit">Edit Item</button>   
                            </Form>
                        )
                        }

                    </Formik>
                    </>
                :''}

            </div>
        )
    }
} */
