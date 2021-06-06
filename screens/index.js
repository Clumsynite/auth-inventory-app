/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { string, node, any } from "prop-types";
import _ from "lodash";
import * as app from "../app.json";
import Home from "./Home";
import Inventory from "./Inventory";

const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const InventoryStack = createStackNavigator();

function Screens() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeStackScreen} />
      <Drawer.Screen name="Inventory" component={InventoryStackScreen} />
    </Drawer.Navigator>
  );
}

const CustomDrawer = () => {
  const menu = [
    {
      menu: "Home",
    },
    {
      menu: "Inventory",
    },
  ];

  return (
    <View style={{ backgroundColor: "#737477" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 120,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: 15,
            paddingBottom: 0,
          }}
        >
          <View style={{ flexShrink: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#fff",
                flexShrink: 1,
              }}
            >
              Looking Good {`{userName}`}!
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        style={{ paddingLeft: 10 }}
        keyExtractor={(_, index) => index.toString()}
        data={menu}
        renderItem={({ item }) => {
          return <FlatListComponent {...item} />;
        }}
      />

      <TouchableOpacity
        style={{ height: 50, flexDirection: "row", alignItems: "center" }}
        // onPress={() => navigation.navigate("Logout")}
      >
        <Text
          style={{
            paddingLeft: 5,
            fontWeight: "bold",
            fontSize: 18,
            color: "#fff",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
      <View
        style={{
          marginBottom: 50,
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 14, color: "#fff" }}>
          {_.get(app, "expo.version")}
        </Text>
      </View>
    </View>
  );
};

const FlatListComponent = ({ menu, icon }) => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(menu);
        }}
        style={{
          borderBottomColor: "#E2E3E4",
          borderBottomWidth: 1,
          padding: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {icon && <Image source={icon} style={{ width: 32, height: 32 }} />}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {menu}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
FlatListComponent.propTypes = {
  menu: string.isRequired,
  icon: node,
};
FlatListComponent.defaultProps = {
  icon: null,
};

const MenuIcon = ({ navigation }) => (
  <Icon
    name="menu"
    type="feather"
    size={25}
    onPress={() => navigation.openDrawer()}
    containerStyle={{ marginLeft: 15 }}
  />
);
MenuIcon.propTypes = {
  navigation: any.isRequired,
};
function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitle: "Home",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <MenuIcon navigation={navigation} />,
        }}
      />
    </HomeStack.Navigator>
  );
}
HomeStackScreen.propTypes = {
  navigation: node.isRequired,
};

function InventoryStackScreen({ navigation }) {
  return (
    <InventoryStack.Navigator
      screenOptions={{
        headerTitle: "Inventory",
        headerTitleStyle: { alignSelf: "center", fontWeight: "bold" },
        headerTintColor: "#fff",
      }}
    >
      <InventoryStack.Screen
        name="Inventory"
        component={Inventory}
        options={{
          headerLeft: (
            <Icon
              name="ios-menu"
              size={25}
              backgroundColor="#737477"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </InventoryStack.Navigator>
  );
}
InventoryStackScreen.propTypes = {
  navigation: node.isRequired,
};
export default Screens;
