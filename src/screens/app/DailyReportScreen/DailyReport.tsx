import { FHeader, FView } from "@components/index";
import React from "react";

type IProps = {};
const DailyReport = ({}: IProps) => {
  return (
    <FView>
      <FHeader type="menu" title="DailyReport" align="center" />
    </FView>
  );
};

export default DailyReport;
