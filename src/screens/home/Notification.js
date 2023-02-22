import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Layout,
  Section,
  SectionContent,
  Text,
  themeColor,
  TopNav,
  useTheme,
} from "react-native-rapi-ui";
import NotiItem from "../../components/NotiItem";

export default function Notification({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
        }}
      >
        <TopNav
          backgroundColor="#A19CFF"
          borderColor="#A19CFF"
          middleContent="Notification"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.black}
            />
          }
          leftAction={() => navigation.goBack()}
        />

        <Section>
          <SectionContent>
            <View
              style={{
                minHeight: "100%",
                paddingTop: 10,
              }}
            >
              <NotiItem />
            </View>
          </SectionContent>
        </Section>
      </ScrollView>
    </Layout>
  );
}
