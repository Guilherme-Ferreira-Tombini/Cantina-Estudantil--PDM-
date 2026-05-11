import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';

import pb from '../services/pocketbase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    verificarSessao();
  }, []);

  async function verificarSessao() {
    try {
      const token = await SecureStore.getItemAsync("token");

      if (!token) return;

      const autenticado = await LocalAuthentication.authenticateAsync({
                                                    promptMessage:
                                                      "Entrar com biometria",
                                                  });

      if (!autenticado.success) return;

      pb.authStore.save(
        token,
        null
      );

      await pb.collection("users").authRefresh();

      navigation.navigate("Home");
    } catch(error) {
      console.log(error);
      pb.authStore.clear();
      await SecureStore.deleteItemAsync(
        "token"
      );
    }
  }

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Error","Preencha todos os campos!");
      return;
    }

    try {
      const authData = await pb.collection("users").authWithPassword(email, senha);

      await SecureStore.setItemAsync(
        "email",
        email
      );

      await SecureStore.setItemAsync(
        "token",
        pb.authStore.token
      );

      await SecureStore.setItemAsync(
        "user",
        JSON.stringify(authData.record)
      );

      Alert.alert("Sucesso", "Logado!");
      navigation.navigate("Home");
    } catch(error) {
      Alert.alert("Erro", "Login inválido");
      console.log(error);
    }
  }

  async function loginBiometrico() {

    const compativel =
      await LocalAuthentication
        .hasHardwareAsync();

    if (!compativel) {
      Alert.alert("Erro", "Celular sem biometria");
      return;
    }

    const autenticado = await LocalAuthentication.authenticateAsync({
                                                  promptMessage:
                                                    "Entrar com biometria",
                                                });

    if (!autenticado.success) {
      Alert.alert("Erro", "Biometria inválida");
      return;
    }

    const token = await SecureStore.getItemAsync("token");

    if (!token) {
      Alert.alert("Erro", "Nenhuma sessão salva");
      return;
    }

    try {
      pb.authStore.save(
        token,
        null
      );

      await pb.collection("users").authRefresh();

      Alert.alert("Sucesso", "Login biométrico realizado");
      navigation.navigate("Home");
    } catch(error) {
      pb.authStore.clear();
      Alert.alert("Erro", "Sessão expirada");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

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

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={loginBiometrico}>
        <Text style={styles.botaoTexto}>Entrar com biometria</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cadastro Usuário")}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate("Recuperar Acesso")}>
        <Text style={styles.link}>Recuperar Acesso</Text>
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
  app:{
    fontSize:30,
    marginBottom:40,
    color:"white",
    fontWeight: "bold"
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