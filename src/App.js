import React, { useState,  } from "react";

import Logueo from "./components/Logueo";

import 'react-toastify/dist//ReactToastify.css';

import Links from './components/Links';
import { ToastContainer } from "react-toastify";


import { cage } from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Carousel, CarouselItem } from "react-bootstrap";
const auth = getAuth(cage);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //código en caso de que haya sesión inciiada
      setUsuarioGlobal(usuarioFirebase);
    } else {
      //código en caso de que no haya sesión iniciada
      setUsuarioGlobal(null);
    }
   
    
  });

  return (
    <>
      {usuarioGlobal ? (
      

        <Links correoUsuario={usuarioGlobal.email} />
    



      ) : 
      
       (
        
        <Logueo />
        
      )}
      
    </>
    
  );
}

export default App;