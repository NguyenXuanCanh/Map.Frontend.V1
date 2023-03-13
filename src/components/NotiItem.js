import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";

export default function NotiItem(props) {
  const { title, date, time, callback } = props;
  return (
    <TouchableOpacity
      style={styles.notiItem}
      onPress={() => {
        callback && callback();
      }}
    >
      <View style={{ padding: 5 }}>
        <Text size="lg">
          The status of package with id #012312311 has changed to{" "}
          <Text status="warning" size="lg">
            Waiting for Delivery
          </Text>
        </Text>
      </View>
      <View
        style={{
          padding: 4,
          //   justifyContent: "flex-end",
          marginTop: "auto",
        }}
      >
        <Row>
          <Col numRows={1}>
            <Text style={{ color: themeColor.gray300 }} size="lg">
              13/02/2023
            </Text>
          </Col>
          <Col numRows={1}>
            <Text
              style={{ textAlign: "right", color: themeColor.gray300 }}
              size="lg"
            >
              17:32 PM
            </Text>
          </Col>
        </Row>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notiItem: {
    minHeight: 110,
    marginTop: 5,
    padding: 5,
    borderRadius: 8,
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: themeColor.white,
    paddingBottom: 10,
  },
});
