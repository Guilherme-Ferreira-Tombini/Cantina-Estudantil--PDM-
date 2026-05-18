import React, { useState, useEffect } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Switch} from "react-native";
import * as ImagePicker from "expo-image-picker";
import pb from "../services/pocketbase";

export default function EditarProduct({ route, navigation }) {
    const { product } = route.params;
    const [nome, setNome] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(false);
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState("");

useEffect(() => {
    if (product) {
        setNome(product.name || "");
        setIngredients(product.ingredients || "");
        setExpirationDate(
        product.expiration_date ? product.expiration_date.substring(0, 10) : ""
      );
        setStatus(!!product.status);
        setValue(String(product.value ?? ""));
        setQuantity(String(product.quantity ?? ""));
    }
}, [product]);

async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
});

if (!result.canceled) {
        setImage(result.assets[0]);
    }
}

async function handleUpdateProduct() {
    try {
        console.log("clicou no salvar");
    if (
        !nome.trim() ||
        !ingredients.trim() ||
        !expirationDate.trim() ||
        value === "" ||
        quantity === ""
      ) 
    {Alert.alert("Erro", "Preencha todos os campos!");
    return;
    }

    const form = new FormData();

    form.append("name", nome.trim());
    form.append("ingredients", ingredients.trim());
    form.append("expiration_date", expirationDate.trim());
    form.append("status", status); 
    form.append("value", String(Number(value)));
    form.append("quantity", String(Number(quantity)));

    if (image?.uri) {
        form.append("image", {
          uri: image.uri,
          name: image.fileName || "photo.jpg",
          type: image.mimeType || "image/jpeg",
        });
    }
      
    console.log("ENVIANDO UPDATE...");

    await pb.collection("products").update(product.id, form);

    Alert.alert(
        "Sucesso", status ? "Produto disponível" : "Produto indisponível"
    );

    navigation.navigate("Home");
    } catch (error) {
      console.log("ERRO COMPLETO:", JSON.stringify(error.response, null, 2));
      Alert.alert("Erro", "Falha ao atualizar produto");
    }
}

return (
    <View style={styles.container}>

    <Text style={styles.titulo}>Editar Produto</Text>

        <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome"
        />

        <TextInput
            style={styles.input}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Ingredientes"
        />

        <TextInput
            style={styles.input}
            value={expirationDate}
            onChangeText={setExpirationDate}
            placeholder="YYYY-MM-DD"
        />

        <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={value}
            onChangeText={setValue}
            placeholder="Valor"
        />

        <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Quantidade"
        />

        <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
            {status ? "Disponível" : "Indisponível"}
            </Text>
            <Switch value={status} onValueChange={setStatus}/>
        </View>

        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.botaoTexto}>Alterar Imagem</Text>
        </TouchableOpacity>

        {image ? (
            <Image 
            source={{ uri: image.uri }} 
            style={styles.image}/>
        ) : product.image ? (
            <Image 
            source={{ uri: pb.files.getURL(product, product.image) }} 
            style={styles.image}/>
        ) : null}

        <TouchableOpacity style={styles.botao} onPress={handleUpdateProduct}>
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
    width: 80,
    height: 80,
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
}
});