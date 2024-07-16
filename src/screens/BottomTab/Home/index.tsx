import Row from "@components/Row";
import Separator from "@components/Separator";
import MainLayout from "@layout/MainLayout";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Header from "./Header";
import TeamPreview from "./TeamPreview";

function HomeScreen() {
  return (
    <MainLayout>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Separator height={10} />
        <Row full direction="column" start rowGap={10} style={{}}>
          <TeamPreview />
        </Row>
      </ScrollView>
    </MainLayout>
  );
}

export default HomeScreen;
