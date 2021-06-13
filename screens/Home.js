import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

import { UserAvatar, ObjectText } from "../components";
import { AuthContext } from "../context/auth";

export default function Home() {
  const {
    state: {
      user: { username, firstname, lastname, joined, email },
    },
  } = useContext(AuthContext);

  const navigation = useNavigation();
  const goToInventoryScreen = () => navigation.navigate("Inventory");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <UserAvatar username={username} size={120} />
      </View>
      <ObjectText label={"Name: "} value={`${firstname} ${lastname}`} />
      <ObjectText label={"Username: "} value={username} />
      <ObjectText label={"Email: "} value={email} />
      <ObjectText label={"Joined: "} value={moment(joined).fromNow()} />
      <View style={{ marginTop: 20 }}>
        <Button
          title="Have a look at your inventory ▶"
          onPress={goToInventoryScreen}
          type="clear"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
