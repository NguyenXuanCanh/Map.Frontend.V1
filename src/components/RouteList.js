import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, themeColor, useTheme } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";

export default function RouteList(props) {
  const { routes, setLocation, packageActive, setPackageActive } = props;
  const { isDarkmode } = useTheme();
  //   console.log(packageActive);
  return (
    <View>
      {routes?.steps?.map((item, index) => {
        const isActive = item.id == packageActive;
        return (
          <TouchableOpacity
            key={index}
            style={isActive ? styles.packageActive : styles.package}
            onPress={() => {
              //   console.log(item.location);
              setPackageActive(item.id);
              setLocation({
                latitude: item.location[1] || 0,
                longitude: item.location[0] || 0,
              });
            }}
          >
            {item.type === "job" ? 
              <Row>
                <Col numRows={3}>
                  <View
                    style={{
                      borderColor: themeColor.gray200,
                      borderStyle: "dashed",
                      borderWidth: 1,
                      padding: 5,
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="cube"
                      size={60}
                      color={
                        isDarkmode ? themeColor.white100 : themeColor.black100
                      }
                    />
                  </View>
                </Col>
                <Col numRows={9}>
                  <View style={{ padding: 5 }}>
                    <Row>
                      <Col numRows={7}>
                        <Text size="sm" fontWeight="bold">
                          Package Id: {item.id}
                        </Text>
                      </Col>
                      <Col numRows={5}>
                        <Text
                          size="sm"
                          style={{ color: themeColor.gray, textAlign: "right" }}
                        >
                          {item.distance}m
                        </Text>
                      </Col>
                    </Row>
                    <Text size="sm" style={{ color: themeColor.gray }}>
                      {item.description}
                    </Text>
                  </View>
                </Col>
              </Row>
             : item.type === "start" ?
              <Row>
                <Col numRows={3}>
                  <View
                    style={{
                      borderColor: themeColor.gray200,
                      borderStyle: "dashed",
                      borderWidth: 1,
                      padding: 5,
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="cube"
                      size={60}
                      color={
                        isDarkmode ? themeColor.white100 : themeColor.black100
                      }
                    />
                  </View>
                </Col>
                <Col numRows={9}>
                  <View style={{ padding: 5 }}>
                    <Row>
                      <Col numRows={7}>
                        <Text size="sm" fontWeight="bold">
                          Store
                        </Text>
                      </Col>
                      <Col numRows={5}>
                        <Text
                          size="sm"
                          style={{ color: themeColor.gray, textAlign: "right" }}
                        >
                          {item.distance}m
                        </Text>
                      </Col>
                    </Row>
                    <Text size="sm" style={{ color: themeColor.gray }}>
                      {item.description}
                    </Text>
                  </View>
                </Col>
              </Row>
              : null
            }
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  package: {
    marginTop: 15,
    padding: 5,
    borderRadius: 8,
  },
  packageActive: {
    borderColor: themeColor.black,
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    borderRadius: 8,
    borderColor: "#A19CFF",
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: themeColor.primaryTransparent100,
  },
});
