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
      color: theme.textcolor,
      fontSize: 12,
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
      color: theme.textcolor,
      fontSize: 32,
    },
    filledIcon: {
      color: theme.pink,
      fontSize: 32,
    },
    offlineText: {
      textAlign: "center",
      marginTop: "50%",
      fontSize: 18,
      color: theme.textcolor,
    },
    offlineContainer: {
      flex: 1,
      alignSelf: "center",
      width: "80%",
    },
  });

export default styles;
