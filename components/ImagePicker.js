import React, { useEffect } from "react";
import { View, Platform, Text } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { func, string } from "prop-types";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { Avatar } from ".";

export default function ImagePicker({ image, setImage, placeholder }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.base64);
    } else {
      setImage(null);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
      }}
    >
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Avatar source={`data:image/jpg;base64,${image}`} size={120} />
        ) : (
          <Icon name="user" type="feather" raised size={50} />
        )}
      </TouchableOpacity>
      {!image && placeholder && (
        <Text style={{ fontSize: 12, flexShrink: 1, color: "#7e7e7e" }}>
          {placeholder}
        </Text>
      )}
    </View>
  );
}
ImagePicker.propTypes = {
  image: string,
  setImage: func.isRequired,
  placeholder: string,
};
ImagePicker.defaultProps = { image: null, placeholder: null };
