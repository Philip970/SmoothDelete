import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  image: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

const CartItem = ({ image, title, description, price, quantity }: Props) => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0);
  const contextX = useSharedValue(0);

  const panGestureEvent = Gesture.Pan()
    .onBegin(() => {
      contextX.value = translateX.value;
    })
    .onChange((event) => {
      console.log("SCALE : ", 1 - event.translationX / 100);
      if (event.translationX > 0) {
        translateX.value = event.translationX + contextX.value;
        /* if (event.translationX < 100)
          scale.value = withTiming(1 - event.translationX / 100);
        else scale.value = withTiming(1); */
      }
    })
    .onEnd((event) => {
      if (event.translationX < 100) {
        translateX.value = withSpring(0);
        scale.value = withTiming(1);
      } else scale.value = withTiming(1);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  const rPinStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGestureEvent}>
      <View>
        <Animated.View style={[styles.container, rStyle]}>
          <View style={styles.imageContainer}>
            <Animated.Image source={{ uri: image }} style={[styles.image]} />
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
        </Animated.View>
        <Animated.View style={[styles.bin, rPinStyle]} />
      </View>
    </GestureDetector>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
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
  bin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#960018",
    borderWidth: 2,
    borderColor: "#420D09",
    position: "absolute",
    right: 8,
    top: 24,
  },
});
