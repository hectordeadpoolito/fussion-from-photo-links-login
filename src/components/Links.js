import React, {useState, useEffect} from "react";
import LinkForm from "./LinkForm";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import '../scss/links.scss';
import {cage} from '../credenciales';
import { Button } from "react-bootstrap";
const auth = getAuth(cage);
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
    const docusList = await cage.firestore().collection("links").get();
    setDocus(docusList.docs.map((doc)=> doc.data()));
   
  }, [])
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('')

  const addOrEditLink = async (linkObject) => {
     try {
      if (currentId === '') {
        await cage.firestore().collection('links').doc().set({name:linkObject.name, description:linkObject.description, url:linkObject.url, archivo: archivoUrl });
        toast("New Lik Added", {
          type: "success",
        });
      } else {
      await cage.firestore().collection('links').doc(currentId).update({name:linkObject.name, description:linkObject.description, url:linkObject.url, archivo: archivoUrl});
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
        await cage.firestore().collection('links').doc(id).delete();
        toast('Link Removed Successfully',{
          type:'error',
          autoClose:2000,
        })
      }
  };
  const getLinks = async () => {
   cage.firestore().collection('links').onSnapshot((querySnapshot) => {
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
    <div className="col-md-8 p-2">
      {links.map((link) => (
        <div className="card mb-1" key={link.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
             <h4>{link.name}</h4> 
             
             <i className="material-icons text-danger" 
             onClick={ () => onDeleteLink(link.id)}
             >
              close
              </i>
              <i className="material-icons" 
              onClick={() => setCurrentId(link.id)}>
                create
              </i>
            </div>
            <p>{link.description}</p>
           
       {/* <ul>
         {docus.map((doc)=> <li><h3>{doc.nombre}</h3><img src={doc.url} height="100px" width="100px" /></li>)}
       </ul> */}
            <a href={link.url} target='_blank' rel="noopener noreferrer"> 
            Go to Website
            </a>
          </div>
      <div className="the-image"> <img src={link.archivo} height="150px" width="150px" /> 
       </div>
          </div>
          
      ))}
      </div>
      <Button onClick={() => signOut(auth)}>Cerrar sesión</Button>
  </div>
  );
};

export default Links;




// import React, {useEffect, useState} from "react";
// import LinkForm from "./LinkForm";
// import {toast} from 'react-toastify';

// import {db} from '../firebase';


// const Links = () => {
//   const [links, setLinks] = useState([]);
//   const [currentId, setCurrentId] = useState('');

//   const addOrEditLink =  async(linkObject)  => {
//     try{ 
//     if ( currentId === ''){
//       await db.collection('links').doc().set(linkObject);
//       toast('New Link added', {
//         type: 'Success',
//       });
//     } else{
//      await db.collection('links').doc(currentId).update(linkObject);
//      toast('Lik Updated Successfully',{
//        type: 'info',
//      });
//      setCurrentId('');
//     }
//   } catch (error) {console.error(error);
//   }
//   };

//   const getLinks = async () => {
//     db.collection('Links').onSnapshot((querySnapshot) => {
//       const docs = [];
//     querySnapshot.forEach((doc) => {
//       docs.push({...doc.data(), id: doc.id});
//     });
//     setLinks(docs);
//   });
//   };
//   useEffect(() => {
//     getLinks();
//   }, []);

//   return ( 
//   <div>
//     <div className="col-md-4 p-2">
//       <LinkForm {...{addOrEditLink, currentId, links}}/>
//     </div>
//     <div className="col-md-8 p-2">
//       {links.map((link) => (
//         <div className="card mb-1" key={link.id}>
//         <div className="card-body">
//           <div className="d-flex justify-content-between">
//           <h4>{link.name}</h4>
//           <div>
//           <i 
//           className="material-icons text-danger" 
//           onClick={() => onDeleteLink(link.id)}
//           >
//             close
//             </i>
//             <i 
//             className="material-icons" 
//             onClick={() => setCurrentId(link.id)}
//             >
//               create
//               </i>
//           </div>
//           </div>
//           <p>{link.description}</p>
//           <a href={link.url} target="_blank" rel="nooponer noreferrer">
//             Go to Website
//           </a>
//           </div>
//          </div>
//       ))}
//     </div>
//     </div>
//   );
// };

// export default Links;
