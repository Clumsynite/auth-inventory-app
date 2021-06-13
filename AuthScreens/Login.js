import { useNavigation } from "@react-navigation/core";
import React, { useContext, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { Formik } from "formik";
import { Input, Button, Icon } from "react-native-elements";

import { ErrorMessage, Snackbar, TranslucentLoader } from "../components";

import LoginSchema from "../models/LoginSchema";
import { login } from "../api/auth";
import { AuthContext } from "../context/auth";

export const LoginForm = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState();

  const lastnameInput = useRef(null);

  const { login: ctxLogin } = useContext(AuthContext);

  const dismissSnackbar = () => setSnackbar(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      setSubmitting(true);
      const data = await login(values);
      setSubmitting(false);
      if (data.success) {
        resetForm();
        const { user, token } = data;
        ctxLogin({ user: { ...user, photo: "" }, token });
        setSnackbar({
          msg: data.msg,
          className: "success",
          accent: "red",
        });
      } else if (data.message && data.name) {
        setSnackbar({
          msg: data.message,
          className: "error",
          accent: "white",
        });
      } else if (!data.success) {
        setSnackbar({
          msg: data.error,
          className: "error",
          accent: "white",
        });
      }
    } catch (e) {
      setSubmitting(false);
      console.error(e);
    }
  };

  return (
    <>
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
              onSubmitEditing={() => lastnameInput.current.focus()}
            />
            {errors.password && touched.password ? (
              <ErrorMessage error={errors.password} />
            ) : null}
            <Input
              ref={lastnameInput}
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
              onSubmitEditing={handleSubmit}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      {submitting && <TranslucentLoader visible={submitting} />}
      {snackbar && (
        <Snackbar
          visible={!!snackbar}
          message={snackbar.msg}
          className={snackbar.className}
          accent={snackbar.accent}
          dismiss={dismissSnackbar}
        />
      )}
    </>
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
