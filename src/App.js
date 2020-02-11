import React, {Fragment, useState, useEffect} from 'react';
import Pregunta from './component/Pregunta'
import Formulario from './component/Formulario'
import Listado from './component/Listado'
import ControlPresupuesto from './component/ControlPresupuesto'

function App() {

  const [presupuesto, guardarPresupuesto] = useState(0)
  const [restante, guardarRestante] = useState(0)
  const [mostrarpregunta, actualizarPregunta] = useState(true)
  const [gastos, guardarGastos] = useState([])
  const [gasto, guardarGasto] = useState({})
  const [mostrargastos, actualizarMostrarGastos] = useState(false)

  //useEffect que actualiza el restante
  useEffect(() =>{
    if(mostrargastos){

      //Agrega al presupuesto
      guardarGastos([
        ...gastos, 
        gasto
      ])
      //Resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad
      guardarRestante(presupuestoRestante)
      actualizarMostrarGastos(false)
    }
   
  },[gasto, gastos, restante, mostrargastos])

  return (
    <Fragment>

     <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido" >
          {mostrarpregunta ?
            (
              <Pregunta
                guardarPresupuesto = {guardarPresupuesto}
                guardarRestante = {guardarRestante}
                actualizarPregunta = {actualizarPregunta}
              />
            )
            : 
            (
             <div className="row">
               <div className="one-half column">
                 <Formulario 
                    guardarGasto = {guardarGasto}
                    actualizarMostrarGastos = {actualizarMostrarGastos}
                 />
               </div>
               <div className="one-half column">
                 <Listado 
                  gastos={gastos}
                 />
                 <ControlPresupuesto
                   presupuesto={presupuesto}
                   restante={restante}
                 />
               </div>
             </div>
            ) 
          }
        </div>
      </header>
    </div> 
    </Fragment>
  );
}

export default App;
