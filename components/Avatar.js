import { number, string } from "prop-types";
import React from "react";
import { Image } from "react-native";

const Avatar = ({ source, size }) => (
  <Image
    source={{ uri: source }}
    style={{ width: size, height: size, borderRadius: 100 }}
  />
);
Avatar.propTypes = {
  source: string.isRequired,
  size: number,
};
Avatar.defaultProps = {
  size: 60,
};

export default Avatar;
