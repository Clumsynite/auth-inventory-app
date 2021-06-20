import { number, string } from "prop-types";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";

import Avatar from "./Avatar";
import Spinner from "./Spinner";

import { getAvatar } from "../api/util";
import { NoImageAvailable } from "../assets/base64";

const UserAvatar = ({ username, size }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setLoading(true);
      let data;
      if (username) data = await getAvatar(username);
      else data = false;
      let image = NoImageAvailable;
      if (data?.photo) image = data.photo;
      setLoading(false);
      setImage(image);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching user avatar", error);
    }
  };

  return loading ? (
    <Spinner />
  ) : image ? (
    <Avatar source={image} size={size} />
  ) : (
    <Icon name="user" type="feather" raised size={size / 2} />
  );
};
UserAvatar.propTypes = {
  username: string.isRequired,
  size: number,
};

UserAvatar.defaultProps = {
  size: 60,
};

export default UserAvatar;
