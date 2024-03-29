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
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import RouteList from "../../components/RouteList";
import { BASE_URL, DEFAULT_STORE_LOCATION } from "../../config/constants";
import axios from "axios";
import Loading from "../utils/Loading";
import { stringToGETJSON } from "../../libs/StringToJSON";
import iconCube from "../../../assets/cube-outline.png";
import iconTruck from "../../../assets/truck.png";
import iconStore from "../../../assets/storefront-outline.png";
import { getAuth } from "firebase/auth";
import { Col, Row } from "../../components/Flex";
import Modal from "react-native-modal";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
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
  const [location, setLocation] = useState(null);
  const [packageList, setPackageList] = useState();
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState();
  const [step, setStep] = useState(-1); // skip start as defaut
  const [packageActive, setPackageActive] = useState();
  const [thisRoute, setThisRoute] = useState([]);
  const [thisPolylineList, setThisPolylineList] = useState([]);
  const [thisPolyline, setThisPolyline] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    setLoading(true);
    (async () => {
      async function fetchData() {
        const response = await axios.get(
          `${BASE_URL}/trip/${auth.currentUser.uid}`
        );
        return response;
      }
      fetchData()
        .then((response) => {
          setStep(response.data.data.steps);
          setPackageList(response.data.data.trip_data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      if (thisPolyline?.length && step < routes.length)
        setThisPolyline((thisPolyline) => thisPolyline?.slice(1));
    }, 1000);

    return () => clearInterval(intervalId); //This is important
  }, [thisPolylineList]);

  useEffect(() => {
    if (packageList && packageList?.routes) {
      setRoutes(packageList.routes);

      //   pass array location to this
      getDataRoute(packageList.routes);

      const position = {
        latitude: packageList.routes[0].location[1] || 0,
        longitude: packageList.routes[0].location[0] || 0,
      };
      setLoading(false);
      setLocation(position);
      //   setPlaceSelect(position);
      moveTo(position);
    }
  }, [packageList]);

  useEffect(() => {
    if (routes && routes?.length) {
      //   setNext({
      //     latitude: routes[step].location[1] || 0,
      //     longitude: routes[step].location[0] || 0,
      //   });
      if (routes[step]) setPackageActive(routes[step].id);
    }
  }, [routes]);

  const getDataRoute = async (localRoute) => {
    localRoute.push(localRoute[0]);
    for (let index = 0; index < localRoute.length; index++) {
      axios({
        method: "get",
        url: `https://rsapi.goong.io/Direction?origin=${
          localRoute[index].location[1]
        },${localRoute[index].location[0]}&destination=${
          localRoute[index + 1].location[1]
        },${
          localRoute[index + 1].location[0]
        }&vehicle=car&api_key=rvWoa97j8PhzM5VUA0cr1IGNNNm5X81HoIN8GET6`,
      })
        .then((res) => {
          const newVal = stringToGETJSON(
            res.data.routes[0].overview_polyline.points
          )?.coordinates?.map((item) => {
            const pos = {
              latitude: item[1] || 0,
              longitude: item[0] || 0,
            };
            return pos;
          });
          setThisPolylineList((thisPolylineList) => [
            ...thisPolylineList,
            newVal,
          ]);
          setThisRoute((thisRoute) => thisRoute.concat(newVal));
        })
        .catch((err) => {
          console.log(err);
        });
      if (!localRoute[index + 1].id) break;
    }
  };

  useEffect(() => {
    if (location && location.length) {
      const position = {
        latitude: location[1] || 0,
        longitude: location[0] || 0,
      };
      moveTo(position);
    }
  }, [location]);

  useEffect(() => {
    setThisPolyline(thisPolylineList[step - 1]);
    console.log(step);
  }, [step, thisPolylineList]);

  useEffect(() => {
    if (!thisPolyline?.length) {
      toNextStep();
    }
  }, [thisPolyline]);

  const toNextStep = () => {
    const nextStep = step + 1;
    if (routes) {
      if (step < routes.length && routes[step])
        insertToHistory(routes[step].id);
      if (routes[nextStep]?.id) {
        const postData = {
          account_id: auth.currentUser.uid,
          steps: nextStep,
        };
        axios({
          method: "post",
          url: `${BASE_URL}/update_steps_trip`,
          data: postData,
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setPackageActive(routes[nextStep].id);
      } else if (routes[nextStep] === undefined) {
        setVisible(true);
        // if (nextStep > 1) setVisible(true);
      }
    }
    setStep(nextStep);
  };

  const insertToHistory = (package_id) => {
    const submitData = {
      account_id: auth.currentUser.uid,
      package_id: package_id,
      date: new Date(),
    };
    axios
      .post(`${BASE_URL}/history_add`, submitData)
      .then((res) => {
        // console.log(res);
        setDisable(package_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setDisable = (package_id) => {
    setRoutes(
      routes.map((item) => {
        if (item.id != package_id) {
          return item;
        } else {
          return { ...item, status: "success" };
        }
      })
    );
  };

  const mapRef = useRef();

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 500 });
    }
  };

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
          <Polyline
            coordinates={thisRoute}
            strokeColor="#808080"
            strokeWidth={4}
          />
          {thisPolyline?.length ? (
            <Marker coordinate={thisPolyline[0]} title="index">
              <Image source={iconTruck} style={{ height: 30, width: 30 }} />
            </Marker>
          ) : null}
          <Polyline
            coordinates={thisPolyline ? thisPolyline : null}
            strokeColor="#469af7"
            strokeWidth={6}
            style={{ zIndex: 10 }}
          />
          {routes?.map((item, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: item.location[1] || 0,
                  longitude: item.location[0] || 0,
                }}
                title="index"
                key={index}
              >
                <Image
                  source={item?.id ? iconCube : iconStore}
                  style={{ height: 20, width: 20 }}
                />
              </Marker>
            );
          })}
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
              Next locations
            </Text>
            <RouteList
              routes={routes}
              step={step}
              //   setLocation={setNext}
              packageActive={packageActive}
              setPackageActive={setPackageActive}
            />
          </View>
        </ScrollView>
      </View>
      <Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
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
            Congratulation
          </Text>
          <Text
            style={{ marginBottom: 10, marginTop: 10, textAlign: "center" }}
          >
            Your trip's done
          </Text>
          <Row style={{ marginTop: "auto" }}>
            <Col numRows={10}>
              <Button
                text="Back to home"
                status="primary"
                onPress={() => navigation.navigate("Home")}
                size="md"
                style={{ height: 40 }}
                outline
              />
            </Col>
          </Row>
        </View>
      </Modal>
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
