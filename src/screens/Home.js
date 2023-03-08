import React, { useEffect, useState } from "react";
import { View, Linking, KeyboardAvoidingView, StatusBar } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
  TextInput,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row } from "../components/Flex";
import axios from "axios";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const auth = getAuth();
    // useEffect(async ()=>{
    //     async function fetchData() {
    //         // You can await here
    //         const response = await MyAPI.getData(someId);
    //         // ...
    //         return response;
    //     }
    //     fetchData().then(()=>{

    //     });
    // },[])
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <StatusBar animated={true} backgroundColor="#A19CFF" />
      <Layout style={{ padding: 0 }}>
        <TopNav
          rightContent={
            <Ionicons
              name="log-out"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
              onPress={() => {
                signOut(auth);
              }}
            />
          }
          leftContent={
            <Ionicons
              name="notifications"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          }
          leftAction={() => {
            navigation.navigate("Notification");
          }}
          backgroundColor="#A19CFF"
          borderColor="#A19CFF"
        />
        <View
          style={{
            flex: 2,
            alignItems: "center",
            paddingTop: 20,
            backgroundColor: "#A19CFF",
            //   justifyContent: "center",
            //   backgroundColor: "black"
          }}
        >
          <Text
            fontWeight="light"
            style={{ textAlign: "center", color: themeColor.white }}
            size="sm"
          >
            This app is working in
          </Text>
          <Text
            fontWeight="bold"
            style={{ textAlign: "center", marginTop: 10 }}
            size="md"
          >
            Ho Chi Minh City
            <Ionicons name="location-outline" size={20} />
          </Text>
          <Text
            fontWeight="bold"
            style={{ textAlign: "center", marginTop: 50 }}
            size="xl"
          >
            Track Your Package
          </Text>
          <View style={{ width: "80%", marginTop: 20 }}>
            <TextInput
              placeholder="Enter your package number"
              leftContent={
                <>
                  <Ionicons name="cube-outline" size={20} />
                </>
              }
              value={searchText}
              onChangeText={(val) => setSearchText(val)}
            />
          </View>
        </View>
        <View
          style={{
            flex: 3,
            alignItems: "center",
            width: "100%",
            backgroundColor: "#A19CFF",
          }}
        >
          <Section
            style={{
              marginTop: "auto",
              padding: 0,
              width: "100%",
              minHeight: 300,
              borderTopLeftRadius: 25,
              borderTopEndRadius: 25,
            }}
          >
            <SectionContent style={{ padding: 0, width: "100%" }}>
              <Row style={{ height: "50%" }}>
                <Col numRows={7}>
                  <Button
                    style={{
                      marginTop: 10,
                      height: "90%",
                      borderLeftWidth: 1.5,
                      borderTopWidth: 1.5,
                      borderRightWidth: 5,
                      borderBottomWidth: 5,
                    }}
                    status="info"
                    onPress={() => {
                      navigation.navigate("Map");
                    }}
                    outline
                    text={
                      <>
                        <Text size="xl" fontWeight="bold">
                          My Work Map
                        </Text>{"             "}
                        <Text size="sm">Ex ea Lorem deserunt ipsum qui.</Text>
                      </>
                    }
                  />
                </Col>
                <Col numRows={1}></Col>
                <Col numRows={7}>
                  <Button
                    text={
                      <>
                        <Text size="xl" fontWeight="bold">
                          History
                        </Text>{" "}
                        <Text size="sm">Ex ea Lorem deserunt ipsum qui.</Text>
                      </>
                    }
                    onPress={() => {
                      navigation.navigate("History");
                    }}
                    outline
                    style={{
                      marginTop: 10,
                      height: "90%",
                      borderLeftWidth: 1.5,
                      borderTopWidth: 1.5,
                      borderRightWidth: 5,
                      borderBottomWidth: 5,
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ height: "50%" }}>
                <Col numRows={7}>
                  <Button
                    style={{
                      marginTop: 10,
                      height: "90%",
                      borderLeftWidth: 1.5,
                      borderTopWidth: 1.5,
                      borderRightWidth: 5,
                      borderBottomWidth: 5,
                    }}
                    outline
                    text={
                      <>
                        <Text size="xl" fontWeight="bold">
                          My Vehicle
                        </Text>{" "}
                        <Text size="sm">Ex ea Lorem deserunt ipsum qui.</Text>
                      </>
                    }
                    status="danger"
                    onPress={() => {
                      navigation.navigate("Vehicle");
                    }}
                  />
                </Col>
                <Col numRows={1}></Col>
                <Col numRows={7}>
                  <Button
                    text={
                      <>
                        <Text size="xl" fontWeight="bold">
                          My Contact
                        </Text>
                        {"     "}
                        <Text size="sm">Ex ea Lorem deserunt ipsum qui.</Text>
                      </>
                    }
                    onPress={() => {
                      navigation.navigate("Profile");
                    }}
                    outline
                    style={{
                      marginTop: 10,
                      height: "90%",
                      borderLeftWidth: 1.5,
                      borderTopWidth: 1.5,
                      borderRightWidth: 5,
                      borderBottomWidth: 5,
                    }}
                    status="warning"
                  />
                </Col>
              </Row>
            </SectionContent>
          </Section>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
}
