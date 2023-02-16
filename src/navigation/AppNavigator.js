import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../provider/AuthProvider";

// Main
import Home from "../screens/Home";
import SecondScreen from "../screens/SecondScreen";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

import Loading from "../screens/utils/Loading";
import History from "../screens/home/History";
import Profile from "../screens/home/Profile";
import Vehicle from "../screens/home/Vehicle";
import Map from "../screens/home/Map";
import { API_KEY } from "../config/constants";
import { getDatabase } from "firebase/database";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "project-map-374713.firebaseapp.com",
  projectId: "project-map-374713",
  storageBucket: "project-map-374713.appspot.com",
  messagingSenderId: "193173086439",
  appId: "1:193173086439:web:48ddcaa968d22a14394242",
  measurementId: "G-M3VNWX673T",
  databaseURL:
    "https://project-map-374713-default-rtdb.asia-southeast1.firebasedatabase.app",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen name="History" component={History} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="Vehicle" component={Vehicle} />
      <MainStack.Screen name="Map" component={Map} />
    </MainStack.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
