import { func, number } from "prop-types";
import { bool, string } from "prop-types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar as RNSnackbar } from "react-native-paper";

const Snackbar = ({
  visible,
  message,
  className,
  dismiss,
  accent,
  duration,
}) => {
  return (
    <View style={styles.snackbar}>
      <RNSnackbar
        visible={visible}
        duration={duration}
        onDismiss={dismiss}
        style={{ ...styles.snackbar, ...styles[className] }}
        action={{
          label: "hide",
          onPress: dismiss,
        }}
        theme={{ colors: { surface: "black", accent: accent } }}
      >
        {message}
      </RNSnackbar>
    </View>
  );
};
Snackbar.propTypes = {
  visible: bool.isRequired,
  message: string.isRequired,
  dismiss: func.isRequired,
  accent: string,
  className: string,
  duration: number,
};
Snackbar.defaultProps = {
  accent: "white",
  className: "snackbar_default",
  number: 3000,
};

export default Snackbar;

const styles = StyleSheet.create({
  snackbar_default: {
    backgroundColor: "#000",
  },
  snackbar_success: {
    backgroundColor: "#93f300",
  },
  snackbar_error: {
    backgroundColor: "#ff1414",
  },
  snackbar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

/*
  // object for snackbar state 
  {
    msg: "Signup Successful",
    className: "snackbar_success",
    accent: "red",
  }
*/
