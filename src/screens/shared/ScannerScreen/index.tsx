import { COLORS } from "@common/index";
import { FHeader, FView } from "@components/index";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { IListenerScanner } from "../BaseScreen";
import { IScreenProps } from "../interface";

export interface IDataScan {
  data: string;
  rawData?: string;
  type: any;
  /**
   * @description For Android use `{ width: number, height: number, origin: Array<Point<string>> }`
   * @description For iOS use `{ origin: Point<string>, size: Size<string> }`
   */
  bounds:
    | { width: number; height: number; origin: Array<any> }
    | { origin: any; size: any };
}
export interface IDataScanner {
  keyValue: string;
  data: string;
}
interface IScannerParams extends IListenerScanner {
  keyValue: string;
}
interface IProps extends IScreenProps {
  route?: {
    name?: string;
    params?: IScannerParams;
  };
}

const ScannerScreen: React.FC<IProps> = (props) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  if (hasCameraPermission === null) {
    return (
      <FView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: COLORS.black }}>
            Requesting for camera permission
          </Text>
        </View>
      </FView>
    );
  }
  if (hasCameraPermission === false) {
    return (
      <FView>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: COLORS.black }}> No access to camera</Text>
        </View>
      </FView>
    );
  }
  return (
    <FView>
      <FHeader title={"Barcode scanner"} />
      <View style={{ flex: 1 }}>
        {/* {isFocused && <RNCamera
                        ref={camera}
                        onBarCodeRead={handleBarCodeScanned}
                        style={styles.cameraView}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        playSoundOnCapture
                    >
                        <BarcodeMask width={ESize.widthScreen / 5 * 3} height={ESize.widthScreen / 5 * 3} showAnimatedLine={false} outerMaskOpacity={0.8} />
                    </RNCamera>} */}
      </View>
    </FView>
  );
};

export default ScannerScreen;
