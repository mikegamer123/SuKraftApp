import {NavigationContainer} from "@react-navigation/native";
import CustomNavigationDrawer from "../../components/CustomNavigationDrawer";
import WelcomeScreen from "../../screens/preLoginScreens/WelcomeScreen";
import LoginScreen from "../../screens/preLoginScreens/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import RegistrationScreen from "../../screens/preLoginScreens/RegistrationScreen";
import ForgotPasswordScreen from "../../screens/preLoginScreens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return(
            <Stack.Navigator
                initialRouteName="Welcome Screen"
                screenOptions={{
                    header: props => <CustomNavigationBar hideHamburger showBack={true} {...props} />
                }}
            >
                <Stack.Screen
                    name='WelcomeScreen'
                    component={WelcomeScreen}
                    options={{title: "Dobrodošli"}}
                />
                <Stack.Screen
                    name='LoginScreen'
                    component={LoginScreen}
                    options={{title: "Prijava"}}
                />
                <Stack.Screen
                    name='RegistrationScreen'
                    component={RegistrationScreen}
                    options={{title: "Registracija"}}
                />
                <Stack.Screen
                    name='ForgotPasswordScreen'
                    component={ForgotPasswordScreen}
                    options={{title: "Reset lozinke"}}
                />
            </Stack.Navigator>
    )
}

export default LoginStack;