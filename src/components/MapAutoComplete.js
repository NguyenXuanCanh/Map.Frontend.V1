import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native";
import { Text } from "react-native-rapi-ui";
import { API_KEY } from "../config/constants";

export default function MapAutocomplete(props) {
  const { styles, onPlaceSelect } = props;

  return (
    <GooglePlacesAutocomplete
      styles={{ textInput: styles.textInput }}
      placeholder="Search"
      fetchDetails={true}
      onFail={(error) => console.log(error)}
      onNotFound={() => console.log("no results")}
      listEmptyComponent={() => (
        <View style={{ flex: 1 }}>
          <Text>No results were found</Text>
        </View>
      )}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        onPlaceSelect(details);
      }}
      query={{
        key: API_KEY,
        language: "en",
      }}
    />
  );
}