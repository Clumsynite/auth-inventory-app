import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

import ErrorMessage from "../components/ErrorMessage";
import ImagePicker from "../components/ImagePicker";

import SignupSchema from "../models/SignupSchema";
import util from "../api/util";

export const SignupForm = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
  const usernameStatus = {
    EMPTY: { status: "EMPTY", icon: "user", color: "#000" },
    EXISTS: { status: "EXISTS", icon: "user-minus", color: "#ff1a1a" },
    NOT_EXISTS: { status: "NOT_EXISTS", icon: "user-check", color: "#00b300" },
  };

  const [showPassword, setShowPassword] = useState(false);
  const [usernameExists, setUsernameExists] = useState(usernameStatus.EMPTY);
  const [image, setImage] = useState(null);
  const [checking, setChecking] = useState(false);

  const onSubmit = async (values) => {
    try {
      console.log("Submit Form", values);
    } catch (e) {
      console.error(e);
    }
  };

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
        setFieldValue,
        setFieldTouched,
      }) => (
        <View>
          <ImagePicker
            image={image}
            setImage={setImage}
            placeholder="Press on the above icon to select a profile picture"
          />
          {errors.firstname && touched.firstname ? (
            <ErrorMessage error={errors.firstname} />
          ) : null}
          <Input
            inputStyle={styles.input}
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
            inputStyle={styles.input}
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
            inputStyle={styles.input}
            onChangeText={async (value) => {
              try {
                setChecking(true);
                setFieldValue("username", value);
                setFieldTouched("username", true);
                const { exists } = await util.usernameExists(value.trim());
                setUsernameExists(
                  !value || value.trim() === ""
                    ? usernameStatus.EMPTY
                    : exists
                    ? usernameStatus.EXISTS
                    : usernameStatus.NOT_EXISTS
                );
                setChecking(false);
              } catch (e) {
                setChecking(false);
                console.error(e);
              }
            }}
            onBlur={handleBlur("username")}
            placeholder="Enter a unique username:"
            leftIcon={
              checking ? (
                <ActivityIndicator size="small" color={usernameExists.color} />
              ) : (
                <Icon
                  type="feather"
                  name={usernameExists.icon}
                  color={usernameExists.color}
                />
              )
            }
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
            inputStyle={styles.input}
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
            inputStyle={styles.input}
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
  input: {
    paddingHorizontal: 10,
  },
});
