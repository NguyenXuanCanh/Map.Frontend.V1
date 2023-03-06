import React, { useEffect, useRef, useState } from "react";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import MapAutocomplete from "../../components/MapAutoComplete";
import RouteList from "../../components/RouteList";
import { DEV_OUTPUT, OUTPUT } from "../../libs/output";
import {
  API_KEY,
  BASE_URL,
  DEFAULT_STORE_LOCATION,
} from "../../config/constants";
import axios from "axios";
import Loading from "../utils/Loading";
import { test_out } from "../../libs/test";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const VEHICLEID = 1;
  const DELTA = {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const INIT_POSITION = {
    coords: {
      latitude: DEFAULT_STORE_LOCATION.coords.latitude,
      longitude: DEFAULT_STORE_LOCATION.coords.longitude,
    },
  };
  const [placeSelect, setPlaceSelect] = useState();
  const [location, setLocation] = useState(null);
  const [output, setOutput] = useState(OUTPUT);
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState();
  const [next, setNext] = useState();
  const [test, setTest] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const position = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLoading(false);
      setLocation(position);
      setPlaceSelect(position);
      moveTo(position);
    })();
  }, []);

  useEffect(() => {
    if (output.routes) {
      setRoutes(output.routes.filter((item) => item.vehicle == VEHICLEID)[0]);
    }
  }, [output]);

  useEffect(() => {
    if (routes && routes.steps?.length) {
      setNext({
        latitude: routes.steps[0].location[1] || 0,
        longitude: routes.steps[0].location[0] || 0,
      });
    }
    console.log(test);
  }, [routes]);

  const getDataRoute = ()=>{
    return axios({
        method: "get",
        url: `${BASE_URL}/getRoute?point=[${placeSelect.latitude},${placeSelect.longitude}]&point=[${next.latitude},${next.longitude}]&vehicle=car`,
    })
    
  }

  useEffect(()=>{
    if(placeSelect && next){
        getDataRoute().then((response) => {
            const newVal=response?.data?.coordinates?.map((item) => {
                const pos = {
                    latitude: item[1] || 0,
                    longitude: item[0] || 0,
                };
                return pos;
            });
            setTest(newVal.slice(0,12));
        })
        .catch((err) => {
            console.log(err);
            const newVal=test_out?.coordinates?.map((item) => {
                const pos = {
                    latitude: item[1] || 0,
                    longitude: item[0] || 0,
                };
                return pos;
            });
            setTest(newVal.slice(0,12));
        });
    }
  },[placeSelect, next])

  const mapRef = useRef();

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  useEffect(() => {
    if (location && location.length) {
      const position = {
        latitude: location[1] || 0,
        longitude: location[0] || 0,
      };
      setPlaceSelect(position);
      moveTo(position);
    }
  }, [location]);
  //   console.log(OUTPUT);
  return (
    <Layout>
      <TopNav
        backgroundColor="#A19CFF"
        borderColor="#A19CFF"
        middleContent="Map"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        leftAction={() => navigation.goBack()}
      />
      {loading ? (
        <Loading />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={
            location
              ? { ...location, ...DELTA }
              : { ...INIT_POSITION.coords, ...DELTA }
          }
        >
          {(placeSelect && test.length) && (
            <>
              {/* <MapViewDirections
                origin={placeSelect}
                destination={next}
                apikey={API_KEY} // insert your API Key here
                strokeWidth={4}
                strokeColor="#111111"
              /> */}
              <Marker coordinate={
                placeSelect
              } title="Your location" />
              <Marker coordinate={next} title="Next target" />
              <Polyline
                coordinates={test}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={["#7F0000"]}
                strokeWidth={6}
              />
            </>
          )}
        </MapView>
      )}
      <View style={styles.searchContainer}>
        <ScrollView
          style={{
            height: "35%",
            paddingTop: 10,
          }}
        >
          <Text
            style={{ alignSelf: "center", color: themeColor.white }}
            size="lg"
          >
            Package List
          </Text>

          <View
            style={{
              width: "100%",
              minHeight: 300,
              marginTop: 10,
              padding: 10,
              borderRadius: 20,
              backgroundColor: themeColor.white,
            }}
          >
            <Text size="md" fontWeight="bold">
              Packages
            </Text>
            <RouteList routes={routes} setLocation={setLocation} />
          </View>
          {/* <MapAutocomplete
            styles={styles}
            label={"Go to"}
            onPlaceSelect={(details) => {
              onPlaceSelect(details);
            }}
          />
          <Button
            onPress={() => navigation.navigate("Home")}
            text="Go to Home"
          /> */}
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "#A19CFF",
    borderColor: "#A19CFF",
    borderWidth: 2,
    marginTop: "auto",
    borderRadius: 20,
    zIndex: 1000,
  },
  textInput: {
    borderColor: "#888",
    borderWidth: 1,
  },
});
