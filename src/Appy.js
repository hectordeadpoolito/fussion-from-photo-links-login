import React from 'react';
import './App.css';
import { db } from './credenciales';

function Appy() {

  const [archivoUrl, setArchivoUrl] = React.useState("");
  const [docus,setDocus] = React.useState([]);

  const archivoHandler1 = async (e)=> {

    const archivo = e.target.files[0];
    const storageRef = db.storage().ref();
    const archivoPath = storageRef.child(archivo.name);
    await archivoPath.put(archivo);
    console.log("archivo cargado:",archivo.name);
    const enlaceUrl = await archivoPath.getDownloadURL();
    setArchivoUrl(enlaceUrl);

  }

  const submitHandler1 = async (e)=> {
    e.preventDefault()
const nombreArchivo = e.target.nombre.value;
if (!nombreArchivo) {
  alert("coloca un nombre")
  return
}
const coleccionRef =  db.firestore().collection("links");
const docu = await coleccionRef.doc(nombreArchivo).set({nombre: nombreArchivo, url: archivoUrl});
console.log("archivo cargado:", nombreArchivo, "ulr:", archivoUrl);
window.location="/"

  }

  React.useEffect(async ()=>{
    const docusList = await db.firestore().collection("links").get();
    setDocus(docusList.docs.map((doc)=> doc.data()));
   
  }, [])

  return (
    <>
    <form onSubmit={submitHandler1}  >
      <input type="file" onChange={archivoHandler1} />
      <input type="text" name="nombre" placeholder="nombra tu archivo" />
      <button>Enviar </button>
       </form>
       <ul>
         {docus.map((doc)=> <li><h3>{doc.nombre}</h3><img src={doc.url} height="100px" width="100px" /></li>)}
       </ul>
    </>
  );
}

export default Appy;