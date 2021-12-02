import React, { Component } from 'react'
import axios from 'axios'
import {Col, Row, Button} from 'react-bootstrap'
//import {getItems, getItemsByCat} from '../api/apiItems'
//import {getCategories} from '../api/apiCategory'
import ItemCard from '../components/ItemCard'



export default class Shop extends Component {
    constructor() {
        super();
        this.state={
            items:[],
            categories:[],
            cart:{},
            itemStart: 0,
            itemEnd:15
        };
    };


    async componentDidMount(){
      Promise.all([

        axios.get("https://fakestoreapi.com/products?")
        .then((response) => {
          {this.setState({items: response.data})}   
}),  

        axios.get("https://fakestoreapi.com/products/categories")
        .then((response) => {
        this.setState({categories:response.data})
        })  
      ])   
     }
    
// cart section

  // {
  //   "Red Shoes":{name:"red shoes",desc:"the desc",price:"price", quantity:""}
  // }
     render(){
        

      const  addToCart=(item)=>{
        let cart = this.state.cart
        if (cart[item.title]){
          cart[item.title].quantity++
        }else{
          cart[item.title]={...item,quantity:1}
        }
        this.setState({cart})
        localStorage.setItem("cart",JSON.stringify(cart))
        alert(`Thanks for adding ${item.title} to your cart`)
      }

      const filterProducts = category =>{
        axios.get("https://fakestoreapi.com/products/category/" + category.target.value)
        .then((response) => {
          {this.setState({items:response.data})}  
          })};


      const allProducts = () =>{
        axios.get("https://fakestoreapi.com/products")
        .then((response) => {
          {this.setState({items:response.data})}  
      })};

      const handlePrev=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart-15, itemEnd:oldEnd-15})
    }

      const  handleNext=()=>{
        const oldStart=this.state.itemStart
        const oldEnd=this.state.itemEnd
        this.setState({itemStart:oldStart+15, itemEnd:oldEnd+15})
    } 

      const styles = {

        pageStyles:{
            backgroundImage: "url('https://i5.walmartimages.com/asr/fbfac9f3-6d5d-47b7-be56-2ce4f06cb996_1.db30e86c8960b6691640705c01837146.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF')",
            backgroundColor: "beige",
            
        },

    }
      
    

   return ( 
       
<div style={styles.pageStyles}>
    <Row>
    <Col md={3}>
        
    
        <ul id="category">
                                    {/* category section */}
            <center><h3>Categories</h3></center>
            <hr/>
                <li><button id="c-btn" onClick={allProducts} value="All">All Products</button></li>
                    {this.state.categories.map(
                        (category, id) => <li key={id}>
                        <button id="c-btn" value={category} onClick={filterProducts}>{category}</button>
                </li>)}
        </ul>
    
    </Col>
    <Col md={9}>
    {/* item section */}
            <div className="d-flex justify-content-xl-around">
                <Button variant="danger" className={"me-2 " + (this.state.itemStart===0?"disabled":'')}  onClick={()=>handlePrev()}>{"<< Prev"}</Button>
                <Button variant="success" className={" " + (this.state.items?.length<=this.state.itemEnd?"disabled":'')} onClick={()=>handleNext()}>{"Next >>"}</Button>
            </div>
        <Row>

            <div id="products">
                {this.state.items.slice(this.state.itemStart,this.state.itemEnd)
                    .map((item) =><ItemCard key={item.id} id={item.id} item={item} addToCart={() => addToCart(item)}/>)}
            </div>
        </Row>

        
    
    </Col>

    </Row>
</div>

)
}    
}
 
