import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text, themeColor, useTheme } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";

export default function RouteList(props) {
  const { steps, setLocation, packageActive, setPackageActive } = props;
  const { isDarkmode } = useTheme();
  //   console.log(packageActive);
  //   console.log(steps);
  return (
    <>
      {steps?.map((item, index) => {
        const isActive = item.id == packageActive;
        // console.log(item);
        // console.log(isActive);
        return (
          <>
            {item.status == "success" ? (
              <View key={index} style={styles.viewDisable}>
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
                            style={{
                              color: themeColor.gray,
                              textAlign: "right",
                            }}
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
              </View>
            ) : (
              <View
                key={index}
                style={isActive ? styles.packageActive : styles.package}
                onPress={() => {
                  //   setPackageActive(item.id);
                  //   setLocation({
                  //     latitude: item.location[1] || 0,
                  //     longitude: item.location[0] || 0,
                  //   });
                }}
              >
                {item.id != 0 ? (
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
                            isDarkmode
                              ? themeColor.white100
                              : themeColor.black100
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
                              style={{
                                color: themeColor.gray,
                                textAlign: "right",
                              }}
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
                ) : (
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
                            isDarkmode
                              ? themeColor.white100
                              : themeColor.black100
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
                              style={{
                                color: themeColor.gray,
                                textAlign: "right",
                              }}
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
                )}
              </View>
            )}
          </>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  package: {
    marginTop: 15,
    padding: 5,
    borderRadius: 8,
  },
  packageActive: {
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
  viewDisable: {
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
    borderRadius: 8,
    borderColor: themeColor.success500,
    borderLeftWidth: 1.5,
    borderTopWidth: 1.5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    // backgroundColor: themeColor.success100,
  },
});
