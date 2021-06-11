import { bool, object, string } from "prop-types";
import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { Overlay } from "react-native-elements";

const TranslucentLoader = ({ visible, color, message, messageStyle }) => (
  <Overlay
    isVisible={visible}
    overlayStyle={{
      opacity: 0.5,
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <ActivityIndicator size="large" color={color} />
    {message && <Text style={messageStyle}>{message}</Text>}
  </Overlay>
);

TranslucentLoader.propTypes = {
  visible: bool.isRequired,
  color: string,
  message: string,
  messageStyle: object,
};
TranslucentLoader.defaultProps = { color: "#000" };

export default TranslucentLoader;
