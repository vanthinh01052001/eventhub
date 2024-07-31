import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

export const inputStyles = StyleSheet.create({
    inpuContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gay3,
        backgroundColor: appColors.white,
        width: '100%',
        minHeight: 56,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 19
    },
    textInput: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 14
    }
})