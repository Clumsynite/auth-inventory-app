import { number, string } from "prop-types";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";

import Avatar from "./Avatar";
import Spinner from "./Spinner";

import { getAvatar } from "../api/util";

const UserAvatar = ({ username, size }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      setLoading(true);
      const { photo } = await getAvatar(username);
      setLoading(false);
      setImage(photo);
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
