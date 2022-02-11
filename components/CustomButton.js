import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";
import LinearGradient from "react-native-linear-gradient";

const CustomButton = ({
  buttonText,
  buttonContainerStyle,
  colors,
  onPress,
}) => {
  if (colors.length > 0) {
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}
        style={{...buttonContainerStyle}}
        >
        <Text style={{ textAlign: "center", color: COLORS.white, ...FONTS.h3 }}>
          {buttonText}
        </Text>
        </LinearGradient>
       
      </TouchableOpacity>
    );
  } else {
    return (
        <TouchableOpacity onPress={onPress}
        style={{...buttonContainerStyle}}
        >
        <Text style={{ textAlign: "center", color: COLORS.lightGreen, ...FONTS.h3 }}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
};

export default CustomButton;
