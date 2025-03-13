import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary100,
  },
});
