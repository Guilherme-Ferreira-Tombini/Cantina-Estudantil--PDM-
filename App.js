import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import Login from "./screens/Login";
import Home from "./screens/Home";
import CadastroUser from "./screens/CadastroUser";
import AlterarUser from "./screens/AlterarUser";
import CadastrarProduct from "./screens/CadastroProduct";
import RecuperaAcesso from "./screens/RecuperaAcesso";
import EditarProduct from "./screens/EditarProduct";

const Stack = createStackNavigator();

function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f77f1c",
          borderBottomWidth: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {!signed ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login" }}
          />

          <Stack.Screen
            name="Cadastro Usuário"
            component={CadastroUser}
            options={{ title: "Cadastro Usuário" }}
          />

          <Stack.Screen
            name="Recuperar Acesso"
            component={RecuperaAcesso}
            options={{
              title: "Recuperar acesso do usuário",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Home" }}
          />

          <Stack.Screen
            name="AlterarUser"
            component={AlterarUser}
            options={{
              title: "Alterar dados de cadastro",
            }}
          />

          <Stack.Screen
            name="CadastrarProduct"
            component={CadastrarProduct}
            options={{ title: "Cadastrar Produto" }}
          />

          <Stack.Screen
            name="EditarProduct"
            component={EditarProduct}
            options={{ title: "Editar Produtos" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return(
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}