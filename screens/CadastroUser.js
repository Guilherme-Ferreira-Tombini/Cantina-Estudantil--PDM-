import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";

import pb from '../services/pocketbase';

export default function Login({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCreate() {
    if (!nome || !email || !senha) {
      Alert.alert("Error","Preencha todos os campos!");
      return;
    }

    try{
      const createData = await pb
        .collection("users").create({
          name: nome,
          email: email,
          password: senha,
          passwordConfirm: senha
        })

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");
      console.log(createData);
    }catch(error){
      Alert.alert("Erro", "Cadastro inválido!");
      console.log(error);
      console.log(error.data);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />
        
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

      <TouchableOpacity style={styles.botao} onPress={handleCreate}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
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