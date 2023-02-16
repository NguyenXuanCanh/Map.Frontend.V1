import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import {
  Avatar,
  Button,
  Layout,
  Section,
  SectionContent,
  Text,
  TextInput,
  themeColor,
  TopNav,
  useTheme,
} from "react-native-rapi-ui";
import InfoRow from "../../components/InfoRow";
import ModalEdit from "../../components/ModalEdit";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [key, setKey] = useState("");
  const truckInfo = {
    id: "123443123",
    license: "62G1-11111",
    ownerName: "Cảnh",
    dimension: "1111",
    weight: "1111",
  };

  const toggleModal = (key, title) => {
    setModalVisible(!isModalVisible);
    // if (!isModalVisible) {
    setKey(key);
    setModalTitle(title);
    // } else {
    //   setKey("");
    //   setModalTitle("");
    // }
  };

  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
    >
      <TopNav
        middleContent="Vehicle"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{}}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 15,
          }}
        >
          <Image
            resizeMode="cover"
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
            }}
            source={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
          />
        </View>

        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 30,
          }}
        >
          <InfoRow title="Id" value={truckInfo.id} startIcon="card" />
          <InfoRow
            title="Bảng số xe"
            value={truckInfo.license}
            startIcon="document"
            endIcon="create"
            style={{ marginTop: 20 }}
            onChange={() => {
              toggleModal("license", "Thay đổi bảng số xe");
            }}
          />
          <InfoRow
            title="Tên chủ xe"
            value={truckInfo.ownerName}
            startIcon="person"
            endIcon="create"
            style={{ marginTop: 20 }}
            onChange={() => {
              toggleModal("ownerName", "Thay đổi tên chủ xe");
            }}
          />
          <InfoRow
            title="Kích thước thùng xe"
            value={truckInfo.dimension + "(KG)"}
            startIcon="cube"
            endIcon="create"
            style={{ marginTop: 20 }}
            onChange={() => {
              toggleModal("dimension", "Thay đổi kích thước thùng");
            }}
          />
          <InfoRow
            title="Khối lượng thùng xe"
            value={truckInfo.weight + "(KG)"}
            startIcon="stopwatch"
            endIcon="create"
            style={{ marginTop: 20 }}
            onChange={() => {
              toggleModal("weight", "Thay đổi khối lượng thùng");
            }}
          />
        </View>
      </ScrollView>
      <ModalEdit
        isVisible={isModalVisible}
        onClose={toggleModal}
        title={modalTitle}
        onChange={(value) => {
          console.log(key);
          console.log(modalTitle);
          console.log(value);
        }}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({});
