import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

// import logo from "../../img/logo.jpg";

class Nav extends React.Component {


    render() {
        const token = localStorage.getItem("token");
        let isLogged;
        let role;
        let decodedToken;
        if (token === null) {
            isLogged = false;
            role = "null";
        }
        else {
            isLogged = true;
            decodedToken = jwt_decode(token);
            role = decodedToken.role;
        }


        return (


            <Navigation>

                {role === 'user' ? (
                    <Ul>
                        <A to="/receptionHours" onClick={() => { window.location = "/receptionHours" }}><Li>Godziny przyjęć</Li></A>
                        <A to="/contact" onClick={() => { window.location = "/contact" }}><Li>Kontakt</Li></A>
                        <A to="/createVisit" onClick={() => { window.location = "/createVisit" }}><Li>Umów wizytę</Li></A>
                        <A to="/userExamination" onClick={() => { window.location = "/userExamination" }}><Li>Twoje badania</Li></A>
                    </Ul>
                ) : role === 'admin' ? (
                    <Ul>
                        <A to="/receptionHours" onClick={() => { window.location = "/receptionHours" }}><Li>Godziny przyjęć</Li></A>
                        <A to="/contact" onClick={() => { window.location = "/contact" }}><Li>Kontakt</Li></A>
                        <A to="/createUser" onClick={() => { window.location = "/createUser" }}><Li>Utwórz pracownika</Li></A>
                        <A to="/showAll" onClick={() => { window.location = "/showAll" }}><Li>Pokaż wszystkich</Li></A>
                    </Ul>

                ) : role === 'employee' ? (
                    <Ul>
                        <A to="/receptionHours" onClick={() => { window.location = "/receptionHours" }}><Li>Godziny przyjęć</Li></A>
                        <A to="/contact" onClick={() => { window.location = "/contact" }}><Li>Kontakt</Li></A>
                        <A to="/createExamination" onClick={() => { window.location = "/createExamination" }}><Li>Utwórz badanie</Li></A>
                    </Ul>
                ) : role === 'doctor'?(
                    <Ul>
                        <A to="/receptionHours" onClick={() => { window.location = "/receptionHours" }}><Li>Godziny przyjęć</Li></A>
                        <A to="/contact" onClick={() => { window.location = "/contact" }}><Li>Kontakt</Li></A>
                        <A to="/changeHours" onClick={() => { window.location = "/changeHours" }}><Li>Zmień godziny</Li></A>
                        <A to="/endExamination" onClick={() => { window.location = "/endExamination" }}><Li>Zakończ wizytę</Li></A>
                    </Ul>
                ):(
                    <Ul>
                        
                    </Ul>
                )
                    
                }
                {isLogged ?
                    <Ul><A to="/logout" onClick={() => { localStorage.removeItem("token"); window.location = "/" }}><Li>Wyloguj</Li></A> </Ul> :

                    <Ul>
                        <A to="/receptionHours" onClick={() => { window.location = "/receptionHours" }}><Li>Godziny przyjęć</Li></A>
                        <A to="/contact" onClick={() => { window.location = "/contact" }}><Li>Kontakt</Li></A>
                        <A to="/login" onClick={() => { window.location = "/login" }}><Li>Zaloguj</Li></A>
                        <A to="/register" onClick={() => { window.location = "/register" }}><Li>Zarejestruj</Li></A>
                    </Ul>
                }


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
    margin: 1ex 1ex;
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