import { View, Text, Alert, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import CardProdutosLogica from "../components/CardProdutosLogica";

export default function Home({navigation}){
    return(

    <ScrollView contentContainerStyle={styles.container}>

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
    flex: 1,
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
  botomCP:{
    width: "100%",
    backgroundColor: "#B8FFCB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  }
})