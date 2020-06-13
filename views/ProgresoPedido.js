import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Text, H1, H3, Button } from "native-base";
import PedidoContext from "../context/pedidos/pedidosContext";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import firebase from "../firebase";
import Countdown from "react-countdown";


export default function ProgresoPedido() {

    const { idPedido } = useContext(PedidoContext);
    const navigation = useNavigation();

    const [tiempo, setTiempo] = useState(0);
    const [completado, setCompletado] = useState(false);

    useEffect(() => {
        function obtenerProducto() {
            firebase.db.collection('ordenes').doc(idPedido).onSnapshot(function (doc) {
                console.log(doc.data().tiempoEntrega);

                /**
                 * Estas dos funciones estarán pendientes de cuando en el servidor las ordenes son actualizadas
                 */
                setTiempo(doc.data().tiempoEntrega); // Está pendiente de cuando se publique el tiempo de entrega
                setCompletado(doc.data().completado); // Está pendiente de cuando actualice en el servidor la orden como completada
            });
        }
        obtenerProducto();
    }, []);

    // Muestra erl Countdown en pantalla
    const renderer = ({ minutes, seconds }) => {
        console.log(minutes);

        return (
            <Text style={styles.tiempo}> {minutes}:{seconds} </Text>
        );
    };

    return (
        <Container style={globalStyles.contenedor}>
            <View style={[globalStyles.contenedor, { marginTop: 50 }]}>
                {
                    tiempo === 0 && (
                        <>
                            <Text style={{ textAlign: "center" }}>Hemos recibido tu orden...</Text>
                            <Text style={{ textAlign: "center" }}>Estamos calculando el tiempo de entrega</Text>
                        </>
                    )
                }

                {
                    !completado && tiempo > 0 && (
                        <>
                            <Text style={{ textAlign: "center" }}>Su orden estará lista en:</Text>
                            <Text style={styles.tiempo}>
                                <Countdown
                                    date={Date.now() + tiempo * 60000}
                                    renderer={renderer}
                                />
                            </Text>
                        </>
                    )
                }

                {
                    completado && (
                        <>
                            <H1 style={styles.completado}>Orden lista</H1>
                            <H3 style={styles.completado}>Por favor pase a recoger su pedido</H3>

                            <Button rounded block dark style={[globalStyles.boton, { marginTop: 100 }]}
                                onPress={() => navigation.navigate('NuevaOrden')}
                            >
                                <Text style={[globalStyles.botonTexto, { color: '#000000' }]}>Comenzar una nueva orden</Text>
                            </Button>
                        </>
                    )
                }
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 30
    },
    completado: {
        textAlign: "center",
        textTransform: 'uppercase',
        marginBottom: 20
    }
});