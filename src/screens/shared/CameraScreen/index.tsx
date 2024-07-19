import { useState } from "react";
import { StyleSheet } from "react-native";

// import { RNCamera, } from 'react-native-camera';

export default function CameraScreen(props: any) {
  const [loading, setLoading] = useState(false);

  const takePicture = async () => {
    setLoading(true);
    // if (camera.current) {
    //     const { route } = props;
    //     const { handleTakePicture, key } = route.params
    //     const options = { quality: 0.5, base64: true };
    //     const data = await camera.current.takePictureAsync(options);
    //     if (data) {
    //         await handleTakePicture({ uri: data.uri, base64: data.base64, } as IDataPicture);
    //         setLoading(false);
    //     } else {
    //         setLoading(false);
    //     }
    //     navService.goBack();
    // } else {
    //     setLoading(false);
    //     navService.goBack();
    // }
  };

  return (
    // <FViewLoading isLoading={loading}>
    {
      /* <RNCamera
          ref={camera}
          style={{
            flex: 1,
            justifyContent: "flex-start",
          }}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          playSoundOnCapture
        >
          <TouchableOpacity
            style={{ justifyContent: "flex-start", marginTop: 40 }}
            onPress={() => navService.goBack()}
          >
            <IconIonicons
              //@ts-ignore
              name="chevron-back-outline"
              color="#fff"
              size={40}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              alignSelf: "center",
              position: "absolute",
              bottom: 0,
            }}
          >
            <TouchableOpacity
              onPress={() => takePicture()}
              style={styles.capture}
            />
          </View>
        </RNCamera> */
    }
    // </FViewLoading>
  );
}

const styles = StyleSheet.create({
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 35,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
    height: 70,
    width: 70,
  },
});
