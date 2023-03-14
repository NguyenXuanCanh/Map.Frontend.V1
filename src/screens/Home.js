import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from "react-native";
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
import { isClockIn } from "../atoms/clock";
import { useRecoilState } from "recoil";
import ModalClockIn from "../components/ModalClockIn";
import Loading from "./utils/Loading";
import { BASE_URL } from "../config/constants";
import NotiItem from "../components/NotiItem";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const auth = getAuth();
  const [isClockedIn, setIsClockedIn] = useRecoilState(isClockIn);
  const [isVisible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listNoti, setListNoti] = useState([]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      async function fetchData() {
        const response = await axios.get(
          `${BASE_URL}/clockin_status/${auth.currentUser.uid}`
        );
        return response;
      }
      if (auth.currentUser) {
        fetchData()
          .then((response) => {
            if (response.data && response.data.data.status == "1")
              setIsClockedIn(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setLoading(true);
    if (isClockedIn) {
      async function fetchData() {
        const response = await axios.get(
          `${BASE_URL}/notification/${auth.currentUser.uid}`
        );
        return response;
      }
      fetchData()
        .then((response) => {
          if (response.data.data) {
            setListNoti(response.data.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      setVisible(false);
    }
  }, [isClockedIn]);

  const onClockIn = () => {
    setLoading(true);
    (async () => {
      async function fetchData() {
        const response = await axios.get(
          `${BASE_URL}/generate_trip/${auth.currentUser.uid}`
        );
        return response;
      }
      async function updateClockinStatus() {
        const response = await axios.get(
          `${BASE_URL}/clockin_status_update/${auth.currentUser.uid}/1`
        );
        return response;
      }
      updateClockinStatus()
        .then((res) => {
          res.data &&
            fetchData()
              .then((response) => {
                console.log(response.data);
                setIsClockedIn(true);
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch((err) => {
          console.log(err);
        });

      //   setIsClockedIn(true);
      //   setLoading(false);
    })();
  };

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
        {loading ? (
          <Loading />
        ) : (
          <>
            <ModalClockIn
              isVisible={isVisible}
              onClose={() => {
                setVisible(false);
              }}
              isClockIn={isClockedIn}
              onClockIn={onClockIn}
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
                style={{
                  textAlign: "center",
                  marginTop: 50,
                  color: themeColor.white,
                }}
                size="xl"
              >
                Notifications
              </Text>
              <ScrollView style={{ width: "80%", marginTop: 20 }}>
                {listNoti?.map((item, index) => {
                  if (index < 4)
                    return (
                      <NotiItem
                        style={{ backgroundColor: "white" }}
                        data={item}
                        key={index}
                      />
                    );
                })}
              </ScrollView>
            </View>
            <View
              style={{
                flex: 2,
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
                <ScrollView
                  style={{ padding: 20, width: "100%", height: "100%" }}
                >
                  <Row style={{ height: 150 }}>
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
                        leftContent={
                          <Ionicons
                            name="map-outline"
                            size={20}
                            color={themeColor.black}
                          />
                        }
                        text={
                          <>
                            <Text size="xl" fontWeight="bold">
                              My Work Map
                            </Text>
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
                            </Text>
                          </>
                        }
                        leftContent={
                          <Ionicons
                            name="clipboard-outline"
                            size={20}
                            color={themeColor.black}
                          />
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
                  <Row style={{ height: 150 }}>
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
                        leftContent={
                          <Ionicons
                            name="bus-outline"
                            size={20}
                            color={themeColor.black}
                          />
                        }
                        outline
                        text={
                          <>
                            <Text size="xl" fontWeight="bold">
                              My Vehicle
                            </Text>
                          </>
                        }
                        status="success"
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
                          </>
                        }
                        leftContent={
                          <Ionicons
                            name="information-circle-outline"
                            size={20}
                            color={themeColor.black}
                          />
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
                  <Row style={{ height: 150 }}>
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
                        leftContent={
                          <Ionicons
                            name="time-outline"
                            size={20}
                            color={themeColor.black}
                          />
                        }
                        outline
                        text={
                          <>
                            <Text size="xl" fontWeight="bold">
                              Work Status
                            </Text>
                          </>
                        }
                        status="danger"
                        onPress={() => {
                          setVisible(true);
                        }}
                      />
                    </Col>
                    <Col numRows={1}></Col>
                    <Col numRows={7}></Col>
                  </Row>
                </ScrollView>
              </Section>
            </View>
          </>
        )}
      </Layout>
    </KeyboardAvoidingView>
  );
}
