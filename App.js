import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { decode, encode } from 'base-64'; if (!global.btoa) { global.btoa = encode } if (!global.atob) { global.atob = decode }

// React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // El tipo de navegacion que tendremos, esta tambien los tabs :D

// Views
import DetallePlatillo from "./views/DetallePlatillo";
import FormularioPlatillo from "./views/FormularioPlatillo";
import Menu from "./views/Menu";
import NuevaOrden from "./views/NuevaOrden";
import ProgresoPedido from "./views/ProgresoPedido";
import ResumenPedido from "./views/ResumenPedido";

// Firebase
/**
 * Este FirebaseState deberá rodear toda la app para que se propague
 */
import FirebaseState from "./context/firebase/firebaseState";
import PedidoState from "./context/pedidos/pedidosState";

// Components
import BotonResumen from "./components/UI/BotonResumen";


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFDA00'
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerTitleAlign: 'center',
              }}
            >
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: 'Nueva Orden'
                }}
              />

              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: 'Detalle'
                }}
              />

              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{
                  title: 'Formulario'
                }}
              />

              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: 'Menú',
                  headerRight: props => <BotonResumen />
                }}
              />

              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: 'Progreso'
                }}
              />

              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: 'Resumen'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidoState>
      </FirebaseState>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
