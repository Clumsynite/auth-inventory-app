import moment from "moment";
import { number, string } from "prop-types";
import React, { useContext } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../context/auth";

export default function Home() {
  const {
    state: {
      user: { username, firstname, lastname, joined, email },
    },
  } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <UserAvatar username={username} size={120} />
      </View>
      <ObjectText label={"Name: "} value={`${firstname} ${lastname}`} />
      <ObjectText label={"Username: "} value={username} />
      <ObjectText label={"Email: "} value={email} />
      <ObjectText label={"Joined: "} value={moment(joined).fromNow()} />
    </SafeAreaView>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
