import React from 'react';

class Form extends React.Component{
    constructor(props){
        super(props);
        const initialState = props.list.reduce((acc, [key, value]) => {
          return { ...acc, [key]: '' };
        }, {});
        const errors = props.list.map(([key, value]) => [key, '']);
        this.state = {
          ...initialState,
          errors : errors
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
          // let errors = data.errors; 
          console.log(data.errors);
          let zm = [];

            

            
            this.props.list.map((index) =>{
              let errorMsg = "";
              data.errors.map(element=>{
                if (element.param === index[0]){     
                  errorMsg = element.msg;
  
                }
               
              return element;
              });
              zm.push([index[0],errorMsg]);
              return index;
            });
            
              
          
         
          console.log("zm");
          console.log(zm);
          this.setState({
            ...this.state,
            password : '',
            errors : zm
          });

        }
        if('info' in data){
          console.log(data.info);
          window.location.href="/";
        }
          
      })
      .catch(error => {
        console.log(error);
        
      });
    }
    
      

    render(){
        return(
            <form  onSubmit={this.handleSubmit} method='POST' >
          
          {this.props.list.map((element,index) => {
            return (<div>
              {element[0]}  <input type={element[1]} name={element[0]} value={this.state[element[0]]} onChange={this.handleChange} ></input> <br></br>
              {this.state.errors[index][1]}<br></br>
              
            </div>);
          })}
          <input type='submit' value= {this.props.submitName}></input>
          
          
        </form>
        
        );
    }
} 
export default Form;