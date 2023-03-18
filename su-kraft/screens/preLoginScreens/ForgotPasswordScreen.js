import ScreenBackground from "../../components/ScreenBackground";
import {Avatar, Button, Card, Divider, Snackbar, Text, TextInput} from "react-native-paper";
import {useState} from "react";
import {Dimensions, Image, View} from "react-native";
import {resetPassword} from "../../fetch/auth";
import {useNavigation} from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({
        "email": "",
    });
    const [snackbarObj, setSnackbarObj] = useState({visible: false, message: ""});

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const resetHandler = async () => {
        try {
            await resetPassword(data.email).then(async r => {
                const res = await r.json();
                console.log("AAA", res);
            })
        } catch (e) {
            console.log(e);
        } finally {
            setSnackbarObj({visible: true, message: "Proverite vaš email za dalje instrukcije."})
        }
    }

    return (
        <ScreenBackground image={require('../../assets/SuboticaLepo.jpg')}>
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
            <View style={{flex: 1, justifyContent: 'space-between', paddingHorizontal: 10}}>
                <Card>
                    <Card.Content>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../../assets/TransparentLogo.png')}
                                style={{width: 200, height: 200}}
                            />
                        </View>
                        <TextInput
                            label="Email"
                            value={data.email}
                            onChangeText={text => dataSetter("email", text)}
                            keyboardType='email'
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                    </Card.Content>
                </Card>
                <View/>
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={resetHandler}>Potvrdi</Button>
                    <Divider/>
                    <Text variant="titleMedium" style={{textAlign: 'center'}}>Nemaš nalog?</Text>
                    <Button mode='outlined' onPress={() => navigation.navigate("RegistrationScreen")}>Kreiraj
                        nalog</Button>
                </View>
                <Snackbar
                    visible={snackbarObj.visible}
                    onDismiss={() => {
                        setSnackbarObj({visible: false, message: ""})
                    }}
                    action={{
                        label: 'U redu',
                        onPress: () => {
                            setSnackbarObj({visible: false, message: ""})
                        },
                    }}>
                    {snackbarObj?.message}
                </Snackbar>
            </View>
        </ScreenBackground>
    )
}

export default ForgotPasswordScreen;