import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Image } from "react-native";

type Props = {
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

const CartItem = ({ image, title, description, price, quantity }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{`$ ${price * quantity}`}</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <View style={styles.button}>
          <MaterialCommunityIcons name="plus" size={20} color="white" />
        </View>
        <Text style={styles.quantity}>{quantity}</Text>
        <View style={[styles.button, styles.minusButton]}>
          <MaterialCommunityIcons name="minus" size={20} color="white" />
        </View>
      </View>
      <MaterialCommunityIcons name="close" size={20} color="#6e6969" />
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  quantityContainer: {
    flexDirection: "row",
  },
  quantity: {
    width: 34,
    height: 24,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#dadada",
    borderRadius: 16,
    marginHorizontal: 8,
    color: "white",
  },
  button: {
    width: 24,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6e6969",
    borderRadius: 24,
  },
  minusButton: {
    backgroundColor: "#ff5252",
  },
  title: {
    color: "#0c0c0c",
    fontWeight: "bold",
  },
  description: {
    color: "#6e6969",
  },
});
