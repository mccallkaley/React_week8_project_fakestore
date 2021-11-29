import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";

import { Redirect } from "react-router-dom";
export default class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }

  handleRenderItem = () => {
    this.setState({ clicked: true });
  };

  render() {
    return (
      <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* come back for single item */}
        {this.state.clicked ? (
          <Redirect to={`/item/${this.props.item.id}`} />
        ) : (
          ""
        )}
        <Card border="dark" style={{ width: "425px", height: "500px", marginBottom: "25px", backgroundColor: "pink", }}>
          <Card.Header>Category: {this.props.item.category}</Card.Header>
          <Card.Img
            variant="top"
            style={{ height: "100px", objectFit: "contain" }}
            alt={this.props.item.title + " image"}
            src={this.props.item.image}
          />
          <Card.Body>
            <Card.Title>
              {(this.props.item.title) ?? "Generic Item"}
            </Card.Title>
            <Card.Text>
              {this.props.item.description ?? "Sorry No Description"}
            </Card.Text>
            <Card.Subtitle className="float-end">
              ${this.props.item.price ?? "?.??"}{" "}
            </Card.Subtitle>
            <br />
            <button
              style={{
                backgroundColor: "pink",
                border: "none",
                color: "blue",
              }}
              onClick={() => this.handleRenderItem()}
            >
              See More
            </button>
            <Button variant="info" onClick={()=>this.props.addToCart(this.props.item)}> Add To Cart</Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}









/*
import { Card, Col, Button } from 'react-bootstrap';
const ItemCard = ({id, item, addToCart}) => {
    
    return (
    <Col>
     
     <Card style={{ width: '150px', marginBottom:"25px"  }}>
        <div>
        <img id="img " src={item.image} alt="" width="100" height="100"/>
        
        <div className="item">
            <p id="title">{item.title}</p>
            <p id="price">Price: ${item.price}</p>
        </div>

        <button style={{backgroundColor:"pink", border:'light blue', color:'blue'}}  onClick={addToCart}>Add to cart</button>

        </div>
        </Card>
    </Col>
     
     );
}

export default ItemCard; */