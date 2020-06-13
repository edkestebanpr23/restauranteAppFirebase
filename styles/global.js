import { StyleSheet } from "react-native";

const gS = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1
    },
    boton: {
        backgroundColor: '#FFDA00',
        marginVertical: 20,
        justifyContent: "center"
        // alignSelf: 'center',
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'black',
    },
    titulo: {
        textAlign: "center",
        marginTop: 40,
        marginBottom: 20,
        fontSize: 30
    },
    imagen: {
        height: 300,
        width: '100%'
    },
    cantidad: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    }
});

export default gS;