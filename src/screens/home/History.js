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
import HistoryItem from "../../components/HistoryItem";

export default function History({ navigation }) {
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
          middleContent="History"
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
              <HistoryItem
                style={{
                  borderBottomColor: "#f0f0f0",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                }}
                address="23 Tran Cao Van"
                status="Da giao"
                time="12 thg 2, 2:10 CH"
                total="23000"
              />
              <HistoryItem
                style={{
                  borderBottomColor: "#f0f0f0",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                  marginTop: 20,
                }}
                address="23 Tran Cao Van"
                status="Da giao"
                time="12 thg 2, 2:10 CH"
                total="23000"
              />
            </View>
          </SectionContent>
        </Section>
      </ScrollView>
    </Layout>
  );
}