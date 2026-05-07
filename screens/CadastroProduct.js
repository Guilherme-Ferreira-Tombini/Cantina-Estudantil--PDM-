import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Switch } from "react-native";

import * as ImagePicker from "expo-image-picker";

import pb from "../services/pocketbase";

export default function CadastroProduct({ navigation }) {
  const [nome, setNome] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  }

  async function handleCreateProduct() {
    if (!nome || !ingredients || !expirationDate || value <= 0 || quantity <= 0) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", nome);
      formData.append("ingredients", ingredients);
      formData.append("expiration_date", expirationDate);
      formData.append("status", status);
      formData.append("value", value);
      formData.append("quantity", quantity);

      if (image) {
       formData.append("image", {
            uri: image.uri,
            name: image.fileName || "photo.jpg",
            type: image.mimeType || "image/jpeg",
       });
      }

      const createData = await pb
        .collection("products")
        .create(formData);

      Alert.alert("Sucesso", "Produto cadastrado!");
      console.log(createData);

    } catch (error) {
        console.log(JSON.stringify(error.response, null, 2));
        Alert.alert("Erro", "Falha na criação do produto");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Produto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Ingredientes"
        value={ingredients}
        onChangeText={setIngredients}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de validade"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        onChangeText={(text) => setValue(Number(text))}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        onChangeText={(text) => setQuantity(Number(text))}
      />

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Disponível</Text>

        <Switch
          value={status}
          onValueChange={setStatus}
        />
      </View>

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.botaoTexto}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={handleCreateProduct}
      >
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

  imageButton: {
    width: "100%",
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },

  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 16,
  },
});