import React, {useState, useEffect} from "react";
import { db } from "../credenciales";
import { toast } from "react-toastify";
import { Carousel } from "react-bootstrap";


const LinkForm = (props) => {

    const [archivoUrl, setArchivoUrl] = React.useState("");
    const [docus,setDocus] = React.useState([]);
    const initialStateValues = {
        url:"",
        name:"",
        price:"",
        face:"",
        description:"",
        archivo:''
    };

    const [values, setValues] = useState(initialStateValues);

    const archivoHandler1 = async (e)=> {
  
      const archivo = e.target.files[0];
      const storageRef = db.storage().ref();
      const archivoPath = storageRef.child(archivo.name);
      await archivoPath.put(archivo);
      console.log("archivo cargado:",archivo.name);
      const enlaceUrl = await archivoPath.getDownloadURL();
      props.setArchivoUrl(enlaceUrl);
      setValues({archivo:enlaceUrl})
archivo=[];
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

    

    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setValues({...values, [name]:value})
    };

    // const validateURL = (str) => {
    //         return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
    //       }
    

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (!validateURL(values.url)){
        //     return toast ('Invalid URL', {
        //         type: 'warning',
        //         autoClose: 1000,
        //     });
        // }
        props.addOrEditLink(values)
        setValues({...initialStateValues})
    };
    const getLinkById = async (id)  => {
        const doc = db.firestore().collection('links').doc(id).get();
        setValues({...(await doc).data()})
        
        
    };

    useEffect(() => {
        if (props.currentId === '') {
            setValues({...initialStateValues})
        } else {
            getLinkById(props.currentId);
        }
    }, [props.currentId]);
    return (

        <form className="card card-body" onSubmit={handleSubmit}><input type="file" onChange={archivoHandler1} />
            <div className="form-group input-group">
                
                <div className="input-group-text bg-light">
                
                <i className="material-icons">insert_link</i>
                </div>
                <input 
                type='text' 
                className='form-control' 
                placeholder="https://someurl.com" 
                name="url" 
                onChange={handleInputChange}
                value={values.url}
                />
            </div>
            <div className="form-group input input-group"> 
            <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
            </div>
            <input 
            type="text" 
            className="form-control" 
            name="name" 
            placeholder="website name" 
            onChange={handleInputChange}
            value={values.name}
            />
            </div>
            <div className="form-group input input-group"> 
            <div className="input-group-text bg-light">
            <i className="material-icons">face</i>
            </div>
            <input 
            type="text" 
            className="form-control" 
            name="face" 
            placeholder="person" 
            onChange={handleInputChange}
            value={values.face}
            />
            </div>
            <div className="form-group  input-group"> 
            <div className="input-group-tex bg-light">
            <i className="material-icons">money</i>
            </div>
            <input 
            type="text" 
            className="form-control" 
            name="price" 
            placeholder="price" 
            onChange={handleInputChange}
            value={values.price}
            />
            </div>

            <div className="form-group">
                <textarea name="description"
                rows="3" 
                className="form-control." 
                placeholder="Write a description"
                onChange={handleInputChange}
                value={values.description}
                ></textarea> 
            </div>
           <img src={values.archivo} ></img>
      

       
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>

    )
};

export default LinkForm;








// import { dblClick } from "@testing-library/user-event/dist/click";
// import React, {useState, useEffect }from "react";


// const LinkForm = (props) => {
//     const initialStateValues = {
//         url: '',
//         name: '',
//         description: '', 
//     };
//     const [values, setValues] = useState(initialStateValues);
    
//     const handleInputChange = (e) => {
//         const {name, value} = e.target;
//         setValues({...values, [name]: value})
//     }

//     const validateUrl = str => {
//             return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(
//             validate(vales.url));

//         props.addOrEditLink(values);
//         setValues({...initialStateValues})
//     }; 

//     const getLinkById = async (id) => {
//         const doc = await db.collection('links').doc(id).get();
//         setValues({...doc.data()})
//     }
//     useEffect(() => {
//         if(props.currentId === '') {
//             setValues({...initialStateValues});
//         } else {
//             getLinkById(props.currentId);
//         }
//     },[props.currentId]); 
    
//     return (
//    <form className="card card-body" onSubmit={handleSubmit}> 
//         <div className="form-group input-group">
//             <div claasName="input-group-text bg-light">
//             <i className="material-icons">insert_link</i>
//             </div>
//             <input
//             type="text"
//             className="form-control"
//             placeholder="https://someurl.com"
//             name="url"
//             onChange={handleInputChange}
//             value={values.url}
//             />
//         </div>

//         <div className="form-group input-group">
//             <div className="input-group-text bg-light">
//             <i className="material-icons">create</i>
//             </div>
//             <input 
//             type="text" 
//             className="form-control" 
//             name="name"
//             placeholder="Website name" 
//             onChange={handleInputChange}
//             value={values.name}
//             /> 
//         </div>

//         <div className="form-group">
//             <textarea 
//             name="description" 
//             rows="3" 
//             className="form-control"
//             placeholder="Write a description" 
//             onChange={handleInputChange} 
//             value={values.description}
//             > </textarea> 
//         </div>

//         <button className="btn btn-primary btn-block">
//             {props.currentId === '' ? 'Save': 'Update'}

//         </button>
//     </form>
//     )
// };

// export default LinkForm;