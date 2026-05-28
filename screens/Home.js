import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import CardProdutosLogica from "../components/CardProdutosLogica";

export default function Home({ navigation }) {
  const { logout, user } = useContext(AuthContext);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.titulo}>
        Bem-vindo {user?.name}
      </Text>

      <TouchableOpacity
        style={styles.botomS}
        onPress={logout}
      >
        <Text style={styles.textoBotao}>
          Sair
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botomAlt} onPress={() => navigation.navigate("AlterarUser")}>
        <Text style={styles.textoBotao}>
          Alterar cadastro
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botomCP} onPress={() => navigation.navigate("CadastrarProduct")}>
        <Text style={styles.textoBotao}>
          Cadastrar produto
        </Text>
      </TouchableOpacity>

      <View style={styles.produtos}>
        <CardProdutosLogica />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#228B22",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  botomAlt: {
    width: "100%",
    backgroundColor: "#F6B68E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  botomS: {
    width: "100%",
    backgroundColor: "#e02222",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  botomCP: {
    width: "100%",
    backgroundColor: "#B8FFCB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  produtos: {
    marginTop: 10,
  },
});