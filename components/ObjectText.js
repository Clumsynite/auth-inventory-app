import React from "react";
import { number, string } from "prop-types";
import { Text, View } from "react-native";

const ObjectText = ({ label, value, size }) => (
  <View
    style={{
      marginVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View style={{ flex: 4 }}>
      <Text
        style={{
          fontSize: size,
          fontWeight: "bold",
          flexShrink: 1,
          textAlign: "right",
        }}
      >
        {label}
      </Text>
    </View>
    <View style={{ flex: 6, paddingLeft: 20 }}>
      <Text style={{ fontSize: size, flexShrink: 1, textAlign: "left" }}>
        {value}
      </Text>
    </View>
  </View>
);
ObjectText.propTypes = {
  label: string.isRequired,
  value: string.isRequired,
  size: number,
};
ObjectText.defaultProps = { size: 16 };

export default ObjectText;
