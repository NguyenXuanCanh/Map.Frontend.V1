import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, themeColor, useTheme } from "react-native-rapi-ui";
import { Col, Row } from "./Flex";

export default function RouteList() {
  const { isDarkmode } = useTheme();

  return (
    <View>
      <View style={styles.package}>
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
                color={isDarkmode ? themeColor.white100 : themeColor.black100}
              />
            </View>
          </Col>
          <Col numRows={9}>
            <View style={{ padding: 5 }}>
              <Row>
                <Col numRows={7}>
                  <Text size="sm" fontWeight="bold">
                    Arriving today
                  </Text>
                </Col>
                <Col numRows={5}>
                  <Text size="sm" style={{ color: themeColor.gray }}>
                    Today, 11:30
                  </Text>
                </Col>
              </Row>
              <Text size="sm" style={{ color: themeColor.gray }}>
                This package will be shipped today
              </Text>
            </View>
          </Col>
        </Row>
      </View>
      <View style={styles.packageActive}>
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
                color={isDarkmode ? themeColor.white100 : themeColor.black100}
              />
            </View>
          </Col>
          <Col numRows={9}>
            <View style={{ padding: 5 }}>
              <Row>
                <Col numRows={7}>
                  <Text size="sm" fontWeight="bold">
                    Arriving today
                  </Text>
                </Col>
                <Col numRows={5}>
                  <Text size="sm" style={{ color: themeColor.gray }}>
                    Today, 11:30
                  </Text>
                </Col>
              </Row>
              <Text size="sm" style={{ color: themeColor.gray }}>
                This package will be shipped today
              </Text>
            </View>
          </Col>
        </Row>
      </View>
      <View style={styles.package}>
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
                color={isDarkmode ? themeColor.white100 : themeColor.black100}
              />
            </View>
          </Col>
          <Col numRows={9}>
            <View style={{ padding: 5 }}>
              <Row>
                <Col numRows={7}>
                  <Text size="sm" fontWeight="bold">
                    Arriving today
                  </Text>
                </Col>
                <Col numRows={5}>
                  <Text size="sm" style={{ color: themeColor.gray }}>
                    Today, 11:30
                  </Text>
                </Col>
              </Row>
              <Text size="sm" style={{ color: themeColor.gray }}>
                This package will be shipped today
              </Text>
            </View>
          </Col>
        </Row>
      </View>
      <View style={styles.package}>
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
                color={isDarkmode ? themeColor.white100 : themeColor.black100}
              />
            </View>
          </Col>
          <Col numRows={9}>
            <View style={{ padding: 5 }}>
              <Row>
                <Col numRows={7}>
                  <Text size="sm" fontWeight="bold">
                    Arriving today
                  </Text>
                </Col>
                <Col numRows={5}>
                  <Text size="sm" style={{ color: themeColor.gray }}>
                    Today, 11:30
                  </Text>
                </Col>
              </Row>
              <Text size="sm" style={{ color: themeColor.gray }}>
                This package will be shipped today
              </Text>
            </View>
          </Col>
        </Row>
      </View>
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
