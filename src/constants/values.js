import { Dimensions } from "react-native"

export const GAP = {
    VERYSMALL: 5,
    SMALL: 10,
    MEDIUM: 20,
    LARGE: 20
}

export const FONTFAMILY = {
    ROCHREGULAR: "Rochester-Regular",
    ROBOTOREGULAR: "Roboto-Regular",
    ROBOTOBOLD: "Roboto-Bold",
    ROBOTOLIGHT: "Roboto-Light",
    ROBOTOMEDIUM: "Roboto-Medium",
    ROBOTOTHIN: "Roboto-Thin",
    ROBOTOBLACK: "Roboto-Black",
}

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen')

export const COMMONSTYLES = {
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
}