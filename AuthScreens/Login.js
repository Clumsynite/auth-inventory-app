import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import { Input, Button, Icon } from "react-native-elements";
import { string } from "prop-types";

import LoginSchema from "../models/LoginSchema";

export const LoginForm = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log("Submit Form", values);
  };

  const [showPassword, setShowPassword] = useState(false);

  const ErrorMessage = ({ error }) => (
    <Text style={{ fontSize: 14, color: "#F00" }}>{error}</Text>
  );
  ErrorMessage.propTypes = { error: string.isRequired };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={LoginSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          {errors.username && touched.username ? (
            <ErrorMessage error={errors.username} />
          ) : null}
          <Input
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            placeholder="Enter a unique username:"
            leftIcon={{ type: "feather", name: "user" }}
            value={values.username}
            autoCompleteType="username"
            keyboardType="name-phone-pad"
            textContentType="nickname"
            returnKeyType="next"
          />
          {errors.password && touched.password ? (
            <ErrorMessage error={errors.password} />
          ) : null}
          <Input
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            placeholder="Enter your password:"
            leftIcon={{ type: "feather", name: "lock" }}
            value={values.password}
            autoCompleteType="password"
            secureTextEntry={!showPassword}
            textContentType="password"
            rightIcon={
              <Icon
                type="feather"
                name={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            returnKeyType="done"
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default function Login() {
  const navigation = useNavigation();
  const goToSignupScreen = () => navigation.navigate("Signup");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        alwaysBounceVertical
      >
        <LoginForm />
        <View>
          <Button
            title="Create New Account"
            onPress={goToSignupScreen}
            type="clear"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scrollView: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
