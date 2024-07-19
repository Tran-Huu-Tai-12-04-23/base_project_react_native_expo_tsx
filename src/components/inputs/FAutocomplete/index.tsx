import { COLORS, deviceWidth, normalize } from "@common/index";
import NTText from "@components/texts/FText";
import Row from "@components/views/FView/Row";
import { useBottomSheet } from "@context/bottomSheetContext";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import React, { Fragment, useCallback, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Button } from "react-native-elements";
import InputDefault from "../FInput/AInput";

type Props<T> = {
  onChooseValue: (value: T) => void;
  items: T[];
  placeholder?: string;
  value: string;
  title?: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  disable?: boolean;
  labelFiled?: string;
};

type FAutoState<T> = {
  isLoading: boolean;
  data: T[];
};

function FAutoComplete<T>({
  labelFiled = "label",
  items,
  onChooseValue,
  value,
  placeholder,
  containerStyle,
  disable,
}: Props<T>) {
  const { openBottomSheet, onSetBottomSheetInfo } = useBottomSheet();
  const handleBottomSheet = () => {
    onSetBottomSheetInfo({
      content: (
        <FAutoCompleteList
          labelFiled={labelFiled}
          items={items}
          onChooseValue={onChooseValue}
        />
      ),
      snapPoints: ["94%"],
    });
    openBottomSheet();
  };

  return (
    <Fragment>
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={handleBottomSheet}
        disabled={disable}
      >
        <Row full between>
          <NTText h5 h5Style={{ fontSize: 12, color: COLORS.grayBDBDBD }}>
            {value && typeof value === "object"
              ? value[labelFiled]
              : placeholder}
          </NTText>
          <MaterialIcons name="expand-more" size={24} color="black" />
        </Row>
      </TouchableOpacity>
    </Fragment>
  );
}

type FAutoCompleteListProps<T> = {
  items: T[];
  labelFiled: string;
  onChooseValue: (value: T) => void;
};

function FAutoCompleteList<T>({
  items,
  onChooseValue,
  labelFiled,
}: FAutoCompleteListProps<T>) {
  const { hideBottomSheet } = useBottomSheet();
  const [search, setSearch] = useState("");

  const filteredItems = useCallback(() => {
    return items.filter((item: any) =>
      (item[labelFiled] as string).toLowerCase().includes(search.toLowerCase())
    );
  }, [search, items]);

  return (
    <Row direction="column" rowGap={10} full center style={{ flex: 1 }}>
      <View style={{ position: "relative", marginTop: 10, height: 30 }}>
        <InputDefault
          width={deviceWidth - 40}
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <Fontisto
          name="search"
          size={24}
          color="black"
          style={{ position: "absolute", top: 8, right: 10 }}
        />
      </View>

      <FlatList
        style={{
          flex: 1,
          marginTop: 10,
        }}
        ListEmptyComponent={() => (
          <NTText h4 center w500 txtStyle={{ marginTop: normalize(70) }}>
            Hiện chưa có hợp đồng nào!
          </NTText>
        )}
        data={filteredItems()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: any }) => {
          return (
            <TouchableOpacity
              onPress={() => onChooseValue(item)}
              style={styles.listItem}
            >
              {item && (
                <NTText h1Style={{ fontSize: 16 }} h1>
                  {item[labelFiled] as string}
                </NTText>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ height: 100 }} />
      <Row full center style={{ position: "absolute", bottom: 40 }}>
        <Button
          title="Đóng"
          onPress={() => hideBottomSheet()}
          buttonStyle={{
            width: deviceWidth - 20,
            borderRadius: 100,
            backgroundColor: COLORS.redColor,
          }}
          type="solid"
        />
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    padding: 5,
    flex: 1,
  },
  listItem: {
    padding: 10,
    backgroundColor: "white",
    width: deviceWidth - 40,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: Platform.OS === "android" ? 2 : undefined,
    margin: 10,
    marginVertical: 5,
  },
});

export default FAutoComplete;
