import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 15,
          }}
        >
          <Avatar
            source={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
            size="xl"
          />
          <Text size="h3">a</Text>
          <Text size="h4">@ bảng số xe</Text>
        </View>
        <Section>
          <SectionContent>
            <View
              style={{
                flex: 3,
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  paddingTop: 7,
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
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
                </View>
              </View>
            </View>
          </SectionContent>
        </Section>
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