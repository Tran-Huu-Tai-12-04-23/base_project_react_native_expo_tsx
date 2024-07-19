import React, {FC, ReactElement} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import {StyleProp, ViewStyle} from 'react-native';

export const ICON_TYPE = {
  ICONICONS: 'ionicons',
  ANT_ICON: 'ant',
  EVIL_ICONS: 'EVIL',
  FONT_AWESOME: 'FONTAWESOME',
  FONT_AWESOME5: 'fontawwesome5',
  MATERIAL_ICONS: 'MaterialIcons',
  FEATHER_ICONS: 'FEATHER',
  ENTYPO: 'ENTYPO',
  OCTICONS: 'OCTICONS',

  MATERIAL_COMMUNITY: 'MATERIALCOMMUNITY',
  SIMPLELINE_ICONS: 'SIMPLELINE_ICONS',
  FONTISTO: 'FONTISTO',
  FOUNDATION: 'FOUNDATION',
};

type IconType = {
  origin?: string;
  name?: string;
  color?: string;
  size?: number;
  paddingLeft?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: Function;
};

export const IconX: FC<IconType> = props => {
  const {origin, name, color, size, paddingLeft, style, onPress} = props;
  let colorX = color || ('#aaaaaa' as string);
  let sizeX = size || (24 as number);
  let nameX = name || ('right' as string);
  let paddingX = paddingLeft || (null as number);
  let Element = Ionicons as any;

  switch (origin) {
    case ICON_TYPE.ANT_ICON:
      Element = AntDesign;
      break;

    case ICON_TYPE.ENTYPO:
      Element = Entypo;
      break;

    case ICON_TYPE.MATERIAL_ICONS:
      Element = MaterialIcons;
      break;

    // case ICON_TYPE.FONT_AWESOME5:
    //   Element = FontAwesome5;
    //   break;

    case ICON_TYPE.FEATHER_ICONS:
      Element = Feather;
      break;

    case ICON_TYPE.EVIL_ICONS:
      Element = EvilIcons;
      break;

    case ICON_TYPE.FONT_AWESOME:
      Element = FontAwesome;
      break;

    case ICON_TYPE.OCTICONS:
      Element = Octicons;
      break;
    case ICON_TYPE.MATERIAL_COMMUNITY:
      Element = MaterialCommunityIcons;
      break;
    case ICON_TYPE.ICONICONS:
      Element = Ionicons;
      break;
    case ICON_TYPE.SIMPLELINE_ICONS:
      Element = SimpleLineIcons;
      break;
    case ICON_TYPE.FONTISTO:
      Element = Fontisto;
      break;
    case ICON_TYPE.FOUNDATION:
      Element = Foundation;
      break;
    default:
      break;
  }

  return (
    <Element
      name={nameX}
      size={sizeX}
      color={colorX}
      onPress={onPress}
      style={[{paddingLeft: paddingX}, style]}
    />
  );
};
