import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "../../components/CustomNavigationBar";
import SearchScreen from "../../screens/userScreens/SearchScreen";

const Stack = createNativeStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SearchScreen"
            screenOptions={{
                headerShown: false,
                header: props => <CustomNavigationBar {...props} />
            }}
        >
            <Stack.Screen
                name='SearchScreen'
                component={SearchScreen}
                options={{title: "Pretraga"}}
            />
        </Stack.Navigator>
    )
}

export default SearchStack;