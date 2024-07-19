import { FHeader, FView } from "@components/index";
import FAutoComplete from "@components/inputs/FAutocomplete";
import React from "react";
import { Text, View } from "react-native";
import stylesApp from "../styleApp";

type Props = {};
const WorkDiaryScreen = (props: Props) => {
  return (
    <FView>
      <FHeader type="menu" title="Nhật trình xe tháng" align="center" />
      <View style={{ padding: 10 }}>
        <Text style={stylesApp.txtSmallBold}>Xem Carcode</Text>
        <FAutoComplete
          title={"số xe"}
          value={"1"}
          onChooseValue={(value: any) => {}}
          items={[]}
          errorMessage={""}
        />
        {/* {_headerDetail()} */}
      </View>
      {/* {_renderContaint()} */}
      {/* {_modalEditOdo()} */}
    </FView>
  );
};

export default WorkDiaryScreen;
