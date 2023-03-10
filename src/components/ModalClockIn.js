import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Button, Text, TextInput } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";
import { isClockIn } from "../atoms/clock";
import { useSetRecoilState } from "recoil";

export default function ModalClockIn(props) {
  const { isVisible, onClose, onChange } = props;
  const setIsClockedIn = useSetRecoilState(isClockIn);

  const [time, setTime]=useState({
    hours: new Date().getHours(),
    min: new Date().getMinutes(),
    sec: new Date().getSeconds(),
  });

  useEffect(() => {
    const interval = setInterval(() => {
        const hours=new Date().getHours();
        const min=new Date().getMinutes();
        const sec=new Date().getSeconds();
        setTime({
            hours,
            min,
            sec
        })
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
        <Text style={{ marginBottom: 25, textAlign: "center" }} size="xl">
          {/* {title || "Update"} */}
          Start your working day ?
        </Text>
        
        <Text style={{ textAlign: "center" }}>
            <Text status="danger" fontWeight="bold" size="h3">{time?.hours}</Text> : <Text status="danger" fontWeight="bold" size="h3">{time?.min}</Text>: <Text status="danger" fontWeight="bold" size="h3">{time?.sec}</Text>
        </Text>

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
              text="Clock in"
              onPress={() => {
                setIsClockedIn(true);
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