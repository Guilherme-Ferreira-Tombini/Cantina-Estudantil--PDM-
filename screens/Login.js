import React, { useState, useContext } from "react";

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { AuthContext } from "../contexts/AuthContext";

export default function Login({ navigation }) {
  const { login, loginBiometrico } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {

    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await login(email, senha);
      Alert.alert("Sucesso", "Logado!");
    } catch(error) {
      console.log(error);
      Alert.alert("Erro", "Login inválido");
    }
  }

  async function handleBiometria() {
    try {
      await loginBiometrico();
      Alert.alert("Sucesso", "Login biométrico realizado");
    } catch(error) {
      console.log(error);
      Alert.alert("Erro", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={handleLogin}
      >
        <Text style={styles.botaoTexto}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={handleBiometria}
      >
        <Text style={styles.botaoTexto}>
          Entrar com biometria
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Cadastro Usuário")
        }
      >
        <Text style={styles.link}>
          Não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Recuperar Acesso")
        }
      >
        <Text style={styles.link}>
          Recuperar Acesso
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#228B22",
  },
  titulo: {
    fontSize: 24,
    marginBottom: 30,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  botao: {
    width: "100%",
    backgroundColor: "#f3772a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#fda772",
  },
});