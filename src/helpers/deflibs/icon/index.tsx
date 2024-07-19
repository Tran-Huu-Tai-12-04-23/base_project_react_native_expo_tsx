import React, { Component } from "react";
import AntDesignName from "./glyphmaps/AntDesignName";
import EntypoName from "./glyphmaps/EntypoName";
import EvilIconsName from "./glyphmaps/EvilIconsName";
import FeatherName from "./glyphmaps/FeatherName";
import FontAwesome5Name from "./glyphmaps/FontAwesome5Name";
import FontAwesomeName from "./glyphmaps/FontAwesomeName";
import FoundationName from "./glyphmaps/FoundationName";
import IoniconsName from "./glyphmaps/IoniconsName";
import MaterialCommunityIconsName from "./glyphmaps/MaterialCommunityIconsName";
import MaterialIconsName from "./glyphmaps/MaterialIconsName";
import OcticonsName from "./glyphmaps/OcticonsName";
import SimpleLineIconsName from "./glyphmaps/SimpleLineIconsName";
import ZocialName from "./glyphmaps/ZocialName";

// Resource Icon
import { SocialIcon, SocialIconProps } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import { IconProps } from "react-native-vector-icons/Icon";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'
export * from 'react-native-elements'

// define type Icon Name
type TAntDesign = keyof typeof AntDesignName
type TEntypo = keyof typeof EntypoName
type TEvilIcons = keyof typeof EvilIconsName
type TFeather = keyof typeof FeatherName
type TFontAwesome = keyof typeof FontAwesomeName
type TFontAwesome5 = keyof typeof FontAwesome5Name
type TFoundation = keyof typeof FoundationName
type TIonicons = keyof typeof IoniconsName
type TMaterialCommunityIcons = keyof typeof MaterialCommunityIconsName
type TMaterialIcons = keyof typeof MaterialIconsName
type TOcticons = keyof typeof OcticonsName
type TSimpleLineIcons = keyof typeof SimpleLineIconsName
type TZocial = keyof typeof ZocialName
type TSocialIcon = "angellist" | "envelope" | "codepen" | "envelope" | "etsy" | "facebook" |
  "foursquare" | "github-alt" | "github" | "gitlab" | "instagram" | "linkedin" |
  "medium" | "pinterest" | "quora" | "reddit-alien" | "soundcloud" | "stack-overflow" |
  "steam" | "stumbleupon" | "tumblr" | "twitch" | "twitter" | "google-plus-official" |
  "vimeo" | "wordpress" | "youtube"

export {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  // FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
}

export type TIconType = | 'material'
  | 'material-community'
  | 'simple-line-icon'
  | 'zocial'
  | 'font-awesome'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'font-awesome-5';
export interface IIconProps extends Omit<IconProps, "type"> {
  type?: TIconType;
}
export type TIconNode = Partial<IIconProps>;

export function loadResourcesIcon() {
  return Promise.all([
    AntDesign.loadFont(),
    Entypo.loadFont(),
    EvilIcons.loadFont(),
    Feather.loadFont(),
    FontAwesome.loadFont(),
    // FontAwesome5.loadFont(),
    Foundation.loadFont(),
    Ionicons.loadFont(),
    MaterialCommunityIcons.loadFont(),
    MaterialIcons.loadFont(),
    Octicons.loadFont(),
    SimpleLineIcons.loadFont(),
    Zocial.loadFont()
  ])
};

export class IconAntDesign extends Component<{ name: TAntDesign } & IconProps> {
  render() {
    return (
      <AntDesign  {...this.props} />
    );
  }
}
export class IconEntypo extends Component<{ name: TEntypo } & IconProps> {
  render() {
    return (
      <Entypo  {...this.props} />
    );
  }
}

export class IconEvilI extends Component<{ name: TEvilIcons } & IconProps> {
  render() {
    return (
      <EvilIcons  {...this.props} />
    );
  }
}

export class IconFeather extends Component<{ name: TFeather } & IconProps> {
  render() {
    return (
      <Feather  {...this.props} />
    );
  }
}

export class IconFontAwesome extends Component<{ name: TFontAwesome } & IconProps> {
  render() {
    return (
      <FontAwesome  {...this.props} />
    );
  }
}

export class IconFontAwesome5 extends Component<{ name: TFontAwesome5 } & IconProps> {
  render() {
    return (
      <FontAwesome5  {...this.props} />
    );
  }
}
export class IconFoundation extends Component<{ name: TFoundation } & IconProps> {
  render() {
    return (
      <Foundation  {...this.props} />
    );
  }
}

export class IconIonicons extends Component<{ name: TIonicons | string } & IconProps> {
  render() {
    return (
      <Ionicons  {...this.props} />
    );
  }
}

export class IconMaterialCommunity extends Component<{ name: TMaterialCommunityIcons | string } & IconProps> {
  render() {
    return (
      <MaterialCommunityIcons  {...this.props} />
    );
  }
}

export class IconMaterial extends Component<{ name: TMaterialIcons } & IconProps> {
  render() {
    return (
      <MaterialIcons  {...this.props} />
    );
  }
}
export class IconOct extends Component<{ name: TOcticons } & IconProps> {
  render() {
    return (
      <Octicons  {...this.props} />
    );
  }
}
export class IconSimpleLine extends Component<{ name: TSimpleLineIcons } & IconProps> {
  render() {
    return (
      <SimpleLineIcons  {...this.props} />
    );
  }
}

export class IconZocial extends Component<{ name: TZocial } & IconProps> {
  render() {
    return (
      <Zocial  {...this.props} />
    );
  }
}
export class IconSocial extends Component<{ name: TSocialIcon } & SocialIconProps> {
  render() {
    return (
      <SocialIcon  {...this.props} />
    );
  }
}
