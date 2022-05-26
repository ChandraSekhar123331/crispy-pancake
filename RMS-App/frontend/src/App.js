import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router';
import Menu from './Menu/menu';
import Home from './Homepage/home';

function App() {
  return (
    <Routes>
      <Route exact path='/menu' element={<Menu></Menu>}></Route>
      <Route exact path='/' element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
