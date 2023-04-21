import React from "react";
import styled from "styled-components";
import {  Link } from 'react-router-dom';

// import logo from "../../img/logo.jpg";

class Nav extends React.Component{
    
    render(){
        return(
            
                
                    <Navigation>
                        {/* <A to={'/'}><Logo src = {logo}></Logo></A> */}
                        
                            <Ul>
                            {this.props.list.map(element =>{
                                return <A to={element[1]} onClick={element[2] ? () => window.location = element[1] : ""}><Li>{element[0]}</Li></A>
                            })}  
                            </Ul>
                        
                    </Navigation>
                
           
        );
    }
}
const Ul = styled.ul`
    display: flex;
    align-items: center;
`;
const Navigation = styled.nav`
    width: 100%;
    /* background-color: #989CA6; */
    /* background-color: #0D0D0D;  */
    background: linear-gradient(to bottom, #0D0D0D, #404040);
    box-shadow: 0px 0px 10px 5px  #404040 ;
    display : flex;
    justify-content: center;
    align-items: center;
    
    
    

`;
const Li = styled.li`
    margin: 0ex 1ex;
    list-style: none;
    padding : 1ex;
    background-color: #4a515f;
    box-shadow: 1px 1px 10px 1px  #0D0D0D ;
    font-family : Apple Chancery, cursive;
    &:hover{
        background-color: #7c8597;
        cursor: pointer;
    }
    
`;
const A = styled(Link)`
    font-size: xx-large;
    text-decoration: none;
    color: white;
    
  
    
`;
// const Logo = styled.img `
//     height: 100px;
//     margin: 0ex 1ex;
//     padding : 1ex;
// `;

export default Nav;