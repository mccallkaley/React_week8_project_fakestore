import React, { Component } from 'react'
import { getCategories, deleteCategory, putCategory } from '../api/apiCategory'
import Button from 'react-bootstrap/Button'
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {Redirect} from 'react-router-dom';

const FormSchema = Yup.object().shape({
    "name":Yup.string().required("Required")
})


export default class EditCats extends Component {

    constructor() {
        super();
        this.state={
            categories:[],
            category:{}, 
            succesfulDelete:false,
            unsuccessfulDelete:false,
            tokenError:false,
            serverErrorCats:false,
            successfulPost:false,
            unsuccessfulPost:false

        };

    }

    componentDidMount(){
        this.getAllCats()
    }


    getAllCats = async () =>{
        const cats = await getCategories(localStorage.getItem('token'))
        if(cats===400){this.setState({tokenError:true})}
        if(cats===500){this.setState({serverErrorCats:true})}
        if (cats !==500 && cats !==400){this.setState({categories:cats})}
    }
    
    handlePullDown=(event)=>{
        const newId = event.target.value;
        if (newId===0){return}
        const newcat = this.state.categories.filter((cat)=>cat.id===parseInt(newId))[0];
        this.setState({category:newcat})
    }

    handleSubmit=async (values)=>{
        const res = await putCategory(localStorage.getItem('token'),this.state.category.id, values.name)
        if (res){
            this.setState({successfulPost:true, category:{}})
        }else{
            this.setState({unsuccessfulPost:true, category:{}})
        }
    }

    handleDeleteCategory=async()=>{
        if (window.confirm(`Are you sure you want to delete ${this.state.category.name}`)){
            const res= await deleteCategory(localStorage.getItem('token'), this.state.category.id)
            if (res) {
                this.setState({succesfulDelete:true, unsuccessfulDelete:false}); 
                this.getAllCats();
            }else{
                this.setState({succesfulDelete:false, unsuccessfulDelete:true}); 

            }
        }
    }

    render() {
        return (
            <div>
            {this.state.successfulDelete?<small style={{color:"green"}}>Your Category Was Deleted</small>:""}
            {this.state.unsuccessfulDelete?<small style={{color:"red"}}>Error Deleting Category, Please Try again</small>:""}
            {this.state.successfulPost?<small style={{color:"green"}}>Your Category Was Modified</small>:""}
            {this.state.unsuccessfulPost?<small style={{color:"red"}}>Error Modifing Category, Please Try again</small>:""}
            {this.state.serverErrorCats?<small style={{color:"red"}}>Error try again later</small>:''}
            {this.state.tokenError?<Redirect to='/login'/>:''}       


                <br/>
                <label htmlFor="cats" className="form-label">Choose Category to Edit</label>
                <select id="options" className="form-select form-select-lg mb-3"
                    onChange={(event)=>this.handlePullDown(event)} name="cats">
                    <option defaultValue={0} label="--Choose a Category--"/>
                    {this.state.categories?.map(
                        (cat)=><option key={cat.id} value={cat.id} label={cat.name}/>
                    )}
                </select>
                <br/>
                {Object.entries(this.state.category??{}).length>0
                    ?
                    <>
                    <hr/>
                    <h2>#{this.state.category?.id ?? '000'} - {this.state.category?.name??"No Category"}</h2>
                    <Button variant="danger" onClick={()=>this.handleDeleteCategory()}>Delete Category</Button>
                    <hr/>
                    <br/>
                    <Formik
                        initialValues={
                            {
                                name:this.state.category?.name ?? '',
                            }
                        }
                        enableReinitialize
                        validationSchema={FormSchema}
                        onSubmit={
                            (values,{resetForm})=>{
                                console.log(values);
                                this.handleSubmit(values);
                                resetForm({name:''});
                            }
                        }>
                        {({ errors, touched })=>(
                            <Form>
                                <label htmlFor="name" className="form-label">New Category Name</label>
                                <Field name="name" className="form-control"/>
                                {errors.name && touched.name ? (<div style={{color:"red"}}>{errors.name}</div>):null}

                                <button className="btn btn-primary form-control" type="submit">Edit Category</button>   
                            </Form>
                        )
                        }

                    </Formik>
                        

                    </>
                    :''
                }

            </div>
        )
    }
}
