import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Drawer} from "react-native-paper";
import useTheme from "../hooks/useTheme";
import {large, useBreakpoint} from "../hooks/useBreakpoint";
import {Dimensions, Text} from "react-native";
import {useContext} from "react";
import {AuthContext} from "../App";
import AvatarIcon from "react-native-paper/src/components/Avatar/AvatarIcon";
import {UserContext} from "../contexts/UserContext";


const CustomNavigationDrawer = ({theme, ...navProps}) => {
    const authContext = useContext(AuthContext);
    const {user} = useContext(UserContext);
    const {state, navigation} = navProps;
    const theme2 = useTheme();
    const breakpoint = useBreakpoint();

    const isActive = (index) => {
        return index === state.index
    };
    const baseStyle = {flex: 1, backgroundColor: theme2.colors.background}

    let itemStyle;

    if (breakpoint === large) {
        itemStyle = {
            textAlign: 'right',
            padding: 10,
            alignItems: 'center',
            paddingLeft: 50,
        }
    } else {
        itemStyle = {
            textAlign: 'right',
            padding: 10,
        }
    }

    return (
        <DrawerContentScrollView {...navProps} style={baseStyle}>
            {
                user?.firstName &&
                <Drawer.Item
                    label={breakpoint === large ? user?.firstName + " " + user?.lastName : ""}
                    accessibilityLabel="Profil"
                    active={false}
                    onPress={() => {
                        navigation.navigate("Profile", {screen: "ProfileScreen"})
                    }}
                    right={() => {
                        if (breakpoint === large) {
                            return <Text></Text>
                        }
                        return (
                            <>
                                <Text style={{fontSize: 16, color: theme2.colors.onBackground}}>{user?.firstName + " " + user?.lastName}</Text>
                            </>
                        )
                    }}
                    style={itemStyle}
                />
            }
            {
                state.routes.map((route, index) => {
                    return (
                        <Drawer.Item
                            label={breakpoint === large ? route.name : ""}
                            key={route.key}
                            accessibilityLabel={route.name}
                            active={isActive(index)}
                            onPress={() => {
                                navigation.navigate(route.name)
                            }}
                            right={() => {
                                if (breakpoint === large) {
                                    return <Text></Text>
                                }
                                return <Text
                                    style={{fontSize: 16, color: theme2.colors.onBackground}}>{route.name}</Text>
                            }}
                            style={itemStyle}
                        />
                    )
                })
            }
            <Drawer.Item
                label={breakpoint === large ? "Odjavi se" : ""}
                accessibilityLabel="Odjavi se"
                active={false}
                onPress={() => {
                    authContext.signOut();
                }}
                right={() => {
                    if (breakpoint === large) {
                        return <Text></Text>
                    }
                    return (
                        <>
                            <Text style={{fontSize: 16, color: theme2.colors.onBackground}}>Odjavi se</Text>
                            <AvatarIcon icon="logout" size={40} style={{marginLeft: 10}} />
                        </>
                    )
                }}
                style={{...itemStyle, marginTop: Dimensions.get("window").height - state.routes.length * 100 - 100}}
            />
        </DrawerContentScrollView>
    )
}

export default CustomNavigationDrawer;