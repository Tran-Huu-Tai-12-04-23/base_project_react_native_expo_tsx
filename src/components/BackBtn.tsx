import { useTheme } from "@context/themContext";
import { AntDesign } from "@expo/vector-icons";
import { goBack } from "@navigation/NavigationService";
import React from "react";
import { TouchableOpacity } from "react-native";

function BackBtn() {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={goBack} style={{ marginTop: "auto" }}>
      <AntDesign name="arrowleft" size={24} color={theme.text} />
    </TouchableOpacity>
  );
}

export default BackBtn;
