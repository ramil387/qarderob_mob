import { StyleSheet } from "react-native";
import { NunitoBold, f5Color, inactiveColor } from "../variables";

export const notFoundStyle = StyleSheet.create({
    notFoundContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    notFoundCircle: {
        padding: 16,
        borderRadius: 100,
        backgroundColor: f5Color,
        width: 92,
        height: 92,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    notFoundText: {
        marginTop: 16,
        fontSize: 16,
        fontFamily: NunitoBold,
        color: inactiveColor,
    },
});