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

// Better put your these secret keys in .env file
const firebaseConfig = {
//   apiKey: "AIzaSyCbtb5zcnXVF_t1l3uckddhm_1sSjWWCDc",
// //   apiKey: "AIzaSyD9Sl_QM-OJSsYbNMb0mCjK6dRw3rS-FoA",
//   authDomain: "",
//   databaseURL: "",
//   projectId: "project-map-374713",
//   storageBucket: "project-map-374713.appspot.com",
//   messagingSenderId: "193173086439",
//   appId: "193173086439:android:edea8de753103409394242",
    apiKey: "AIzaSyCbtb5zcnXVF_t1l3uckddhm_1sSjWWCDc",
    authDomain: "project-map-374713.firebaseapp.com",
    projectId: "project-map-374713",
    storageBucket: "project-map-374713.appspot.com",
    messagingSenderId: "193173086439",
    appId: "1:193173086439:web:48ddcaa968d22a14394242",
    measurementId: "G-M3VNWX673T"
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
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
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
