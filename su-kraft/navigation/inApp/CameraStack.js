import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import HomeScreen from "../../screens/userScreens/HomeScreen";
import CameraScreen from "../../screens/userScreens/CameraScreen";

const Stack = createNativeStackNavigator();

const CameraStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="CameraScreen"
            screenOptions={{
                headerShown: false,
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='CameraScreen'
                component={CameraScreen}
                options={{title: "Home"}}
            />
        </Stack.Navigator>
    )
}

export default CameraStack;