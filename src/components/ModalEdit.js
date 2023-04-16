import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text, TextInput } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";

export default function ModalEdit(props) {
  const { isVisible, onClose, title, onChange, value } = props;
  const [text, setText] = useState(value);
  useEffect(() => {
    if (value) setText(value);
  }, [value]);
  console.log(value);
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => onClose()}
      coverScreen
      deviceHeight={50000}
    >
      <View
        style={{
          flex: 1,
          marginTop: 10,
          backgroundColor: "#fff",
          borderColor: "#f3f3f3",
          borderStyle: "solid",
          borderWidth: 2,
          borderRadius: 5,
          padding: 20,
          maxHeight: 200,
        }}
      >
        <Text style={{ marginBottom: 10, textAlign: "center" }}>
          {title || "Update"}
        </Text>
        <TextInput
          placeholder="Enter your text"
          value={text}
          onChangeText={(val) => setText(val)}
        />

        <Row style={{ marginTop: "auto" }}>
          <Col numRows={10}>
            <Button
              text="Cancel"
              status="danger"
              onPress={onClose}
              size="md"
              style={{ height: 40 }}
              outline
            />
          </Col>
          <Col numRows={1} />
          <Col numRows={10}>
            <Button
              text="Confirm"
              onPress={() => {
                onChange(text);
              }}
              //   outline
              size="md"
              style={{ height: 40 }}
            />
          </Col>
        </Row>
      </View>
    </Modal>
  );
}
