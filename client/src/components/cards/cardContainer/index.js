import React from "react";
import styled from "styled-components";

class CardContainer extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(
            <Div>{this.props.children}</Div>
        );
    }
}

const Div =styled.div`
    background-color: #e6e4e4;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    margin: 1%;
    padding: 1% 1%;
    @media (max-width: 768px) {
        flex-direction: column;
        
  }

    
`

export default CardContainer;