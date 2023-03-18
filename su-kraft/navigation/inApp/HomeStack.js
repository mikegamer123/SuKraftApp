import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import HomeScreen from "../../screens/userScreens/HomeScreen";

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false,
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{title: "Home"}}
            />
        </Stack.Navigator>
    )
}

export default WelcomeStack;