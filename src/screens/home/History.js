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
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Col, Row } from "../../components/Flex";

export default function History({ navigation }) {
  const { isDarkmode } = useTheme();
  const [loading, setLoading] = useState(false);
  const [listHistory, setListHistory] = useState();
  const [filterData, setFilterData] = useState({
    startDate: new Date("2023-04-01"), //for test
    endDate: new Date(),
  });
  const auth = getAuth();

  useEffect(() => {
    reloadPage();
  }, []);

  const reloadPage = () => {
    setLoading(true);
    (async () => {
      async function fetchData() {
        const startDate = filterData.startDate.toISOString().slice(0, 10);
        const endDate = filterData.endDate.toISOString().slice(0, 10);
        const response = await axios.get(
          `${BASE_URL}/history?account_id=${auth.currentUser.uid}&start_date=${startDate}&end_date=${endDate}`
        );
        return response;
      }
      if (auth.currentUser) {
        fetchData()
          .then((response) => {
            setListHistory(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  };

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
              <View>
                <Row>
                  <Col
                    numRows={10}
                    style={{ alignItems: "flex-end", marginRight: 5 }}
                  >
                    <RNDateTimePicker
                      value={filterData.startDate}
                      onChange={(event, date) => {
                        setFilterData({ ...filterData, startDate: date });
                      }}
                      style={{ alignContent: "center" }}
                    />
                  </Col>
                  <Col
                    numRows={1}
                    style={{
                      alignContent: "center",
                      paddingLeft: 30,
                      paddingTop: 10,
                    }}
                  >
                    <Text>~</Text>
                  </Col>
                  <Col
                    numRows={10}
                    style={{ alignItems: "flex-start", marginLeft: 5 }}
                  >
                    <RNDateTimePicker
                      value={filterData.endDate}
                      onChange={(event, date) => {
                        setFilterData({ ...filterData, endDate: date });
                      }}
                      style={{
                        alignContent: "center",
                      }}
                    />
                  </Col>
                </Row>
              </View>
              <View style={{ width: 200, alignSelf: "center" }}>
                <Button
                  text="Search"
                  onPress={() => {
                    reloadPage();
                  }}
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    paddingTop: 7,
                    paddingBottom: 7,
                  }}
                ></Button>
              </View>
              <View
                style={{
                  minHeight: "100%",
                }}
              >
                {listHistory ? (
                  listHistory?.map((item, index) => {
                    const isChangeDate =
                      listHistory[index - 1]?.date.slice(0, 10) !=
                      listHistory[index]?.date.slice(0, 10);
                    if (isChangeDate) {
                      return (
                        <React.Fragment key={index}>
                          <View
                            style={{
                              padding: 10,
                              marginTop: 10,
                              backgroundColor: "#A19CFF",
                              borderTopLeftRadius: 5,
                              borderTopRightRadius: 5,
                            }}
                          >
                            <Text style={{ color: "white" }}>
                              Date: {item.date?.slice(0, 10)}
                            </Text>
                          </View>
                          <HistoryItem
                            style={{
                              borderBottomColor: "#f0f0f0",
                              borderBottomWidth: 1,
                              paddingBottom: 10,
                              marginTop: 10,
                            }}
                            address={item?.description}
                            status={"Diliver successfully"}
                            time={item?.date}
                            total={item?.total}
                          />
                        </React.Fragment>
                      );
                    }
                    return (
                      <HistoryItem
                        key={index}
                        style={{
                          borderBottomColor: "#f0f0f0",
                          borderBottomWidth: 1,
                          paddingBottom: 10,
                          marginTop: 10,
                        }}
                        address={item?.description}
                        status={"Diliver successfully"}
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
              </View>
            </SectionContent>
          </Section>
        )}
      </ScrollView>
    </Layout>
  );
}
