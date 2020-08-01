import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { crearNuevoProductoAction } from '../actions/productoActions'
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaAction'

const NuevoProducto = ({ history }) => {
    const [ nombre, setNombre] = useState('')
    const [ precio, setPrecio ] = useState(0)

    const _handlePrecioChange = e =>{
        setPrecio(Number(e.target.value))
    }

    const _handleNombreChange = e =>{
        setNombre(e.target.value)
    }

    
    /// Utilizamos useSelector para ver el estado global de nuestra app

    const state = useSelector(state => state)

    const { loading, error } = state.productos
    const { alerta } = state.alerta

    // useDeispatch

    const dispatch = useDispatch()

    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )

    const _handleSubmit = e =>{
        e.preventDefault()

        // validar formulario

        if ( nombre.trim() === '' || precio <= 0) {

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3 mt-3'
            }

            dispatch(mostrarAlerta(alerta))

            return
        }

        // si no hay errores

        dispatch(ocultarAlerta())


        // crear nuevo producto

        agregarProducto({
                nombre,
                precio
        })

        history.push('/')
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                    <h2 className="mb-2 text-center font-weight-bold">
                            Agregar Nuevo producto
                    </h2>
                    { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null }
                    </div>
                    <div className="card-body">
                        <form onSubmit={ _handleSubmit }>
                            <div className="form-group">
                                <input 
                                 type="text"
                                 placeholder="Nombre del Producto"
                                 className="form-control"
                                 name="nombre"
                                 value={nombre}
                                 onChange={_handleNombreChange}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                 type="number"
                                 placeholder="Precio del Producto"
                                 className="form-control"
                                 name="precio"
                                 value={precio}
                                 onChange={_handlePrecioChange}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold form-control text-uppercase d-block w-100"
                                >
                                    Guardar Producto
                                </button>
                            </div>
                        </form>
                        {loading ? <p>Cargando.....</p> : null }
                        {error ? <p className="alert alert-danger text-center p-2 mt-4">UPS, OCURRIO UN ERROR</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;