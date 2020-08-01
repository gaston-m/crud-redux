import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions'
import Producto from './Producto'

const Productos = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        const cargarProductos = () => { dispatch( obtenerProductosAction() )}
        cargarProductos()
    }, [ dispatch ])

    const { productos, error } = useSelector(state => state.productos)


    return ( 

        <Fragment>
            <h2 className="text-center my-5">
                Productos
            </h2>
            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">
                        Hubo un Error
                      </p>
                    :
                    null
           }
            <table className="table table-striped">
                <thead className="bg-primary table-dark text-center">
                    <tr>
                        <th scope="col">
                            Nombre
                        </th>
                        <th scope="col">
                            Precio
                        </th>
                        <th scope="col">
                            Accción
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    productos.length > 0 ? 
                        productos.map( prod => (
                            <Producto key={prod.id} producto={prod} />
                        )) 
                    :
                    <tr>
                        <td>
                            'No hay Productos' 
                        </td>
                    </tr>   
                }
                </tbody>
            </table>

        </Fragment>
     );
}
 
export default Productos;