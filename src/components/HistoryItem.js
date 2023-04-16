import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "react-native-rapi-ui";
import { View } from "react-native";
import { toVND } from "../libs/ToVND";
import { Col, Row } from "./Flex";

export default function HistoryItem(props) {
  const { style, address, status, time, total } = props;
  return (
    <Row style={style}>
      <Col numRows={1}>
        <Ionicons
          name="cube"
          size={50}
          color="black"
          style={{ paddingTop: 10 }}
        />
      </Col>
      <Col numRows={6}>
        <Text size="h6" fontWeight="bold">
          {address}
        </Text>
        <Text size="h6" fontWeight="medium" style={{ marginTop: 5 }}>
          {status}
        </Text>
        <Text fontWeight="light" style={{ marginTop: 5, fontSize: 13 }}>
          Time: {time?.slice(0, 10)}, {time?.slice(11, 16)}
        </Text>
      </Col>
      <Col numRows={4} style={{}}>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text fontWeight="light" style={{ marginTop: 2, fontSize: 13 }}>
            {toVND(total)}đ
          </Text>
        </View>
        {/* <Button text="See Detail" size="sm" /> */}
      </Col>
    </Row>
  );
}
