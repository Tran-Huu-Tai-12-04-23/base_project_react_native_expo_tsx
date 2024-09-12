import {
  ButtonLink,
  ButtonOutlined,
  ButtonPrimary,
  ButtonSecond,
  IconButton,
} from "@components/Button";
import Container from "@components/Container";
import { Input, InputPassword } from "@components/Input";
import TextDefault, { Title } from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { localImages } from "assets/localImage";
import EmailIcon from "assets/svg/email-icon";
import LockIcon from "assets/svg/lock-icon";
import React from "react";
import { Image, SafeAreaView, ScrollView } from "react-native";
import { styleGlobal } from "src/styles";

function DemoScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView>
        <Container bg={theme.background}>
          <TextDefault>Various Class Choices In One App</TextDefault>
          <Title>Various Class Choices In One App</Title>
          <ButtonPrimary onPress={function (): void {}} title={"Get Started"} />

          <ButtonSecond onPress={function (): void {}} title={"Get Started"} />

          <ButtonLink onPress={function (): void {}} title={"Get Started"} />

          <ButtonOutlined
            onPress={function (): void {}}
            title={"Get Started"}
          />
          <IconButton
            icon={
              <Image
                source={localImages().googleIcon}
                style={styleGlobal.icon}
              />
            }
            onPress={function (): void {}}
          />
          <IconButton
            icon={
              <Image
                source={localImages().githubIcon}
                style={styleGlobal.icon}
              />
            }
            onPress={function (): void {}}
          />

          <Input
            placeholder="Your email"
            onChangeText={function (text: string): void {}}
            text={""}
          />
          <InputPassword
            placeholder="Your password"
            onChangeText={function (): void {}}
            text={""}
          />
          <Input
            leftIcon={<EmailIcon />}
            placeholder="Your email"
            onChangeText={function (text: string): void {}}
            text={""}
          />
          <InputPassword
            leftIcon={<LockIcon />}
            placeholder="Your password"
            onChangeText={function (): void {}}
            text={""}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DemoScreen;
