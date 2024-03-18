import React, { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [estado, setEstado] = useState([]);
  const [current, setCurrent] = useState(null);
  const [detalle, setDetalle] = useState([]);
  const [text, setText] = useState("asd");
  const [page, setPage] = useState(1)

  const detallePersonaje = async () => {
    const response = await fetch(`https://swapi.dev/api/people/${current}/`);
    const data = await response.json();
    setDetalle(data);
  };

  const busquedaInput = async() =>{
    const response = await fetch(`https://swapi.dev/api/people/?search=${text}`)
    const data = await response.json()
    setEstado(data)
  }
   
  const handleChange = (event) => {
    console.log(event)
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    busquedaInput();
  };

  const paginaSiguiente = async () =>{
    if(estado.next) {
      const response = await fetch(estado.next);
      const string = response.url
      const nuevo = string.split("/").splice(5,6)[0]
      const numero = nuevo.split("").pop()
      setPage(numero)


      const data = await response.json();
      setEstado(data);
    }
  };

  const paginaAnterior = async () =>{

    if(estado.previous){
      const response = await fetch(estado.previous)
      const data = await response.json()
      setEstado(data)
      const string = response.url
      const nuevo = string.split("/").splice(5,6)[0]
      const numero = nuevo.split("").pop()
      setPage(numero)
    }
  }

  useEffect(() => {
    fetch("https://swapi.dev/api/people")
      .then((res) => res.json())
      .then((res) => {
        setEstado(res);
      });
  }, []);

  useEffect(() => {
    detallePersonaje();
  }, [current]);



console.log(page)
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "150px", height: "40px", border: "none", padding: "3px" }}
          placeholder='Buscar tu personaje'
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
      <h1>Prueba tecnica 4</h1>
      <div>
        {estado.results && (
          estado.results.map((personaje) => (
            <h1 key={personaje.name} onClick={() => setCurrent(personaje.url.split('/').splice(5, 6)[0])}>
              {personaje.name}
            </h1>
          ))
        )}
        <div className='detallePersonaje'>
          <h1>DETALLE DEL PERSONAJE</h1>
          <h1>{detalle.name}</h1>
          <h1>{detalle.mass}</h1>
          <h1>{detalle.height}</h1>
          <h1>{detalle.birth_year}</h1>
        </div>
        <section>
          <button onClick={()=>paginaAnterior()}>Prev</button>
          <h1>{page}</h1>
          <button onClick={()=>paginaSiguiente()}>Next</button>
        </section>
      </div>
    </>
  );
}

export default App;
