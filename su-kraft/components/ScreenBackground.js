import {withTheme} from "react-native-paper";
import {ImageBackground, Platform, StatusBar, View} from "react-native";

const ScreenBackground = ({theme, style, children, image}) => {
    const baseStyle = {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: '4%',
    }

    if (image) {
        return (
            <ImageBackground
                source={image}
                style={{...baseStyle, ...style}}
            >
                {children}
            </ImageBackground>
        )
    }
    return (
        <View
            style={{...baseStyle, ...style}}
        >
            {children}
        </View>
    )
}

export default withTheme(ScreenBackground);