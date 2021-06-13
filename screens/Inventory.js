import { Formik } from "formik";
import { string } from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import { FAB } from "react-native-paper";

import {
  ErrorMessage,
  Snackbar,
  Spinner,
  TranslucentLoader,
} from "../components";
import { getItems, addItem } from "../api/inventory";
import InventorySchema from "../models/InventorySchema";
import { AuthContext } from "../context/auth";

export const AddItemForm = ({ token }) => {
  const initialValues = {
    name: "",
    quantity: 0,
  };
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState();

  const quantityInput = useRef(null);

  const dismissSnackbar = () => setSnackbar(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      setSubmitting(true);
      const data = await addItem(values, token);
      console.log("DATA submit", data);
      setSubmitting(false);
      if (data.success) {
        resetForm();
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
          msg: JSON.stringify(data.error),
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
        validationSchema={InventorySchema}
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
            {errors.name && touched.name ? (
              <ErrorMessage error={errors.name} />
            ) : null}
            <Input
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholder="Enter Item name:"
              leftIcon={{ type: "feather", name: "package" }}
              value={values.name}
              autoCompleteType="name"
              keyboardType="name-phone-pad"
              textContentType="name"
              returnKeyType="next"
              onSubmitEditing={() => quantityInput.current.focus()}
            />
            {errors.quantity && touched.quantity ? (
              <ErrorMessage error={errors.quantity} />
            ) : null}
            <Input
              ref={quantityInput}
              onChangeText={handleChange("quantity")}
              onBlur={handleBlur("quantity")}
              placeholder="Enter Item quantity:"
              leftIcon={{ type: "feather", name: "hash" }}
              value={values.quantity}
              keyboardType="number-pad"
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
AddItemForm.propTypes = {
  token: string.isRequired,
};

export default function Inventory() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inventoryModal, setInventoryModal] = useState([]);

  const closeInventoryModal = () => setInventoryModal(false);

  const addItemsModal = () => {
    setInventoryModal(true);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    init();
  }, [inventoryModal]);

  const init = async () => {
    try {
      setLoading(true);
      const data = await getItems(token);
      console.log("data", data);
      setLoading(false);
      if (data.success) setItems(data.items);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching inventory", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Spinner />
      ) : items.length < 1 ? (
        <View>
          <Text style={{ fontSize: 20 }}>Inventory is currently empty!</Text>
          <Button
            type="outline"
            onPress={addItemsModal}
            title="Add item to inventory"
            containerStyle={{ marginVertical: 10 }}
          />
        </View>
      ) : (
        <View></View>
      )}
      <Overlay
        isVisible={inventoryModal}
        onBackdropPress={closeInventoryModal}
        overlayStyle={{ width: "100%" }}
      >
        <AddItemForm token={token} />
      </Overlay>
      <FAB
        icon="plus"
        large
        placement="right"
        style={styles.fab}
        onPress={addItemsModal}
      />
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
  },
});
