import './App.css';

function submitHandler(){
  
}

function App() {
  return (
    <div >
        <form action = "/register" omsubmit={submitHandler}>
          email: <input type='email' name='email' required></input> <br></br>
          password: <input type ='password' name='password' required></input><br></br>
          <input type='submit' value= "Register"></input>
        </form>
    </div>
  );
}

export default App;
