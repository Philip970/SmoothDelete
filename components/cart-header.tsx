import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  itemCount: number;
};

const CartHeader = ({ itemCount }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CART</Text>
      <Text style={styles.count}>{itemCount} Items</Text>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  count: {
    fontSize: 12,
    color: "#6e6969",
  },
});
