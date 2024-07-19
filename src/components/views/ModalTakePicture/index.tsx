import { useActionSheet } from "@expo/react-native-action-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const TakePicture: FC<{
  value: ImagePicker.ImagePickerAsset[] | { url?: string }[];
  onChange: (value: any[]) => void;
  picked?: boolean;
  editable?: boolean;
  onRemove?: (index: number) => void;
}> = ({ value, onChange, editable = true, picked = true }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { SPACING_AROUND_IMAGE, NUMBER_IMAGE_PER_ROW, IMAGE_SIZE } =
    useLayoutListImage({ initialPadding: 5 });
  const { showActionSheetWithOptions } = useActionSheet();
  const { mutateAsync: uploadSingleS3 } = useUploadFile();

  const onPressLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      exif: true,
      allowsMultipleSelection: true,
    });
    if (result.canceled) {
      return;
    }
    const assets = result.assets;
    if (assets?.length > 0) {
      const newValue = [...value, ...assets];
      setIsLoading(true);
      const lstImage = await Promise.all(
        assets.map((asset) => {
          return handleUploadImg(asset);
        })
      );
      setIsLoading(false);

      onChange([...value, ...lstImage]);
    }
  };

  const showOptions = () => {
    const options = ["Chọn từ thư viện", "Chụp ảnh", "Đóng"];
    const cancelButtonIndex = 2;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveColor: COLORS.redColor,
      },
      (buttonIndex?: number) => {
        if (buttonIndex === 0) {
          // Choose from Library
          onPressLibrary();
        } else if (buttonIndex === 1) {
          // Take Photo
          onPressCamera();
          // Call your logic to capture a new photo
        }
      }
    );
  };

  const onPressCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (result.canceled) {
      return;
    }
    const asset = result.assets[0];
    if (asset != null) {
      setIsLoading(true);
      const res = await handleUploadImg(asset);
      setIsLoading(false);
      onChange([...value, res]);
    }
  };

  const handleUploadImg = async (item: any) => {
    if (item != null) {
      const formData: any = new FormData();
      let uriArray = item.uri.split(".");
      let fileType = uriArray.pop();
      formData.append("file", {
        uri: item.uri,
        name: item.uri,
        type: `image/${fileType}`,
      });

      return await uploadSingleS3(formData).then((res) => {
        if (res) {
          // return { url: res?.data[0], name: item.uri };
        }
      });
    }
  };

  return (
    <TouchableOpacity onPress={showOptions}>
      <View
        style={[
          styles.wrapperUploadButton,
          {
            width: deviceWidth / 4 - 24,
            height: IMAGE_SIZE,
            marginHorizontal: SPACING_AROUND_IMAGE,
          },
        ]}
      >
        {isLoading && <ActivityIndicator color={COLORS.primary} />}
        {!isLoading && (
          <MaterialCommunityIcons
            name="camera-plus"
            size={30}
            color={COLORS.grayBDBDBD}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TakePicture;

const styles = StyleSheet.create({
  wrapperUploadButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: COLORS.grayBDBDBD,
  },
  imgStyle: {
    width: "120%",
    height: "100%",
    borderRadius: 10,
  },
});

import { COLORS, deviceWidth } from "@common/index";
import useUploadFile from "@hooks/useUploadFile";
import { useWindowDimensions } from "react-native";

const useLayoutListImage = (props?: { initialPadding?: number }) => {
  const { width: wWidth } = useWindowDimensions();
  const DEFAULT_PADDING = props?.initialPadding ?? 20;
  const SPACING_AROUND_IMAGE = 12;
  const NUMBER_IMAGE_PER_ROW = 4;
  const IMAGE_SIZE = Math.floor(
    (wWidth - DEFAULT_PADDING * 2 - SPACING_AROUND_IMAGE * 6) /
      NUMBER_IMAGE_PER_ROW
  );

  return {
    DEFAULT_PADDING,
    SPACING_AROUND_IMAGE,
    NUMBER_IMAGE_PER_ROW,
    IMAGE_SIZE,
  };
};
