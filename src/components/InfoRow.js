import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";
import { View } from "react-native";

export default (props) => {
  const { title, value, startIcon, endIcon, style, onChange } = props;
  return (
    <Row style={style}>
      <Col numRows={2}>
        <Ionicons
          name={startIcon}
          size={32}
          color="red"
          style={{ padding: 5 }}
        />
      </Col>
      <Col numRows={8}>
        <Text size="h6" fontWeight="bold">
          {title}
        </Text>
        <Text size="h6">{value}</Text>
      </Col>
      <Col numRows={2} style={{ alignItems: "flex-end" }}>
        <Ionicons
          name={endIcon}
          size={32}
          color="red"
          style={{ paddingTop: 5 }}
          onPress={onChange}
        />
      </Col>
    </Row>
  );
};
