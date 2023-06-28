import { StyleSheet } from "react-native";

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingBottom: 75,
    },
    flatList: {
      marginTop: 10,
    },
    card: {
      backgroundColor: theme.card,
      margin: 5,
      marginHorizontal: 25,
      padding: 12,
      borderRadius: 10,
      flexWrap: "wrap",
    },
    text: {
      color: theme.textcolor,
      fontSize: 16,
    },
    addresstext: {
      fontSize: 12,
      color: theme.textcolor,
    },
    noteContainer: {
      marginTop: 10,
    },
    notetitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.textcolor,
    },
    notetext: {
      fontSize: 12,
      color: theme.textcolor,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 28,
      height: 28,
      marginRight: 10,
    },
    icon: {
      color: theme.pink,
      fontSize: 32,
    },
  });

export default styles;
