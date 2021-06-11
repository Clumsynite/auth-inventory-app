import { bool, string } from "prop-types";
import { ToastAndroid } from "react-native";

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};
Toast.propTypes = {
  visible: bool.isRequired,
  message: string.isRequired,
};
