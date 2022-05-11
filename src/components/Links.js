import React, {useState, useEffect} from "react";
import LinkForm from "./LinkForm";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import '../scss/links.scss';
import '../scss/links2.scss';
import {db} from '../credenciales';
import { Button, Carousel, CarouselItem, Container } from "react-bootstrap";
const auth = getAuth(db);
const Links = (correoUsuario) => {
  const [archivoUrl, setArchivoUrl] = React.useState("");
  const [docus,setDocus] = React.useState([]);



//   const submitHandler1 = async (e)=> {
//     e.preventDefault()
// const nombreArchivo = e.target.nombre.value;
// if (!nombreArchivo) {
//   alert("coloca un nombre")
//   return
// }
// const coleccionRef =  cage.firestore().collection("archivos");
// const docu = await coleccionRef.doc(nombreArchivo).set({nombre: nombreArchivo, url: archivoUrl});
// console.log("archivo cargado:", nombreArchivo, "ulr:", archivoUrl);
// window.location="/"

//   }
 
  React.useEffect(async ()=>{
    const docusList = await db.firestore().collection("links").get();
    setDocus(docusList.docs.map((doc)=> doc.data()));
   
  }, [])
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('')

  const addOrEditLink = async (linkObject) => {
     try {
      if (currentId === '') {
        await db.firestore().collection('links').doc().set({name:linkObject.name, description:linkObject.description, url:linkObject.url, price:linkObject.price, face:linkObject.face, archivo: archivoUrl });
        toast("New Lik Added", {
          type: "success",
        });
      } else {
      await db.firestore().collection('links').doc(currentId).update({name:linkObject.name, description:linkObject.description, url:linkObject.url, price:linkObject.price, face:linkObject.face, archivo: archivoUrl});
        toast('Lik Updated Successfullly', {
          type:'info',
        });
        setCurrentId('');
      }
     } catch(error){
      console.error(error);
     }
  };

  const onDeleteLink = async (id) => {
    if(window.confirm('are you sure you want to delete this link?')) {
        await db.firestore().collection('links').doc(id).delete();
        toast('Link Removed Successfully',{
          type:'error',
          autoClose:2000,
        })
      }
  };
  const getLinks = async () => {
   db.firestore().collection('links').onSnapshot((querySnapshot) => {
     const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id:doc.id});
      });
      setLinks(docs);
    });
  }

  useEffect(() => {
    getLinks();
  },[]);

  return ( 
  <div>
    <div className="col-md-4 p-2">
    <LinkForm {...{addOrEditLink, currentId, Links, setArchivoUrl}}/>
    </div>
 
<div>
     <Carousel> 
      {links.map((link) => (
      <CarouselItem><Container>
        <div className="col-p-1">
        <div className="col-p-2">
       <div className="material-icons2">
          <i className="material-icons text-danger"
          onClick={() => onDeleteLink(link.id)} z-index="1"
          >
            close
          </i>
          <i className="material-icons"
          onClick={() => setCurrentId(link.id)}>
            create
          </i>
          </div>
           <h1 className="link-name">{link.name}</h1>
          <h1>{link.description}</h1>
         
        <div className="descritor">  <h1>{link.face}</h1> </div>
          <div className="link"><a href={link.url} target="_blank" rel="noopener noreferrer">
            Go to Website
          </a> 
          </div>
          <div className="the-image"><img src={link.archivo} height="150px" width="150px" z-index="2" />
           </div>
        </div>
        </div></Container>
        </CarouselItem>  
      ))} 
    </Carousel>
    <div>
      {links.map((link) => (    
    <div className="col-p">
        <div className="col-p4">
          <h1 className="link-name2">{link.name}</h1>
         <div className="col0">
       <div className="material-icons3">
          <i className="material-icons text-danger"
          onClick={() => onDeleteLink(link.id)} z-index="1"
          >
            close
          </i>
          <i className="material-icons"
          onClick={() => setCurrentId(link.id)}>
            create
          </i>
          </div> 
           <div className="the-image1">
            <img src={link.archivo} height="150px" width="150px" z-index="2" />
           </div> 
          
           <p2>keep track of what you learn</p2>
         <div className="done">  <p3>{link.description}</p3> </div>
         <p2>everyday</p2> 
          <div className="don">    <p3>{link.face}</p3></div>
         <br></br>
         <p1>${link.price}</p1>
          
          
        </div>
        </div>    
        
        </div>    
        ))} 
  </div>
  </div>
  



        
      <Button onClick={() => signOut(auth)}>Cerrar sesión</Button>
  </div>
  
  );
};

export default Links;



