import { string } from "prop-types";
import React from "react";
import { Text } from "react-native";

const ErrorMessage = ({ error }) => (
  <Text style={{ fontSize: 14, color: "#ff1a1a" }}>{error}</Text>
);
ErrorMessage.propTypes = { error: string.isRequired };

export default ErrorMessage;
