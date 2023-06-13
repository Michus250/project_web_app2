import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Nav from './components/nav';
import {BrowserRouter} from 'react-router-dom';
import UserRoutes from './routes';


function App() {
 
  return (
    <BrowserRouter>
      <Nav ></Nav>
        <UserRoutes></UserRoutes>

         
    </BrowserRouter>
  );
}

export default App;
