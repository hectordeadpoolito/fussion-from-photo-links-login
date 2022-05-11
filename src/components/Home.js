import React, { useState, useEffect } from "react";
import { db } from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { Container, Button } from "react-bootstrap";

import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(db);
const firestore = getFirestore(db);

const Home = ({ correoUsuario }) => {
  const [arrayTareas, setArrayTareas] = useState(null);
  const fakeData = [
    { id: 1, descripcion: "tarea falsa 1", url: "https://picsum.photos/420" },
    { id: 2, descripcion: "tarea falsa 2", url: "https://picsum.photos/420" },
    { id: 3, descripcion: "tarea falsa 3", url: "https://picsum.photos/420" },
  ];

  async function buscarDocumentOrCrearDocumento(idDocumento) {
    //crear referencia al documento
    const docuRef = doc(firestore, `usuarios/${idDocumento}`);
    // buscar documento
    const consulta = await getDoc(docuRef);
    // revisar si existe
    if (consulta.exists()) {
      // si sí existe
      const infoDocu = consulta.data();
      return infoDocu.tareas;
    } else {
      // si no existe
      await setDoc(docuRef, { tareas: [...fakeData] });
      const consulta = await getDoc(docuRef);
      const infoDocu = consulta.data();
      return infoDocu.tareas;
    }
  }

  useEffect(() => {
    async function fetchTareas() {
      const tareasFetchadas = await buscarDocumentOrCrearDocumento(
        correoUsuario
      );
      setArrayTareas(tareasFetchadas);
    }

    fetchTareas();
  }, []);

  return (
    <Container>
      
      
      <Button onClick={() => signOut(auth)}>Cerrar sesión</Button>
      <hr />
      
    </Container>
  );
};

export default Home;