import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Container, Button, Text } from "native-base";
import gS from "../styles/global";

export default function NuevaOrden() {

    const navigation = useNavigation();

    return (
        <Container style={gS.contenedor}>
            <View style={[gS.contenido, styles.contenido]}>
                <Button
                    bordered
                    rounded
                    transparent
                    style={gS.boton}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={gS.botonTexto}>Nueva orden</Text>
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    contenido: {
        flexDirection: 'column',
        justifyContent: "center"
    }
})