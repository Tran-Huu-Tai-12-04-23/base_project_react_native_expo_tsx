import Separator from "@components/Separator";
import { normalize } from "@helper/helpers";
import MainLayout from "@layout/MainLayout";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import FindFriendCard from "./FindFriendCard";
import Header from "./Header";
import LstQuizzes from "./LstQuizzes";
import RecentQuizItem from "./RecentQuizItem";

function HomeScreen() {
  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Separator height={normalize(40)} />
        <Header />
        <Separator height={20} />
        <RecentQuizItem />
        <Separator height={20} />
        <FindFriendCard />
        <Separator height={20} />
        <LstQuizzes />
      </ScrollView>
    </MainLayout>
  );
}

export default HomeScreen;
