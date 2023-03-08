import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Layout,
  Section,
  SectionContent,
  Text,
  themeColor,
  TopNav,
  useTheme,
} from "react-native-rapi-ui";
import InfoRow from "../../components/InfoRow";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { AuthContext } from "../../provider/AuthProvider";
import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import ModalEdit from "../../components/ModalEdit";
import Loading from "../utils/Loading";
import * as ImagePicker from 'expo-image-picker';

export default function ({ navigation }) {
  const auth = getAuth();
  const { isDarkmode } = useTheme();
  const [info, setInfo] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading]=useState(false);
  const [image, setImage] = useState(null);

  const toggleModal = (key, title) => {
    setModalVisible(!isModalVisible);
    setKey(key);
    setModalTitle(title);
  };
  const dbRef = ref(getDatabase());

  useEffect(() => {
    setLoading(true);
    (async () => {
        if (auth.currentUser) {
            setInfo({
              displayName: auth.currentUser.displayName,
              email: auth.currentUser.email,
              phoneNumber: auth.currentUser.phoneNumber,
              photoURL:
                auth.currentUser.photoURL ==
                  "https://example.com/jane-q-user/profile.jpg" ||
                !auth.currentUser.photoURL
                  ? "https://mui.com/static/images/avatar/1.jpg"
                  : auth.currentUser.photoURL,
              uid: auth.currentUser.uid,
            });
        }
        setLoading(false);
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateProfileAuth = (key, value) => {
    if (key == "email") {
      updateEmail(auth.currentUser, value)
        .then(() => {
          console.log(auth.currentUser);
          setInfo({
            ...info,
            email: auth.currentUser.email,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateProfile(auth.currentUser, {
        [key]: value,
      })
        .then(() => {
          console.log(auth.currentUser);
          setInfo({
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            phoneNumber: auth.currentUser.phoneNumber,
            photoURL:
              auth.currentUser.photoURL ==
              "https://example.com/jane-q-user/profile.jpg"
                ? "https://mui.com/static/images/avatar/1.jpg"
                : auth.currentUser.photoURL,
            uid: auth.currentUser.uid,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  console.log(info)
  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
    >
      <TopNav
        backgroundColor="#A19CFF"
        borderColor="#A19CFF"
        middleContent={info?.displayName}
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      {loading ?
      <Loading/>
      : 
      <ScrollView contentContainerStyle={{}}>
      <View
        style={{
          flex: 1,
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
          source={{ uri: info?.photoURL }}
        />
        <Button text="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image
          resizeMode="cover"
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
          }}
          source={{ uri: image }}
        />}
      </View>
      <View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
        <InfoRow
          title="Name"
          value={info?.displayName}
          startIcon="person-outline"
          endIcon="create-outline"
          onChange={() => {
            toggleModal("displayName", "Update name");
          }}
        />
        <InfoRow
          title="Email"
          value={info?.email}
          startIcon="mail-outline"
          endIcon="create-outline"
          style={{ marginTop: 20 }}
          onChange={() => {
            toggleModal("email", "Update email");
          }}
        />
        <InfoRow
          title="Phone"
          value={info?.phoneNumber}
          startIcon="call-outline"
          endIcon="create-outline"
          style={{ marginTop: 20 }}
          onChange={() => {
            toggleModal("phoneNumber", "Update phone");
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
          updateProfileAuth(key, value);
          setModalVisible(false);
        }}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
  },
});
