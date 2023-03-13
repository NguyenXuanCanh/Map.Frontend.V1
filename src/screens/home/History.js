import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
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
import { BASE_URL } from "../../config/constants";
import Loading from "../utils/Loading";

export default function History({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [listHistory, setListHistory] = useState();

  const auth = getAuth();

  useEffect(() => {
    setLoading(true);
    (async () => {
      async function fetchData() {
        const response = await axios.get(
          `${BASE_URL}/history/${auth.currentUser.uid}`
        );
        return response;
      }
      if (auth.currentUser) {
        fetchData()
          .then((response) => {
            console.log(response.data);
            setListHistory(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, []);

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
        {loading ? (
          <Loading />
        ) : (
          <Section>
            <SectionContent>
              <View
                style={{
                  minHeight: "100%",
                  paddingTop: 10,
                }}
              >
                {listHistory ? (
                  listHistory?.map((item, index) => {
                    console.log(item);
                    return (
                      <HistoryItem
                        key={index}
                        style={{
                          borderBottomColor: "#f0f0f0",
                          borderBottomWidth: 1,
                          paddingBottom: 20,
                        }}
                        address={item?.description}
                        status={item?.status}
                        time={item?.date}
                        total={item?.total}
                        //volumne
                        //weight
                      />
                    );
                  })
                ) : (
                  <Text>List empty</Text>
                )}
                {/* <HistoryItem
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
                /> */}
              </View>
            </SectionContent>
          </Section>
        )}
      </ScrollView>
    </Layout>
  );
}
