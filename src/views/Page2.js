import React, { Component } from 'react'
import HeaderText from '../components/HeaderText'

export default class Page2 extends Component {
    constructor() {
        super();
        this.state={
            food:''
        }
    }


    render() {
        return (
            <div>
                <HeaderText>We are testing how things work in React</HeaderText>

                test: {this.props.test}<br/>
                {/* The user is {this.state.user}<br/> */}
                <input onChange={(event)=>this.props.setUser(event.target.value)}></input>

                <br/>
                <br/>
                <br/>

                <input onChange={(event)=>this.setState({"food":event.target.value})} placeholder="Food to Add"></input>
                <button className="btn btn-primary" 
                    onClick={()=>{
                        this.props.addFood(this.state.food);
                         alert(`You just added ${this.state.food}`)}}>Add My Food</button>


            </div>
        )
    }
}
