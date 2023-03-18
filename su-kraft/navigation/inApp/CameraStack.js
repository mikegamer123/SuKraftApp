import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import CameraScreen from "../../screens/userScreens/CameraScreen";
import SavePostScreen from "../../screens/userScreens/SavePostScreen";

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
            <Stack.Screen
                name='SavePostScreen'
                component={SavePostScreen}
                options={{title: "SavePostScreen"}}
            />
        </Stack.Navigator>
    )
}

export default CameraStack;