import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { editarProductoAction } from '../actions/productoActions'

const EditarProducto = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const producto = useSelector(state => state.productos.productoEditar)
    if(!producto){
        history.push('/')
        //return null
    }
    const { nombre, precio, id } = producto    

    const [ productoEdit, setProductoEdit ] = useState({
        nombre: nombre,
        precio: precio,
        id: id
    })
    const editarProducto = e => {
        e.preventDefault()

        if(nombre.trim() !== '' && precio > 0 ){
            dispatch(editarProductoAction(productoEdit))
        }
        history.push('/')

    }

    const  _handlerChange = e => {
        setProductoEdit({
            ...productoEdit,
            [e.target.name]: e.target.value
        })
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                    <h2 className="mb-2 text-center font-weight-bold">
                            Editar producto
                    </h2>
                    </div>
                    <div className="card-body">
                        <form
                          onSubmit={ editarProducto }
                        >
                            <div className="form-group">
                                <input 
                                 type="text"
                                 placeholder="Nombre del Producto"
                                 className="form-control"
                                 name="nombre"
                                 onChange={ _handlerChange }
                                 value={ productoEdit.nombre }
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                 type="number"
                                 placeholder="Precio del Producto"
                                 className="form-control"
                                 name="precio"
                                 onChange={ _handlerChange }
                                 value={ productoEdit.precio }
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                >
                                    Editar Producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;