import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { eliminarProductoAction, obtenerProductoEditar } from '../actions/productoActions'
import Swal from 'sweetalert2'

const Producto = ({producto}) => {
  const dispatch = useDispatch()
  const history  = useHistory()

  const confirmarEliminar = id => {
    Swal.fire({
      cancelButtonColor : '#d33',
      confirmButtonColor: '#3085d6',
      confirmButtonText : 'Si, eliminarlo',
      icon              : 'warning',
      showCancelButton  : true,
      text              : 'Una vez eliminado no lo podrás recuperar!',
      title             : 'Estas seguro?'
    }).then((result) => {
      if(result.value)
        dispatch(eliminarProductoAction(id)) /// Hacemos el dispatch del action y pasamos el alert de confirmacion al action
    })
  }

  const redireccionarEditar = producto => {

    dispatch(obtenerProductoEditar(producto))

    history.push(`/productos/editar/${id}`)
  }

  const { nombre, precio, id } = producto
  return ( 
        <tr>
            <td>{nombre}</td>
            <td className='font-weight-bold text-right'>$ {precio}</td>
            <td className='acciones text-center'>
                <button 
                    className='btn btn-primary mr-2' 
                    onClick={ () => {redireccionarEditar(producto)}}
                    to={`/productos/editar/${id}`}>
                    Editar
                </button>
                <button 
                    type='button'
                    className='btn btn-danger'
                    onClick={()=> confirmarEliminar(id) }
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;