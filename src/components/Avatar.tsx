import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  url: string;
};
function Avatar({ url }: Props) {
  return (
    <TouchableOpacity>
      <Image source={{ uri: url }} style={styles.avatar} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
export default Avatar;
