import { StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";
import { fontFamilies } from "../constants/fontFamilies";

export const verificationStyles = StyleSheet.create({
    input: {
        height: 55,
        width: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: appColors.gray2,
        color: appColors.text,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        fontFamily: fontFamilies.bold,
        textAlign: 'center'
    }
})