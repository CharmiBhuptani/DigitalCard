import '../src/styles/main.scss'
import "bootstrap/dist/css/bootstrap.css";
import MainForm from './components/MainForm';
import {Routes, Route} from 'react-router-dom'
import { CardListing } from './components/CardListing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  QrCode  from './components/QrCode';



function App() {

  return (
    <>
    <Routes>
      <Route path="/create-card" element = {<MainForm />}></Route>
      <Route path="/" element = {<CardListing />}></Route>
      <Route path="/qr/:id" element = {<QrCode />}></Route>
      <Route path="/create-card/:id" element = {<MainForm />}></Route>
    </Routes>
      <ToastContainer />
    </>

    
    // <div className="App">
    //     <MainForm />
    // </div>
  );
}

export default App;
