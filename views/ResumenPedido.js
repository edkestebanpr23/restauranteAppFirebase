import React, { useContext, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import PedidoContext from "../context/pedidos/pedidosContext";
import { Container, Content, Footer, FooterTab, Button, Body, Text, H1, List, ListItem, Thumbnail, Left, Icon } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import firebase from "../firebase";

export default function ResumenPedido() {

    const navigation = useNavigation();

    // Context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    function calcularTotal() {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((_nuevoTotal, articulo) => _nuevoTotal + articulo.total, 0);
        console.log('Nuevo total: ', nuevoTotal);
        mostrarResumen(nuevoTotal);
    }

    // Redirecciona a progreso pedido
    function ProgresoPedido() {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        // Publicar en Firebase

                        // Crear un objeto
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido,
                            creado: Date.now()
                        }

                        // Firebase
                        try {
                            const pedidoFB = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedidoFB.id); // Actualizando el id de Pedido en el PedidoState

                            // Redireccionar
                            navigation.navigate('ProgresoPedido');
                        } catch (error) {
                            console.log(error);
                        }

                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    // Elimina un producto del arreglo de productos
    function confirmarEliminacion(id) {
        console.log(id);
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id);
                        // Calcularlo
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}></H1>
                {
                    pedido.map(platillo => {
                        const { imagen, nombre, descripcion, categoria, precio, id, cantidad } = platillo;
                        return (
                            <List key={id}>
                                <ListItem thumbnail>
                                    <Left>
                                        <Thumbnail large square source={{ uri: imagen }} />
                                    </Left>

                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text>Cantidad: {cantidad} </Text>
                                        <Text>Precio: ${precio} </Text>
                                        <Button icon='delete' danger rounded
                                            style={{ marginTop: 20 }}
                                            onPress={() => confirmarEliminacion(id)}
                                        >
                                            <Icon name="trash" />
                                            <Text>Eliminar</Text>
                                        </Button>
                                    </Body>
                                </ListItem>
                            </List>
                        )
                    })
                }

                <Text>Total a pagar: $ {total}</Text>
                <Button style={{ marginTop: 30 }} dark full onPress={() => navigation.navigate('Menu')}>
                    <Text style={[globalStyles.botonTexto, { color: '#FFFFFF' }]}>Seguir pidiendo</Text>
                </Button>
            </Content>

            <Footer>
                <FooterTab>
                    <Button style={globalStyles.boton} onPress={ProgresoPedido} >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}