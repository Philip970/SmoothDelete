import CartItem from "@/components/cart-item";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <CartItem
        image="https://m.media-amazon.com/images/I/61V98P7+jiL._AC_UF894,1000_QL80_.jpg"
        title="2023 Sneakers"
        description="Women Sport Shoes"
        price={26.37}
        quantity={2}
      />
    </View>
  );
}
