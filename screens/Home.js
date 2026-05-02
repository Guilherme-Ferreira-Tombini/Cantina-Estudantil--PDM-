import { View, Text, Alert, TouchableOpacity, StyleSheet} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";

export default function Home({navigation}){
    return(
    <View style={styles.container}>
        <Text>Home da aplicação</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AlterarUser")}>
                <Text>Alterar cadastro</Text>
        </TouchableOpacity>
    </View>

)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#228B22",
    color: "black"
  }, 
})