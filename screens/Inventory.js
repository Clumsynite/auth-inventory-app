import { Formik } from "formik";
import { func, objectOf, node, string } from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, Icon, Input, Overlay } from "react-native-elements";
import { FAB } from "react-native-paper";

import {
  ErrorMessage,
  ObjectText,
  Snackbar,
  Spinner,
  TranslucentLoader,
} from "../components";
import { getItems, addItem, updateItem, deleteItem } from "../api/inventory";
import InventorySchema, { ItemShape } from "../models/InventorySchema";
import { AuthContext } from "../context/auth";
import moment from "moment";
import { ScrollView } from "react-native";

export const AddItemForm = ({ token, selectedItem, dismissModal }) => {
  let initialValues;
  initialValues = {
    name: "",
    quantity: 0,
  };
  if (selectedItem)
    initialValues = {
      name: selectedItem?.name,
      quantity: String(selectedItem?.quantity),
    };
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState(false);

  const quantityInput = useRef(null);

  const dismissSnackbar = () => setSnackbar(false);

  const onSubmit = async (values, { resetForm }) => {
    try {
      values.quantity = Number(values.quantity);
      setSubmitting(true);
      const data = selectedItem
        ? await updateItem(
            { ...selectedItem, ...values, updated: moment().toISOString() },
            token
          )
        : await addItem(values, token);
      if (selectedItem) dismissModal();
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
            <Button onPress={handleSubmit} title="Add Item" />
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
  selectedItem: node,
  dismissModal: func.isRequired,
};

export default function Inventory() {
  const {
    state: { token },
  } = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inventoryModal, setInventoryModal] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const addItemsModal = () => {
    setInventoryModal(true);
  };

  const onEdit = (item) => {
    setSelectedItem(item);
    setInventoryModal(true);
  };

  const dismissModal = () => {
    setInventoryModal(false);
    setSelectedItem(false);
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setSelectedItem(false);
      setInventoryModal(false);
      setLoading(true);
      const data = await getItems(token);
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner />
        </View>
      ) : items.length < 1 ? (
        <View style={styles.flexCenter}>
          <Text style={{ fontSize: 20 }}>Inventory is currently empty!</Text>
          <Button
            type="outline"
            onPress={addItemsModal}
            title="Add item to inventory"
            containerStyle={{ marginVertical: 10 }}
          />
        </View>
      ) : (
        <>
          <Total total={items.length} />
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              {items.map((item, index) => (
                <ItemCard
                  key={index}
                  item={item}
                  onEdit={onEdit}
                  init={init}
                  token={token}
                />
              ))}
            </View>
          </ScrollView>
        </>
      )}
      <Overlay
        isVisible={inventoryModal}
        onBackdropPress={init}
        overlayStyle={{ width: "90%" }}
      >
        <AddItemForm
          token={token}
          selectedItem={selectedItem}
          dismissModal={dismissModal}
        />
      </Overlay>
      <FAB
        icon="plus"
        large
        placement="right"
        color="#fff"
        style={styles.fab}
        onPress={addItemsModal}
      />
    </SafeAreaView>
  );
}

const Total = ({ total }) => (
  <View
    style={{
      ...styles.flexRow,
      borderBottomColor: "#000",
      borderWidth: 1,
      padding: 8,
    }}
  >
    <Text style={{ ...styles.total }}>Total Items: </Text>
    <Text style={{ ...styles.total, fontWeight: "bold" }}>{total}</Text>
  </View>
);
Total.propTypes = { total: string.isRequired };

const ItemCard = ({ item, onEdit, init, token }) => {
  const { name, quantity, updated } = item;
  const [deletingItem, setDeletingItem] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const enableDeleting = () => setDeletingItem(true);
  const disableDeleting = () => setDeletingItem(false);

  const onDelete = async () => {
    try {
      setDeleting(true);
      await deleteItem(item, token);
      setDeleting(false);
      await init();
    } catch (error) {
      setDeleting(false);
      console.error(
        `ItemCard | Error deleting item ID: ${item._id}, \n${error}`
      );
    }
  };

  return (
    <View
      style={{
        paddingVertical: 10,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onLongPress={enableDeleting}
        onPress={disableDeleting}
      >
        <View opacity={deletingItem ? 0.3 : 1}>
          <ObjectText
            label="Name: "
            value={name}
            size={16}
            flex={{ label: 3, value: 7 }}
          />
          <ObjectText
            label="In stock: "
            value={quantity}
            size={14}
            flex={{ label: 3, value: 7 }}
          />
          <ObjectText
            label="Last updated: "
            value={moment(updated).fromNow()}
            size={12}
            flex={{ label: 3, value: 7 }}
          />
        </View>
      </TouchableOpacity>
      <View style={{ marginRight: 20 }}>
        {deletingItem ? (
          deleting ? (
            <Spinner color="#f00" size={20} />
          ) : (
            <Icon
              name="trash-2"
              type="feather"
              color="#f00"
              onPress={onDelete}
            />
          )
        ) : (
          <Icon name="edit" type="feather" onPress={() => onEdit(item)} />
        )}
      </View>
    </View>
  );
};
ItemCard.propTypes = {
  item: objectOf(ItemShape),
  onEdit: func.isRequired,
  init: func.isRequired,
  token: string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
  },
  flexCenter: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  total: {
    fontSize: 20,
  },
});
