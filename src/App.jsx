import { useState, useEffect } from "react";

import "./App.css";
import { Col, Input, Row } from "reactstrap";

import { get } from "./actions/actions";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import datos from './datos.json'
function App() {

  // useEffect(() => {
  //   const url = "traductor/";
  //   get(url)
  //     .then((response) => {
  //       setPalabra(response.data);
  //       setTablaPalabra(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  
    const [Palabra, setPalabra] = useState([]);
    const [tablaPalabra, setTablaPalabra] = useState([]);
    const [busqueda, setBusqueda] = useState("");

  useEffect(()=> {
    setPalabra(datos)
    setTablaPalabra(datos)
  },[])

  console.log(Palabra)

  const handleChange = (e) => {
    const terminoBusqueda = e.target.value;
    setBusqueda(terminoBusqueda);
    filtrar(terminoBusqueda);
    console.log(terminoBusqueda);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaPalabra.filter((elemento) =>
      elemento.palabra.toLowerCase().includes(terminoBusqueda.toLowerCase())
    );

    setPalabra(resultadoBusqueda);
  };

 

  return (
    <>
      <div>
        <div className="col-md-7">
          <Input
            type="text"
            className="input-principal "
            placeholder="Escribe aqui la Palabra"
            onChange={handleChange}
            style={{ textTransform: "lowercase" }}
          />
        </div>

        <Row style={{ display: "inline-flex", flexWrap: "wrap" }}>
          {Array.isArray(Palabra)
            ? Palabra.map((item) => (
                <Col sm="12" md="2" key={item.id} style={{ margin: "10px" }}>
                  <Popup
                    trigger={
                      <button key={item.id} className="btn-medidas">
                        {item.palabra}
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
                        <div className="header">Definicion : {item.definicion}</div>
                       
                      </div>
                    )}
                  </Popup>
                </Col>
              ))
            : null}
        </Row>
      </div>
    </>
  );
}

export default App;
