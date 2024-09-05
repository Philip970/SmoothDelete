import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

type Props = {
  quantity: number;
  onQuantityChange(quantity: number): void;
};

const ItemQuantity = ({ quantity, onQuantityChange }: Props) => {
  const scale = useSharedValue(1);

  const AddButton = ({ onPress }: { onPress: () => void }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View>
          <View style={styles.horizontalBar} />
          <View style={styles.verticalBar} />
        </View>
      </TouchableOpacity>
    );
  };

  const MinusButton = ({ onPress }: { onPress: () => void }) => {
    return (
      <TouchableOpacity
        style={[styles.button, styles.minusButton]}
        onPress={onPress}
      >
        <View style={styles.horizontalBar} />
      </TouchableOpacity>
    );
  };

  const handleQuatityChange = (newQuantity: number) => {
    onQuantityChange(newQuantity);
    scale.value =
      newQuantity > quantity
        ? withSequence(withSpring(1.3), withSpring(1))
        : withSequence(withSpring(0.7), withSpring(1));
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

  return (
    <View style={styles.container}>
      <AddButton onPress={() => handleQuatityChange(quantity + 1)} />
      <View style={styles.quantityContainer}>
        <Animated.Text style={[styles.quantityText, rStyle]}>
          {quantity}
        </Animated.Text>
      </View>
      <MinusButton onPress={() => handleQuatityChange(quantity - 1)} />
    </View>
  );
};

export default ItemQuantity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 100,
  },
  horizontalBar: {
    width: 12,
    height: 1.5,
    backgroundColor: "white",
  },
  verticalBar: {
    width: 1.5,
    height: 12,
    backgroundColor: "white",
    position: "absolute",
    left: 5,
    top: -5,
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
  quantityContainer: {
    width: 34,
    height: 24,
    backgroundColor: "#dadada",
    borderRadius: 16,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  minusButton: {
    backgroundColor: "#ff5252",
  },
});
