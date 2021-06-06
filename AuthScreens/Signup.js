import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { Formik } from "formik";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

import SignupSchema from "../models/SignupSchema";
import { string } from "prop-types";

export const SignupForm = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
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
      validationSchema={SignupSchema}
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
          {errors.firstname && touched.firstname ? (
            <ErrorMessage error={errors.firstname} />
          ) : null}
          <Input
            onChangeText={handleChange("firstname")}
            onBlur={handleBlur("firstname")}
            placeholder="Enter your firstname:"
            leftIcon={{ type: "feather", name: "user" }}
            value={values.firstname}
            autoCompleteType="name"
            keyboardType="name-phone-pad"
            textContentType="givenName"
            returnKeyType="next"
          />
          {errors.lastname && touched.lastname ? (
            <ErrorMessage error={errors.lastname} />
          ) : null}
          <Input
            onChangeText={handleChange("lastname")}
            onBlur={handleBlur("lastname")}
            placeholder="Enter your lastname:"
            leftIcon={{ type: "feather", name: "user" }}
            value={values.lastname}
            autoCompleteType="name"
            keyboardType="name-phone-pad"
            textContentType="familyName"
            returnKeyType="next"
          />
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
          {errors.email && touched.email ? (
            <ErrorMessage error={errors.email} />
          ) : null}
          <Input
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="Enter your email:"
            leftIcon={{ type: "feather", name: "mail" }}
            value={values.email}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
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

export default function Signup() {
  const navigation = useNavigation();
  const goToLoginScreen = () => navigation.navigate("Login");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        alwaysBounceVertical
      >
        <SignupForm />
        <View>
          <Button
            title="Already have an account?"
            onPress={goToLoginScreen}
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
  },
});
