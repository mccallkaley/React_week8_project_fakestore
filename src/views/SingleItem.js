import React, { Component } from 'react'
import ItemCard from '../components/ItemCard'
//import {getItem} from '../api/apiItems'
import axios from 'axios'

export default class SingleItem extends Component {
    constructor() {
        super();
        this.state={
            item:false
        }
    }

    componentDidMount() {
        this.getSingleItem()
    }
    /* getSingleItem = async () =>{
        const item = await getItem(localStorage.getItem('token'), this.props.match.params.id)
        if(item === 400){this.setState({tokenError:true})}
        if(item===500){this.setState({serverError:true})}
        if(item!==500 && item !==400){
            this.setState({item})
        }
    }*/


    getSingleItem = async () =>{
        await axios.get('https://fakestoreapi.com/products')
        .then(response=>{
            this.setState({products: response.data}, ()=>console.log("Single Item."))
        });
    }




    render() {
        return (
            <div>
                {
                    this.state.item ? 
                        <ItemCard item={this.state.item}/>
                        :
                        ''
                }
            </div>
        )
    }
}
