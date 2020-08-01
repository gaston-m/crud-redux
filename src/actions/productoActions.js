import axiosCli from '../axios/config'
import Swal from 'sweetalert2'

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    EDICION_PRODUCTO_EXITO ,
    EDICION_PRODUCTO_ERROR


} from '../types'

export function crearNuevoProductoAction (producto) {

    return async (dispatch) =>{
        dispatch(agregarProducto())

        try{

            await axiosCli.post('productos', producto)

            dispatch(agregarProductoExito(producto))

            Swal.fire(
                'Correcto',
                'El Objeto se Creo Exitosamente',
                'success'
            )
        }
        catch (err) {
            console.log(err)
            dispatch(agregarProductoError(true))

            Swal.fire({
                icon: 'error',
                title: 'Ha Ocurrido un error',
                text: 'Ups, ocurrio un error intentalo nuevamente'
            })
        }

    }
}


const agregarProducto = ()=>({
    type: AGREGAR_PRODUCTO,
    payload: true
})

/// si el producto fue g¿uardado en la base de datos

const agregarProductoExito = producto =>({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = error =>({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
})




export function obtenerProductosAction(){

    return async (dispatch) => {
        dispatch( descargarProductos() )

        try{
            const response = await axiosCli('productos')
            dispatch( descargaProductosExitosa(response.data))
        }
        catch(err){
            console.log(err)    
            dispatch( descargaProductosError(true))
        }


    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = error => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: error
})


export function eliminarProductoAction(id) {
    return async (dispatch) => {
            dispatch( obtenerProductoEliminar(id))

            try {
                await axiosCli.delete(`productos/${id}`)
                dispatch( productoEliminadoExito())

                Swal.fire(
                    'Eliminado!',
                    'Tu producto ha sido eliminado',
                    'success'
                  )

            } catch (error) {
                console.log(error)    
                dispatch( productoEliminadoError())
            }
    }
}


const obtenerProductoEliminar = id =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const  productoEliminadoExito = () =>({
    type: PRODUCTO_ELIMINADO_EXITO
})

const  productoEliminadoError = () =>({
    type: PRODUCTO_ELIMINADO_ERROR
})


export function obtenerProductoEditar( producto) {
    return ( dispatch) => {
        dispatch( obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => {
    return ({
        type: OBTENER_PRODUCTO_EDITAR,
        payload: producto
    })
}


export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( editarProducto(producto))
        try {
            
            await axiosCli.put(`/productos/${producto.id}`, producto)
            dispatch(editarProductoExito(producto))

        } catch (error) {
            console.log(error)
            dispatch(editarProductoError())            
        }

    }
}

const editarProducto = (producto) => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: producto
})

const editarProductoExito = producto => ({
    type: EDICION_PRODUCTO_EXITO,
    payload: producto
})

const editarProductoError = producto => ({
    type: EDICION_PRODUCTO_ERROR,
    payload: true
})