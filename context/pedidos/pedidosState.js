import React, { useReducer } from "react";
import PedidoReducer from "./pedidosReducer";
import PedidoContext from "./pedidosContext";
import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO, PEDIDO_ORDENADO } from "../../types";

const PedidoState = props => {

    // Creando un state inicial
    const initialState = {
        pedido: [], // Menú que se traerá de la base de datos, inicia vacío,
        platillo: null,
        total: 0,
        idPedido: ''
    };

    // useReducer con dispatch para ejecutar las funciones
    // No se para que sirve todo esto :v
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    // Selecciona el producto que el usuario desea ordenar
    const seleccionarPlatillo = (platillo) => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        });
        // console.log('PedidoState', platillo);
    };

    // Cuando el usuario confirma un pedido
    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        });
    };

    // Muestra el total a pagar en el resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        });
    };

    // Eliminar producto
    const eliminarProducto = (id) => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        });
    };

    const pedidoRealizado = (id) => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        });
    };


    /**
     * Este return contendrá todas las funciones a utilizar en toda la aplicación
     * Como no sabemos que pantallas/views van a hacer uso de estas funciones, le pasaremos las props
     * De esa manera, todos los componentes hijos se pondran dentro del <FirebaseContext.Provider>
     * Para pasar los valores del state, debo pasarlos como props de <FirebaseContext.Provider> 
     */
    return (
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idPedido: state.idPedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    );
};

export default PedidoState;