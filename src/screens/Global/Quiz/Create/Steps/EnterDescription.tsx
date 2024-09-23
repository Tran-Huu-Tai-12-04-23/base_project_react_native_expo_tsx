import { Input } from "@components/Input";
import Row from "@components/Row";
import TextDefault from "@components/TextDefault";
import { useTheme } from "@context/themContext";
import { normalize } from "@helper/helpers";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { styleGlobal } from "src/styles";

function EnterDescription() {
  const { theme } = useTheme();
  const [description, setDescription] = React.useState<string>("");
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Row full start direction="column" style={styles.container}>
        <TextDefault
          bold
          size={normalize(16)}
          style={{ color: theme.textSecond }}
        >
          Enter description about test you want create (optional)
        </TextDefault>

        <Row
          style={[styles.input, { backgroundColor: theme.backgroundSecond }]}
        >
          <Input
            multiple
            onChangeText={(text) => setDescription(text)}
            text={description}
          />
        </Row>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dot: {
    width: normalize(25),
    height: normalize(10),
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: normalize(20),
  },
  input: {
    marginTop: normalize(10),
    width: "100%",
    ...styleGlobal.shadow,
    borderRadius: normalize(10),
    padding: normalize(10),
  },
});

export default EnterDescription;
