import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { Formik } from "formik";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";

/*
    username: { type: String, unique: true, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
*/
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

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView
          behavior={"position"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 10}
        >
          <Input
            onChangeText={handleChange("firstname")}
            onBlur={handleBlur("firstname")}
            placeholder="Enter your firstname:"
            leftIcon={{ type: "feather", name: "user" }}
            value={values.firstname}
            autoCompleteType="name"
            keyboardType="name-phone-pad"
            textContentType="givenName"
          />
          <Input
            onChangeText={handleChange("lastname")}
            onBlur={handleBlur("lastname")}
            placeholder="Enter your lastname:"
            leftIcon={{ type: "feather", name: "user" }}
            value={values.lastname}
            autoCompleteType="name"
            keyboardType="name-phone-pad"
            textContentType="familyName"
          />
          <Input
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            placeholder="Enter your unique username:"
            leftIcon={{ type: "feather", name: "user" }}
            value={values.username}
            autoCompleteType="username"
            keyboardType="name-phone-pad"
            textContentType="nickname"
          />
          <Input
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            placeholder="Enter your email:"
            leftIcon={{ type: "feather", name: "mail" }}
            value={values.email}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
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
          />
          <Button onPress={handleSubmit} title="Submit" />
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default function Signup() {
  const navigation = useNavigation();
  const goToLoginScreen = () => navigation.navigate("Login");

  return (
    <SafeAreaView style={styles.container}>
      <SignupForm />
      <View>
        <Button
          title="Already have an account?"
          onPress={goToLoginScreen}
          type="clear"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
