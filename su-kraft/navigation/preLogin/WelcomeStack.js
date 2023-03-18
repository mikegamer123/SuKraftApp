import WelcomeScreen from "../../screens/preLoginScreens/WelcomeScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
                headerShown: false,
                header: props => <CustomNavigationBar hideHamburger {...props} />
            }}
        >
            <Stack.Screen
                name='WelcomeScreen'
                component={WelcomeScreen}
                options={{title: "Dobrodošli"}}
            />
        </Stack.Navigator>
    )
}

export default WelcomeStack;