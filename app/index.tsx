import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Layout, LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CartItem from "@/components/cart-item";
import { SampleItems } from "@/data";
import CartHeader from "@/components/cart-header";
import { useState } from "react";

export default function Index() {
  const [data, setData] = useState(SampleItems);
  const insets = useSafeAreaInsets();

  const handleDelete = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setData(newData);
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        marginTop: insets.top,
        backgroundColor: "white",
      }}
    >
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<CartHeader itemCount={data.length} />}
        renderItem={({ item }) => (
          <CartItem
            {...item}
            onDelete={() => handleDelete(item.id)}
            onQuantityChange={(quantity) =>
              handleQuantityChange(item.id, quantity)
            }
          />
        )}
      />
    </GestureHandlerRootView>
  );
}
