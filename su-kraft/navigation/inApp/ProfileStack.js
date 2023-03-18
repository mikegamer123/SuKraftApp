import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import ProfileScreen from "../../screens/userScreens/ProfileScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="ProfileScreen"
            screenOptions={{
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{title: "Profile"}}
            />
        </Stack.Navigator>
    )
}

export default ProfileStack;