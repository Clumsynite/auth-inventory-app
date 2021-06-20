import { number, string } from "prop-types";
import React from "react";
import { Image } from "react-native";
import { NoImageAvailable } from "../assets/base64";

const Avatar = ({ source, size }) => (
  <Image
    source={{ uri: source }}
    style={{ width: size, height: size, borderRadius: 100 }}
  />
);
Avatar.propTypes = {
  source: string,
  size: number,
};
Avatar.defaultProps = {
  size: 60,
  source: NoImageAvailable,
};

export default Avatar;
