import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";

export default function NotiItem() {
  return (
    <View style={styles.notiItem}>
      <View style={{ padding: 5 }}>
        <Text size="sm">
          The status of package with id #012312311 has changed to{" "}
          <Text status="warning" size="sm">
            Waiting for Delivery
          </Text>
        </Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderStyle: "dashed",
          padding: 4,
          borderColor: themeColor.gray300,
        }}
      >
        <Row>
          <Col numRows={1}>
            <Text style={{ color: themeColor.gray300 }} size="sm">
              13/02/2023
            </Text>
          </Col>
          <Col numRows={1}>
            <Text
              style={{ textAlign: "right", color: themeColor.gray300 }}
              size="sm"
            >
              17:32 PM
            </Text>
          </Col>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notiItem: {
    borderColor: themeColor.black,
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    borderRadius: 8,
    borderColor: "#A19CFF",
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
  },
});
