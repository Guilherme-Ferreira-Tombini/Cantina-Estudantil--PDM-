import { View, Text, Alert, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import CardProdutosLogica from "../components/CardProdutosLogica";
import * as SecureStore from 'expo-secure-store';
import pb from '../services/pocketbase';

export default function Home({navigation}){

  async function handleLogout() {
    try {
      pb.authStore.clear();
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
      await SecureStore.deleteItemAsync("email");
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  }
    return(
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.botomS} onPress={handleLogout}>
                <Text>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botomAlt} onPress={() => navigation.navigate("AlterarUser")}>
                <Text>Alterar cadastro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botomCP} onPress={() => navigation.navigate("CadastrarProduct")}>
                <Text>Cadastrar produto</Text>
        </TouchableOpacity>
        
        <View style={styles.produtos}>
                <CardProdutosLogica />
       </View>

    </ScrollView>
)}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "stretch",
    backgroundColor: "#228B22",
    color: "black"
  }, 
  botomAlt:{
    width: "100%",
    backgroundColor: "#F6B68E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  botomS:{
    width: "100%",
    backgroundColor: "#e02222",
    padding: 15,
    color: "#ffffff",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  botomCP:{
    width: "100%",
    backgroundColor: "#B8FFCB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  }
})