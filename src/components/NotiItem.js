import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";

export default function NotiItem(props) {
  const { data, callback } = props;
  const dt = new Date(data?.time);
  return (
    <TouchableOpacity
      style={styles.notiItem}
      onPress={() => {
        callback && callback();
      }}
    >
      <View style={{ padding: 5 }}>
        <Text size="lg">
          {data?.type == "clockin" ? "You clock in at " : null}
          <Text status="warning" size="sm">
            {data?.time}
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
              {dt.getDate.toString()}
            </Text>
          </Col>
          <Col numRows={1}>
            <Text
              style={{ textAlign: "right", color: themeColor.gray300 }}
              size="lg"
            >
              {dt.getTime.toString()}
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
