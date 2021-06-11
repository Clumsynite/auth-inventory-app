import { bool, number, string } from "prop-types";
import { ToastAndroid } from "react-native";

const Toast = ({ visible, message, duration, gravity }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(message, duration, gravity, 25, 50);
    return null;
  }
  return null;
};
Toast.propTypes = {
  visible: bool.isRequired,
  message: string.isRequired,
  duration: number,
  gravity: number,
};
Toast.defaultProps = {
  duration: ToastAndroid.LONG,
  gravity: ToastAndroid.BOTTOM,
};
