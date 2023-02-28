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
import { getAuth } from "firebase/auth";
const auth = getAuth();

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const currentUser = auth.currentUser;
  const [info, setInfo] = useState({});

  const dbRef = ref(getDatabase());

  useEffect(() => {
    get(child(dbRef, `user/${currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setInfo(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  updateProfile(auth.currentUser, {
    // displayName: "Jane Q. User",
    photoURL: "https://example.com/jane-q-user/profile.jpg",
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  updateEmail(auth.currentUser, "user@example.com")
    .then(() => {
      // Email updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });

  return (
    <Layout
      style={{
        minHeight: "100%",
      }}
    >
      <TopNav
        backgroundColor="#A19CFF"
        borderColor="#A19CFF"
        middleContent={info?.name}
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
            source={{ uri: "https://mui.com/static/images/avatar/1.jpg" }}
          />
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 30 }}>
          <InfoRow
            title="Name"
            value={info?.name}
            startIcon="person"
            endIcon="create"
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
  },
});
