import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "#00a8a8",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
    },
    option: {
        paddingVertical: 12,
    },
    optionText: {
        fontSize: 16,
    },
    cancelText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});