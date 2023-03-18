import {Dimensions, View} from "react-native";
import {Button, Divider, Text} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";

const WelcomeScreen = (props) => {
    const navigation = useNavigation();

    return (
        <ScreenBackground image={require('../../assets/SuboticaLepo.jpg')}>
            <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 10}}>
                <View
                    style={{
                        position: 'absolute',
                        left: -100,
                        top: -100,
                        width: Dimensions.get("window").width * 2,
                        height: Dimensions.get("window").height * 2,
                        backgroundColor: "rgba(0,0,0,0.57)"
                    }}
                />
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text variant="displayLarge"
                          style={{textAlign: 'left', marginBottom: 30, color: "#fff"}}>SuKraft</Text>
                    <Text variant="headlineSmall" style={{textAlign: 'left', color: "#fff"}}>Uživaj u predivnim
                        proizvodima Subotičkih
                        zanatlija.</Text>
                    <View/>
                </View>
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained'
                            icon="arrow-right"
                            contentStyle={{flexDirection: 'row-reverse'}}
                            onPress={() => navigation.navigate("Login", {screen: "LoginScreen"})}
                    >
                        Prijavi se
                    </Button>
                    <Divider/>
                    <Text variant="titleMedium" style={{textAlign: 'center', color: "#fff"}}>Nemaš nalog?</Text>
                    <Button mode='elevated' style={{color: "#fff"}}
                            icon="arrow-right"
                            contentStyle={{flexDirection: 'row-reverse'}}
                            onPress={() => navigation.navigate("Login", {screen: "RegistrationScreen"})}>Registruj
                        se</Button>
                </View>
            </View>
        </ScreenBackground>
    )
}

export default WelcomeScreen