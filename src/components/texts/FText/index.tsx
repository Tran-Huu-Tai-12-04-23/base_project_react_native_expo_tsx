import { COLORS, isIOS, normalize } from "@common/index";
import React, { FC } from "react";
import { Text, TextStyle } from "react-native";

type NTtextStyle = {
  txtStyle?: TextStyle | Array<TextStyle>;
  children?: any;
  title?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h45?: boolean;
  h5?: boolean;
  h56?: boolean;
  h6?: boolean;
  h7?: boolean;
  h1Style?: object;
  h2Style?: object;
  h3Style?: object;
  h4Style?: object;
  h45Style?: object;
  h5Style?: object;
  h56Style?: object;
  h6Style?: object;
  h7Style?: object;
  w300?: boolean;
  w400?: boolean;
  w500?: boolean;
  w600?: boolean;
  w700?: boolean;
  center?: boolean;
  numberOfLines?: number;
};

const NTText: FC<NTtextStyle> = (props) => {
  const {
    txtStyle,
    children,
    title,
    h1,
    h2,
    h3,
    h4,
    h45,
    h5,
    h56,
    h6,
    h7,
    h1Style,
    h2Style,
    h3Style,
    h4Style,
    h45Style,
    h5Style,
    h56Style,
    h6Style,
    h7Style,
    w300,
    w400,
    w500,
    w600 = true,
    w700,
    center,
    numberOfLines,
  } = props;

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: 13,
        },
        w300 && styles.w300,
        w400 && styles.w400,
        w500 && styles.w500,
        w600 && styles.w600,
        w700 && styles.w700,
        center && styles.center,
        title && styles.title,
        h1 && h1Style,
        h2 && h2Style,
        h3 && h3Style,
        h4 && h4Style,
        h45 && h45Style,
        h5 && h5Style,
        h56 && h56Style,
        h6 && h6Style,
        h7 && h7Style,
        txtStyle,
      ]}
    >
      {children}
    </Text>
  );
};
const fontScale = {
  h1: {
    fontSize: normalize(22),
    color: "#000",
  },
  h2: {
    fontSize: normalize(20),
    color: "#000",
  },
  h3: {
    fontSize: normalize(18),
    color: "#000",
  },
  h4: {
    fontSize: normalize(16),
    color: "#000",
  },
  h45: {
    fontSize: normalize(15),
    color: "#000",
  },
  h5: {
    fontSize: normalize(14),
    color: "#000",
  },
  h56: {
    fontSize: normalize(13),
    color: "#000",
  },
  h6: {
    fontSize: normalize(12),
    color: "#000",
  },
  h7: {
    fontSize: normalize(11),
    color: "#000",
  },
};
const styles = {
  title: {
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: normalize(30),
    lineHeight: normalize(40),
    color: COLORS.primary,
  },
  w300: {
    fontWeight: "300",
  },
  w400: {
    fontWeight: "400",
  },
  w500: {
    fontWeight: isIOS ? "500" : "700",
  },
  w600: {
    fontWeight: isIOS ? "600" : "700",
  },
  w700: {
    fontWeight: "700",
  },
  center: {
    textAlign: "center",
  },
};

export default NTText;
