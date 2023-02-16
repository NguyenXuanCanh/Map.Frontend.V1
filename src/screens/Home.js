import React from "react";
import { View, Linking } from "react-native";
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
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { Col, Row } from "../components/Flex";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  return (
    <Layout style={{padding: 0}}>
      <TopNav
        leftContent={
            <View style={{width: 150}}>
                <Ionicons
                name="log-out-outline"
                size={20}
                color={isDarkmode ? themeColor.white100 : themeColor.dark}
                onPress={() => {
                    signOut(auth);
                }}
                />
            </View>
        }
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        //   backgroundColor: "black"
        }}
      >
        <Text fontWeight="bold" style={{ textAlign: "center" }}>
              These UI components provided by Rapi UI
        </Text>
      </View>
      <View style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        //   backgroundColor: "black",
        }}>
        <Section style={{ marginTop: "auto", padding: 0, width: "100%", minHeight: 300, borderTopLeftRadius: 15, borderTopEndRadius: 15}}>
          <SectionContent style={{padding: 0, width: "100%"}}>
            
            <Row style={{height: "50%"}}>
                <Col numRows={7}>
                    <Button
                    style={{ marginTop: 10, height: "90%" }}
                    text="Go to Map"
                    status="info"
                    onPress={() => {
                        navigation.navigate("Map");
                    }}
                    />
                </Col>
                <Col numRows={1}></Col>
                <Col numRows={7}>
                    <Button
                    text="Go to History"
                    
                    onPress={() => {
                        navigation.navigate("History");
                    }}
                    style={{
                        marginTop: 10,
                        height: "90%",
                    }}
                    />
                </Col>
            </Row>
            <Row style={{height: "50%"}}>
                <Col numRows={7}>
                    <Button
                    style={{ marginTop: 10, height: "90%" }}
                    text="Go to Vehicle"
                    status="danger"
                    onPress={() => {
                        navigation.navigate("Vehicle");
                    }}
                    />
                </Col>
                <Col numRows={1}></Col>
                <Col numRows={7}>
                    <Button
                    text="Go to Profile"
                    onPress={() => {
                        navigation.navigate("Profile");
                    }}
                    style={{
                        marginTop: 10,
                        height: "90%",
                    }}
                    status="warning"
                    />
                </Col>
            </Row>
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
