import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type Props = {
  onDelete(): void;
};

const DeleteButton = ({ onDelete }: Props) => {
  const rotate = useSharedValue(45);
  const scale = useSharedValue(1);

  const rBar1Style = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }],
    };
  });

  const rBar2Style = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `-${rotate.value}deg` }],
    };
  });

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleDelete = () => {
    rotate.value = withTiming(0, { duration: 200 });
    scale.value = withDelay(
      200,
      withTiming(0, { duration: 200 }, () => runOnJS(onDelete)())
    );
  };

  return (
    <TouchableOpacity onPress={handleDelete}>
      <Animated.View style={[styles.container, rContainerStyle]}>
        <Animated.View style={[styles.bar1, rBar1Style]} />
        <Animated.View style={[styles.bar2, rBar2Style]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DeleteButton;

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    justifyContent: "center",
  },
  bar1: {
    width: 20,
    height: 1.5,
    backgroundColor: "#6e6969",
  },
  bar2: {
    width: 20,
    height: 1.5,
    backgroundColor: "#6e6969",
    position: "absolute",
  },
});
