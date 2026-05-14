import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import pb from "../services/pocketbase";
import CardProdutos from "./CardProdutos";

export default function CardProdutosLogica() {
  const [produtos, setProdutos] = useState([]);

  async function buscarProdutos() {
    try {
      const result = await pb.collection("products").getFullList({
        sort: "-created",
      });

      setProdutos(result);
    } catch (error) {
      console.log("Erro ao buscar produtos:", error);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

 return (
  <View style={{ width: "100%" }}>
    {produtos.length === 0 ? (
      <Text style={{ color: "#fff", textAlign: "center" }}>
        Nenhum produto encontrado
      </Text>
    ) : (
      produtos.map((item) => (
        <CardProdutos key={item.id} product={item} />
      ))
    )}
  </View>
);
}