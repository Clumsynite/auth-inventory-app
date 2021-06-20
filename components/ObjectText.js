import React from "react";
import { object, number, string } from "prop-types";
import { Text, View } from "react-native";

const ObjectText = ({ label, value, size, flex }) => (
  <View
    style={{
      marginVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View style={{ flex: flex.label }}>
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
    <View style={{ flex: flex.value, paddingLeft: 20 }}>
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
  flex: any,
};
ObjectText.defaultProps = { size: 16, flex: { label: 4, value: 6 } };

export default ObjectText;
