import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Layout, themeColor, TopNav, useTheme } from "react-native-rapi-ui";
import InfoRow from "../../components/InfoRow";
import ModalEdit from "../../components/ModalEdit";
import { BASE_URL } from "../../config/constants";
import Loading from "../utils/Loading";
import BoxTruck from "../../../assets/box-truck.png"

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [key, setKey] = useState("");
  const [truckInfo, setStructInfo] = useState();
  const [loading, setLoading]=useState(false);
  const auth = getAuth();

  useEffect(()=>{
    setLoading(true);
    (async () => {
        async function fetchData() {
            const response = await axios.get(`${BASE_URL}/vehicle/${auth.currentUser.uid}`);
            return response;
        }
        if(auth.currentUser){
            fetchData()
        .then((response)=>{
            console.log(response.data.data)
            setStructInfo(response.data.data)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
        });
        }
    })();
  },[])

  const toggleModal = (key, title) => {
    setModalVisible(!isModalVisible);
    setKey(key);
    setModalTitle(title);
  };

  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
    >
      <TopNav
        backgroundColor="#A19CFF"
        borderColor="#A19CFF"
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
      {loading ? <Loading/> : 
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
            // borderRadius: 100,
          }}
          source={BoxTruck}
        />
      </View>

      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 30,
        }}
      >
        <InfoRow title="Brand" value={truckInfo?.brand} startIcon="card" 
        endIcon="create"
        style={{ marginTop: 20 }}
        onChange={() => {
          toggleModal("brand", "Update vehicle brand");
        }}/>
        <InfoRow
          title="Bảng số xe"
          value={truckInfo?.license}
          startIcon="document"
          endIcon="create"
          style={{ marginTop: 20 }}
          onChange={() => {
            toggleModal("license", "Update vehicle license");
          }}
        />
        <InfoRow
          title="Tên chủ xe"
          value={truckInfo?.owner_name}
          startIcon="person"
          endIcon="create"
          style={{ marginTop: 20 }}
          onChange={() => {
            toggleModal("owner_name", "Update vehicle owner name");
          }}
        />
        <InfoRow
          title="Kích thước thùng xe"
          value={truckInfo?.tank_volume + "(KG)"}
          startIcon="cube"
          endIcon="create"
          style={{ marginTop: 20 }}
          onChange={() => {
            toggleModal("tank_volume", "Update vehicle tank volume");
          }}
        />
        <InfoRow
          title="Khối lượng thùng xe"
          value={truckInfo?.tank_weight + "(KG)"}
          startIcon="stopwatch"
          endIcon="create"
          style={{ marginTop: 20 }}
          onChange={() => {
            toggleModal("weight", "Update vehicle tank weight");
          }}
        />
      </View>
    </ScrollView>
      }
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
