import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import pb from "../services/pocketbase";

export default function RecuperaAcesso({ navigation }) {

  const [email, setEmail] = useState("");

  async function recuperarAcesso() {

    // validar email
    if (!email) {

      Alert.alert(
        "Erro",
        "Digite o email"
      );

      return;
    }

    try {
      await pb.collection("users")
        .requestPasswordReset(email);

      Alert.alert(
        "Sucesso",
        "Email de recuperação enviado"
      );

      navigation.navigate(
        "Login"
      );

    } catch(error) {

      console.log(error);

      Alert.alert(
        "Erro",
        "Falha ao recuperar acesso"
      );
    }
  }

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Recuperar Acesso
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={recuperarAcesso}
      >
        <Text style={styles.botaoTexto}>
          Recuperar
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
    backgroundColor: "#228B22",
  },

  titulo: {
    fontSize: 24,
    marginBottom: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },

  botao: {
    width: "100%",
    backgroundColor: "#f3772a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});