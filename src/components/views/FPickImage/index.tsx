import { COLORS, deviceWidth } from "@common/index";
import { useBottomSheet } from "@context/bottomSheetContext";
import { FontAwesome } from "@helpers/deflibs";
import useUploadFile from "@hooks/useUploadFile";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import Row from "../FView/Row";

function FPickImage({ value }: any) {
  const { openBottomSheet, hideBottomSheet, onSetBottomSheetInfo } =
    useBottomSheet();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: uploadSingleS3 } = useUploadFile();
  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (result.canceled) {
      return;
    }
    if (!result.canceled) {
      const asset = result.assets[0];
      await handleUploadImg(asset);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      await handleUploadImg(result.assets[0]);
    }
  };
  const handleBottomSheet = () => {
    onSetBottomSheetInfo({
      content: (
        <ChooseImagesOptions
          onGetPicture={pickImage}
          onTakePicture={takePicture}
        />
      ),
      snapPoints: [160],
    });
    openBottomSheet();
  };

  const handleUploadImg = async (item: any) => {
    hideBottomSheet();
    if (item != null) {
      const formData: any = new FormData();
      let uriArray = item.uri.split(".");
      let fileType = uriArray.pop();
      formData.append("file", {
        uri: item.uri,
        name: item.uri,
        type: `image/${fileType}`,
      });
      setIsLoading(true);
      return await uploadSingleS3(formData).then((res: any) => {
        setIsLoading(false);
        if (res) {
          setIsLoading(false);
          return { url: res?.data[0], name: item.uri };
        }
        setIsLoading(false);
      });
    }
  };

  return (
    <>
      {!value && (
        <TouchableOpacity onPress={handleBottomSheet}>
          <Row style={styles.container} center>
            {!isLoading && (
              <FontAwesome name="picture-o" size={50} color="gray" />
            )}
            {isLoading && <ActivityIndicator color={COLORS.primary} />}
          </Row>
        </TouchableOpacity>
      )}
      {value && <Image source={{ uri: value }} style={styles.container} />}
    </>
  );
}

type Props = {
  onTakePicture: () => void;
  onGetPicture: () => void;
};
const ChooseImagesOptions = ({ onTakePicture, onGetPicture }: Props) => {
  return (
    <Row full center direction="column" rowGap={10}>
      <Button
        title="Chụp ảnh"
        onPress={onTakePicture}
        buttonStyle={{
          width: deviceWidth - 20,
          borderRadius: 100,
        }}
        type="solid"
        titleStyle={{ color: "black" }}
      />
      <Button
        onPress={onGetPicture}
        title="Chọn từ thư viện"
        buttonStyle={{
          backgroundColor: COLORS.primary,
          width: deviceWidth - 20,
          borderRadius: 100,
        }}
      />
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default FPickImage;
