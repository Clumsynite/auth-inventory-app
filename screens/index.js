/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { string, node, any } from "prop-types";
import _ from "lodash";
import * as app from "../app.json";
import Home from "./Home";
import Inventory from "./Inventory";

const windowHeight = Dimensions.get("window").height;

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
    <View style={{ height: windowHeight, flex: 1, marginBottom: 20 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
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
                flexShrink: 1,
              }}
            >
              Hello {`{userName}`}!
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 8 }}>
        <FlatList
          style={{ paddingLeft: 10 }}
          keyExtractor={(_, index) => index.toString()}
          data={menu}
          renderItem={({ item }) => {
            return <FlatListComponent {...item} />;
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ height: 50, flexDirection: "row", alignItems: "center" }}
          // onPress={() => navigation.navigate("Logout")}
        >
          <Text
            style={{
              paddingLeft: 5,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14 }}>{_.get(app, "expo.version")}</Text>
        </View>
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
  navigation: any.isRequired,
};

function InventoryStackScreen({ navigation }) {
  return (
    <InventoryStack.Navigator
      screenOptions={{
        headerTitle: "Inventory",
        headerTitleStyle: { alignSelf: "center", fontWeight: "bold" },
      }}
    >
      <InventoryStack.Screen
        name="Inventory"
        component={Inventory}
        options={{
          headerLeft: () => <MenuIcon navigation={navigation} />,
        }}
      />
    </InventoryStack.Navigator>
  );
}
InventoryStackScreen.propTypes = {
  navigation: any.isRequired,
};
export default Screens;
