import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";

export const SignupForm = () => {
  const onSubmit = () => {
    console.log("Submit Form");
  };
  return (
    <Formik initialValues={{ email: "" }} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default function Signup() {
  return (
    <SafeAreaView style={styles.container}>
      <SignupForm />
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
