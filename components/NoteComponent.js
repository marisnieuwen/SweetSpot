import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { ThemeContext } from "../contexts/ThemeContext";

const NoteComponent = ({ modalVisible, handleClose, handleSubmit }) => {
  const { theme } = useContext(ThemeContext); // ThemeContext is used for managing dark/light mode
  const [note, setNote] = useState(""); // State for storing the user's note input

  // Function to submit the note and reset the note input field
  const handleModalSubmit = () => {
    handleSubmit(note);
    setNote("");
  };

  // Stylesheet in the component, so theme can be accessed
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.notecolor,
      borderRadius: 20,
      padding: 50,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      color: theme.textcolor,
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 17,
    },
    modalSubText: {
      color: theme.textcolor,
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "normal",
      fontSize: 14,
    },
    modalInput: {
      height: 50,
      width: 250,
      margin: 12,
      backgroundColor: theme.textInputBackground,
      color: theme.textcolor,
      borderRadius: 5,
      padding: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    button: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: theme.mainblue,
      margin: 8,
    },
    submitButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: theme.pink,
      margin: 8,
    },
    text: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "#222A33",
      textAlign: "center",
    },
  });

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Sprinkle Your Thoughts!</Text>
          <Text style={styles.modalSubText}>And add to your Favorites</Text>
          <TextInput
            style={styles.modalInput}
            onChangeText={(text) => setNote(text)}
            value={note}
            placeholder="Sprinkle here.."
            placeholderTextColor={theme.placeholderColor}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleClose}>
              <Text style={styles.text}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleModalSubmit}
            >
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NoteComponent;
