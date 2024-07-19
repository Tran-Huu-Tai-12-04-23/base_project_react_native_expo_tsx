import { FHeader, FView } from "@components/index";
import React from "react";

type IProps = {};
const CreateRequest = ({}: IProps) => {
  return (
    <FView>
      <FHeader type="menu" title="CreateRequest" align="center" />
    </FView>
  );
};

export default CreateRequest;
