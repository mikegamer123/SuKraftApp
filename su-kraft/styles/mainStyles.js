import {Dimensions, StyleSheet} from "react-native";


export const s = StyleSheet.create({
    twoColumnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeRow: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10
    },
    homeCard: {
        width: Dimensions.get("window").width * 0.45,
        aspectRatio: 1
    }
});