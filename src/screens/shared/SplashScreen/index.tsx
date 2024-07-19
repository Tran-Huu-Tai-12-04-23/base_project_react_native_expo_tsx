import { IMGAES } from "@common";
import { ESize } from "@common/enums/ESize";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import stylesApp from "~/screens/app/styleApp";
import { IScreenProps } from "~/screens/shared/interface";
import commonService from "~/services/common/common.service";
import toastService from "~/services/toast/toast.service";
import { ICommonStore } from "~/stores";
import { BindCommonStore } from "~/stores/base/decorator";
import { IWithTheme } from "~/stores/theme/theme.model";
import { BaseScreen } from "../BaseScreen";

interface IProps extends IScreenProps, ICommonStore, IWithTheme {}

@BindCommonStore()
export default class SplashScreen extends BaseScreen<IProps> {
  async componentDidMount() {
    const { authStore, languageStore, themeStore } = this.props;
    const { loadResource } = authStore;
    languageStore.loadResource();
    toastService.setThemeStore(themeStore);
    toastService.setLanguageStore(languageStore);
    commonService.setAuthStore(authStore);
    await loadResource();
  }

  render() {
    const { colors } = this.props.themeStore.theme;
    const { widthScreen, heightScreen } = ESize;
    return (
      <View style={{ backgroundColor: "white", height: heightScreen }}>
        <View style={{ height: ESize.heightScreen / 1.1 }}>
          <View style={stylesApp.colBetween}>
            <View />
            <ImageBackground
              style={{
                height: widthScreen,
                width: widthScreen,
              }}
              source={IMGAES.logo}
            />
            <View />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: ESize.widthScreen / 4,
  },
});
