import { Platform, StatusBar, StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

export const drawerCustomStyles = StyleSheet.create({
    container: {
        padding: 16,
        paddingVertical:StatusBar.currentHeight,
        flex: 1
    },
    avatar: {
        width: 52,
        height: 52,
        borderRadius:100,
        marginBottom: 12
    },
    listItems: {
        paddingVertical: 15,
        justifyContent: 'flex-start'
    },
    listItemsText:{
        paddingLeft: 12
    }
})