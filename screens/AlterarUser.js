import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

import pb from '../services/pocketbase';

export default function AlterarUser() {
  const [nome, setNome] = useState(pb.authStore.model?.name || "");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  async function handleUpdate() {
    if (!nome) {
      Alert.alert("Erro", "O nome não pode ficar vazio!");
      return;
    }

    try {

      const data = {
        name: nome
      };

      if (senhaAtual && novaSenha) {
        data.oldPassword = senhaAtual;
        data.password = novaSenha;
        data.passwordConfirm = novaSenha;
      }

      await pb.collection("users").update(pb.authStore.model.id, data);

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");

      setSenhaAtual("");
      setNovaSenha("");

    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os dados");
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil do Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.subtitulo}>Alterar Senha (opcional)</Text>

      <TextInput
        style={styles.input}
        placeholder="Senha atual"
        secureTextEntry
        value={senhaAtual}
        onChangeText={setSenhaAtual}
      />

      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        secureTextEntry
        value={novaSenha}
        onChangeText={setNovaSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleUpdate}>
        <Text style={styles.botaoTexto}>Salvar Alterações</Text>
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
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
  },
  subtitulo: {
    color: "white",
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "flex-start"
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
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});