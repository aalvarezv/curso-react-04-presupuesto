import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Error from './Error'
import shortid from 'shortid'

const Formulario = ({guardarGasto, actualizarMostrarGastos}) => {

    const [nombre, guardarNombre] = useState('')
    const [cantidad, guardarCantidad] = useState(0)
    const [error, guardarError] = useState(false)
    
    const agregarNombre = e => {
        guardarNombre(e.target.value)
    }

    const agregarGasto = e =>{
        e.preventDefault()
        
        //validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true)
            return
        }

        //si pasa la validación, construir gasto
        guardarError(false)
        const gasto = {
            nombre,
            cantidad,
            id:shortid.generate()
        }
      
        //pasar el gasto al componente principal
        guardarGasto(gasto)
        actualizarMostrarGastos(true)

        //resetear el formulario
        guardarNombre('')
        guardarCantidad(0)

    }


    return ( 
        <form onSubmit={agregarGasto}>
            <h2>Agregar tus gastos aqui</h2>
            {error ? <Error mensaje='Ambos campos son obligatorios 
                                    o presupuesto incorrecto' /> : null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text" 
                    className="u-full-width"
                    placeholder="Ej. transporte"
                    value={nombre}
                    //Forma 1 pasa por una función
                    onChange={agregarNombre}
                />
            </div>

            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number" 
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    //Forma 2 directo con arrow function
                    onChange={e => guardarCantidad(parseInt(e.target.value))}
                    
                />
            </div>

            <input 
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            />
        </form>


     );
}

Formulario.propTypes = {
    guardarGasto : PropTypes.func.isRequired,
    actualizarMostrarGastos : PropTypes.func.isRequired
}
 
export default Formulario;