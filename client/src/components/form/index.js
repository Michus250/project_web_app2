import React from 'react';
import axios from 'axios';
class Form extends React.Component{
    constructor(props){
        super(props);
        const initialState = props.list.reduce((acc, [key, value]) => {
          return { ...acc, [key]: '' };
        }, {});
        
        this.state = {
          ...initialState,
          errors : []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }
    
   
     
    
    

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
    }
    handleSubmit = (event) => {
      event.preventDefault();
      fetch(this.props.path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this.state)
      })
      .then(response => {
        if (!response.ok) { 
            // const isError = true;
           
          // throw (response.json());
        }
        return response.json();
      })
      .then(data => {
        if ('errors' in data){
          console.log(data.errors);
          let zm = [];
          
      
          this.props.list.map(name=>{
              let errorMsg = "";
              data.errors.map(element =>{
                // console.log(name);
                if (element.param == name[0]){
                  
                  errorMsg = element.msg;
                  zm.push([element.param, errorMsg]);       //Tutaj trzeba poprwaić i tu był koniec
                }
              })
                
              
            });
          console.log("zm");
          console.log(zm);

        }
          
      })
      .catch(error => {
        console.log(error);
        
      });
    }
    
      

    render(){
        return(
            <form  onSubmit={this.handleSubmit} >
          
          {this.props.list.map(element => {
            return (<div>
              {element[0]}  <input type={element[1]} name={element[0]} value={this.state[element[0]]} onChange={this.handleChange} ></input> <br></br>
            </div>);
          })}
          <input type='submit' value= {this.props.submitName}></input>
          
        </form>
        
        );
    }
} 
export default Form;