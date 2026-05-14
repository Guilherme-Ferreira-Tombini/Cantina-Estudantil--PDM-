import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import pb from "../services/pocketbase";
import { Feather } from "@expo/vector-icons";

export default function CardProdutos({ product, onEdit }) {
  return (
    <View style={styles.card}>

      {product.image && (
        <Image
          source={{
            uri: pb.files.getUrl(product, product.image),
          }}
          style={styles.image}
        />
      )}

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.value}</Text>

      <Text style={styles.quantity}>
          Quantidade: {product.quantity}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.status}>
          {product.status ? "🟢 Disponível" : "🔴 Indisponível"}
        </Text>

        <TouchableOpacity onPress={() => onEdit(product)} style={styles.editButton}>
          <Feather name="edit-2" size={18} color="#333" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
      width: "100%",
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#f2f2f2",
    padding: 6,
    borderRadius: 20,
  }
});