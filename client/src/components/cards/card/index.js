import React from "react";
import styled from "styled-components";

class Card extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <Div>{this.props.children}</Div>
        );
    }
}

const Div = styled.div`
    display:flex;
    flex-direction: column;
    /* flex: 0 0 38%; */
    flex-basis: calc(33.33%);
    color: black;
    align-items:center;
    text-align: center;
    margin: 1% 1% 1% 1%;
    padding: 1% 5%;
    /* max-width: 80%; */
    min-width: 35%;
    /* background-color: #D7D7D9; */
    background-color: #F2F2F2;
    box-shadow: 1px 1px 10px 1px  #B8BABF ;
    
 
`;
export default Card;