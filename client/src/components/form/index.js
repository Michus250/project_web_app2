import React from 'react'
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            email: '',
            password : '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch('/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.state)
        })
        .then(response => {
          if (!response.ok) throw new Error(response.statusText);
          return response.text();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
      }
      

    render(){
        return(
            <form  onSubmit={this.handleSubmit} method='POST'>
          email: <input type='email' name='email' value={this.state.email} onChange={this.handleChange} required></input> <br></br>
          password: <input type ='password' name='password' value={this.state.password} onChange={this.handleChange} required></input><br></br>
          <input type='submit' value= "Register"></input>
        </form>
        );
    }
} 
export default Form;