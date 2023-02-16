import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Layout,
  Section,
  SectionContent,
  Text,
  themeColor,
  TopNav,
  useTheme,
} from "react-native-rapi-ui";
import InfoRow from "../../components/InfoRow";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const accountInfo = {
    name: "Nguyen Xuan Canh",
    phone: "0817979112",
    email: "",
    address: "",
    history: "",
  };
  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
    >
        <TopNav
          middleContent="Profile"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.black}
            />
          }
          leftAction={() => navigation.goBack()}
        />
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 15,
          }}
        >
          <Avatar
            source={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            size="xl"
          />
          <Text size="h3">{accountInfo.name}</Text>
          <Text size="h4">@1234</Text>
        </View>
        <Section>
          <SectionContent>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start",
                minHeight: 500,
              }}
            >
              <View
                style={{
                  paddingTop: 7,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                {/* <Text size='h3'>Account Infomation</Text> */}
                <View
                  style={{
                    // paddingTop: 15,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                    }}
                  >
                    <InfoRow
                      title="Name"
                      value={accountInfo.name}
                      startIcon="person"
                      endIcon="create"
                    />
                  </View>
                </View>
              </View>
            </View>
            <Button
              text="Xem lịch sử giao hàng"
              onPress={() => {
                navigation.navigate("History");
              }}
              style={{
                marginTop: "auto",
              }}
            />
          </SectionContent>
        </Section>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
  },
});