import React, { useState, useEffect} from "react";

import "./App.css";
import { Col, Input, Row } from "reactstrap";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import datos from './datos.json'


import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';





function App() {


  
    const [Palabra, setPalabra] = useState([]);
    const [tablaPalabra, setTablaPalabra] = useState([]);
    const [busqueda, setBusqueda] = useState("");

  useEffect(()=> {
    setPalabra(datos)
    setTablaPalabra(datos)
  },[])



  const prueba = ({ index  }) => {

 const palabra = Palabra[index]
 return(
<Row style={{ display: "inline-flex", flexWrap: "wrap" }}>
  <Col sm="12" md="2" key={palabra.id} style={{ margin: "10px" }}>
                  <Popup
                    trigger={
                      <button key={palabra.id} className="btn-medidas">
                        {palabra.palabra}
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal">
                        <Row 
                        style={{display:'flex', justifyContent:'flex-end'}}
                        >

                      
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        </Row>
                        <div className="header">Definicion : {palabra.definicion}</div>
                       
                      </div>
                    )}
                  </Popup>
                </Col>
                </Row>
 )
  };
  

  const handleChange = (e) => {
    const terminoBusqueda = e.target.value;
    setBusqueda(terminoBusqueda);
    filtrar(terminoBusqueda);
   
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaPalabra.filter((elemento) => {
      if (languaje) {
        return elemento.definicion.toLowerCase().includes(terminoBusqueda.toLowerCase());
      } else {
        return elemento.palabra.toLowerCase().includes(terminoBusqueda.toLowerCase());
      }
    });
  
  
    setPalabra(resultadoBusqueda);
  };
  


  const [languaje, setlanguaje] = useState(false)
 const handleChangeLanguaje = () =>{
  setlanguaje(!languaje)
 }

  return (
    <>
      
        <div className="col-md-7">
          <Input
            type="text"
            className="input-principal "
            placeholder="Escribe aqui la Palabra"
            onChange={handleChange}
            style={{ textTransform: "lowercase" }}
          />

          <button
          
          onClick={handleChangeLanguaje}
          >
            {languaje? "Wayu":"Español"}
          </button>
        </div>

        {/* <div style={{ width: '100%', height: '100vh' }}>
      <AutoSizer>
        {({ height, width }) => (

        <List
          height={height}
          itemCount={Palabra.length}
          itemSize={60}
          width={width}
        >
          {prueba}
        </List>
  )}
  </AutoSizer>
  </div> */}



<Row style={{ display: "inline-flex", flexWrap: "wrap" }}>


  {Array.isArray(Palabra)? Palabra.map(palabra=>(


    
  <Col sm="12" md="2" key={palabra.id} style={{ margin: "10px" }}>
                  <Popup
                    trigger={
                      <button key={palabra.id} className="btn-medidas">

                        {languaje ? palabra.definicion : palabra.palabra}
                      </button>
                    }
                    modal
                    nested
                  >
                    {(close) => (
                      <div className="modal">
                        <Row 
                        style={{display:'flex', justifyContent:'flex-end'}}
                        >

                      
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        </Row>
                        <div className="header">Definicion :   {languaje ? palabra.palabra : palabra.definicion}</div>
                       
                      </div>
                    )}
                  </Popup>
                </Col>
  )):null}
 
  
                </Row>

              




    </>
  );
}

export default App;
