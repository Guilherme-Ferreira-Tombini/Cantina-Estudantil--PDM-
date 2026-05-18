import { createStackNavigator } from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Login from "./screens/Login.js";
import Home from "./screens/Home.js"
import CadastroUser from "./screens/CadastroUser.js"
import AlterarUser from "./screens/AlterarUser.js"
import CadastrarProduct from "./screens/CadastroProduct.js"
import EditarProduct from "./screens/EditarProduct.js";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      id={undefined} 
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f77f1c",
          borderBottomWidth: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        }
      }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: "Login"}}
        />

        <Stack.Screen
          name="Cadastro Usuário"
          component={CadastroUser}
          options={{title: "Cadastro Usuário"}}
        />

        <Stack.Screen
          name="AlterarUser"
          component={AlterarUser}
          options={{title: "Alterar dados de cadastro"}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: "Home"}}
        />

        <Stack.Screen
          name="CadastrarProduct"
          component={CadastrarProduct}
          options={{title: "Cadastrar Produto"}}
        />

        <Stack.Screen 
          name="EditarProduct" 
          component={EditarProduct} 
          options={{title: "Editar Produto"}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}