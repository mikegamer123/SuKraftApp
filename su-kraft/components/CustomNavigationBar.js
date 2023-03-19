import {Appbar, Text} from "react-native-paper";
import {medium, useBreakpoint} from "../hooks/useBreakpoint";
import {isBig} from "../hooks/isBig";
import {Image, Platform, View} from "react-native";

const CustomNavigationBar = ({options, navigation, back, hideHamburger, showBack}) => {
    const breakpoint = useBreakpoint();

    return (
        <Appbar.Header mode="center-aligned">
            {
                (back || showBack) &&
                <Appbar.BackAction
                    onPress={navigation.goBack}
                    accessibilityLabel="Back"
                />
            }
            <Appbar.Content title={typeof options?.title === 'string' ?
                <View style={{alignItems: 'center'}}>
                    <Text variant="titleLarge">{options.title}</Text>
                </View>
                :
                ""
            } />
        </Appbar.Header>
    )
}

export default CustomNavigationBar;