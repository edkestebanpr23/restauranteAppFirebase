import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDENAR_PLATILLO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO, PEDIDO_ORDENADO } from "../../types";
/**
 * Aqui estoy exportando esto que no tiene nombre, al parecer puedo nombrarlo como quiera a la hora de
 * Importarlo en otro lugar
 */
export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                platillo: action.payload
            };
        case CONFIRMAR_ORDENAR_PLATILLO:
            return {
                ...state,
                pedido: [...state.pedido, action.payload] // Agrega el nuevo pedido al array de pedidos, teniendo en cuenta si
                // Ya existian valores previos en este
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                pedido: state.pedido.filter(articulo => articulo.id !== action.payload)
            }
        case PEDIDO_ORDENADO:
            return {
                ...state,
                pedido: [], // Como el pedido aqui ya se hizo, entonces lo reinicio
                total: 0, // De igual manera reinicio el total
                idPedido: action.payload
            }
        default:
            return state;
    }
}