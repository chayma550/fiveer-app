import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from "./pages/home/Home"
import Gigs from "./pages/gigs/Gigs"
import Gig from "./pages/gig/Gig"
import Orders from "./pages/orders/Orders"
import MyGigs from "./pages/myGigs/MyGigs"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import { Route, Routes } from 'react-router';
import React from 'react';
import Footer from './components/Footer/Footer';
import "./app.scss"
import Add from './pages/add/Add';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Success from './pages/Success/Success';
import Pay from './pages/Pay/Pay';
function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
    <Navbar/>
    <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/gigs" element={<Gigs/>} />
       <Route path="/gig/:id" element={<Gig/>} />
       <Route path="/orders" element={<Orders/>} />
       <Route path="/mygigs" element={<MyGigs/>} />
       <Route path="/messages" element={<Messages/>} />
       <Route path="/message/:id" element={<Message/>} />
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
       <Route path="/add" element={<Add/>} />     
       <Route path="/pay/:id" element={<Pay/>} />      
       <Route path="/success" element={<Success/>} />      
 
         </Routes>
        <Footer/>
        </QueryClientProvider>
    </div>
  );
}

export default App;
