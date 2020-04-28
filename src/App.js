import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [totalpaginas, GuadarTotalpaginas] = useState(1);
  const [paginaactual, guardarPaginaActual] = useState(1);
  useEffect(()=>{

     const consultarApi = async  () =>{
      if(busqueda.trim() === '') return;
      const imagenesPorPagina = 30;
      const key = "16262676-01c9f314a4a9f88a86dbe829a";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const resp = await fetch(url);
      const resultado = await resp.json();
      guardarImagenes(resultado.hits);
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      GuadarTotalpaginas(calcularTotalPaginas);
     }

     consultarApi();

  }, [busqueda, paginaactual]);
  
  const paginaAnterior = () => {
    const nuevaPaginaAcutal = paginaactual - 1;

    if( nuevaPaginaAcutal === 0 ) return;
    
    
    guardarPaginaActual(nuevaPaginaAcutal);

  }

  const paginaSiguiente = () => {
        const nuevaPaginaAcutal = paginaactual + 1;
        
        if(nuevaPaginaAcutal > totalpaginas) return;
        guardarPaginaActual(nuevaPaginaAcutal);
  }
  return (
   <div className="container">
     <div className="jumbotron">
       <p className="lead text-center" >Buscador de Imágenes
       </p>
       <Formulario
         guardarBusqueda={guardarBusqueda}
       />
     </div>

     <div className="row justify-content-center">
          <ListadoImagenes
               imagenes={imagenes}
          />
         {
           (paginaactual === 1) ? null:
           <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior 
          </button>
         }
         {
           (paginaactual === totalpaginas) ? null:(
           <button
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
          )}
     </div>
   </div>
  );
}

export default App;
