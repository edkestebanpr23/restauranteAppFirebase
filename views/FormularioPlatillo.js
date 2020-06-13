import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import PedidoContext from "../context/pedidos/pedidosContext";
import { Container, Content, Button, Icon, Input, Text, Form, Grid, Col, Footer, FooterTab } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

export default function FormularioPlatillo() {

    const [cantidad, setCantidad] = useState(1);
    const [total, setTotal] = useState(0);

    const navigation = useNavigation();

    const { platillo, guardarPedido } = useContext(PedidoContext);
    const { precio } = platillo;
    console.log(precio)

    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        setTotal(totalPagar);
    };

    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

    const calcularCantidad = (cantidad) => {
        if (cantidad) {
            if (cantidad == 0) {
                setCantidad(parseInt(1));
            } else {
                setCantidad(parseInt(cantidad));
            }
        } else {
            setCantidad(1);
        }
    }

    // Confirma si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar.',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Almacenar al pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        };
                        // console.log(pedido);
                        guardarPedido(pedido);
                        // Navegar al resumen
                        navigation.navigate('ResumenPedido');
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    };

    return (
        <Container>
            <Content>
                <Form>
                    <Text>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button props dark style={{ height: 80, justifyContent: 'center' }}
                                onPress={() => {
                                    if (cantidad > 1) {
                                        setCantidad(cantidad - 1)
                                    }
                                }}
                            >
                                <Icon style={{ fontSize: 40 }} name="remove" />
                            </Button>
                        </Col>

                        <Col>
                            <Input
                                value={cantidad.toString()}
                                style={{ textAlign: "center", fontSize: 20 }}
                                keyboardType='numeric'
                                onChangeText={cantidad => calcularCantidad(cantidad)} // En caso de que alguien modifique el input manualmente

                            />
                        </Col>

                        <Col>
                            <Button props dark style={{ height: 80, justifyContent: 'center' }}
                                onPress={() => setCantidad(cantidad + 1)}
                            >
                                <Icon style={{ fontSize: 40 }} name="add" />
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
                </Form>
            </Content>

            <Footer>
                <FooterTab>
                    <Button style={globalStyles.boton} onPress={() => confirmarOrden()} >
                        <Text style={globalStyles.botonTexto}>Agregar al predido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}