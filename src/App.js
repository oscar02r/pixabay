import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';


function App() {
  const [busqueda, guardarBusqueda] = useState('');
  
  useEffect(()=>{

     const consultarApi = async  () =>{
      if(busqueda.trim() === '') return;
      const imagenesPorPagina = 30;
      const key = "16262676-01c9f314a4a9f88a86dbe829a";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina }`;

      const resp = await fetch(url);
      const resultado = await resp.json();
      guardarBusqueda(resultado.hits);
     }

     consultarApi();

  }, [busqueda]);

  return (
   <div className="container">
     <div className="jumbotron">
       <p className="lead text-center" >Buscador de Imágenes
       </p>
       <Formulario
         guardarBusqueda={guardarBusqueda}
       />
     </div>
   </div>
  );
}

export default App;
