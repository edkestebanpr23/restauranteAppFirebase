import React, { useContext, useEffect, Fragment } from "react";
import { StyleSheet } from "react-native";
import FirebaseContext from "../context/firebase/firebaseContext";
import { Container, Text, Separator, Content, List, ListItem, Thumbnail, Left, Body } from "native-base";
import globalStyles from "../styles/global";
import PedidoContext from "../context/pedidos/pedidosContext";
import { useNavigation } from "@react-navigation/native";

export default function Menu() {

    // Context de Firebase
    const { menu, obtenerProductos } = useContext(FirebaseContext);

    // Context de Pedido
    const { seleccionarPlatillo } = useContext(PedidoContext);

    useEffect(() => {
        obtenerProductos();
        // console.log('Menú');
        // console.log(menu);
    }, []);

    const mostrarHeading = (categoria, i) => {
        let flag = false;
        if (i > 0) {
            const categoriaAnterior = menu[i - 1].categoria;
            if (categoriaAnterior != categoria) {
                flag = true;
            }
        } else {
            flag = true;
        }
        if (flag) {
            return (
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>{categoria.toUpperCase()}</Text>
                </Separator>
            );
        }
    };

    // Hook para redireccionar
    const navigation = useNavigation();

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#FFFFFF' }}>
                {/* Este list ya trae el scrollview */}
                <List>
                    {menu.map((platillo, i) => {
                        const { imagen, nombre, descripcion, categoria, precio, id } = platillo;

                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem onPress={() => {
                                    seleccionarPlatillo(platillo);
                                    navigation.navigate('DetallePlatillo');
                                }} >
                                    <Thumbnail large circle source={{ uri: imagen }} />
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text note numberOfLines={1} >{descripcion}</Text>
                                        <Text>Precio: {precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        );
                    })}
                </List>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000000',
    },
    separadorTexto: {
        color: '#FFDA00',
        fontWeight: 'bold'
    }
});