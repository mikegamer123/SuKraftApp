import ScreenBackground from "../../components/ScreenBackground";
import {Button, Card, Divider, Snackbar, Text, TextInput} from "react-native-paper";
import {useState} from "react";
import {Dimensions, Image, View} from "react-native";
import {registerUser} from "../../fetch/auth";
import {useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const RegistrationScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({
        "firstName": "",
        "lastName": "",
        "phoneNumber": "",
        "email": "",
        "password": "",
        "confirmPassword": "",
        "username": ""
    });
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [snackbarObj, setSnackbarObj] = useState({visible: false, message: ""});

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const registerHandler = async () => {
        await registerUser(data).then(async r => {
            if (r.status < 500) {
                // console.log("AAAAA", await r.text())
                const res = await r.json();
                if (r.status === 200) {
                    setSnackbarObj({visible: true, message: res.email?.toString()})
                }
                if (r.status === 400) {
                    setSnackbarObj({visible: true, message: res.email?.toString()})
                }
            } else {
                setSnackbarObj({visible: true, message: "Uspešno ste se registrovali."})
            }
        })
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
            <KeyboardAwareScrollView style={{flex: 1}}>
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
                                label="Ime"
                                value={data.firstName}
                                onChangeText={text => dataSetter("firstName", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Prezime"
                                value={data.lastName}
                                onChangeText={text => dataSetter("lastName", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Korisničko ime"
                                value={data.username}
                                onChangeText={text => dataSetter("username", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Email"
                                value={data.email}
                                onChangeText={text => dataSetter("email", text)}
                                keyboardType='email'
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Broj telefona"
                                value={data.phoneNumber}
                                onChangeText={text => dataSetter("phoneNumber", text)}
                                keyboardType='phone-pad'
                                mode='outlined'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                label="Lozinka"
                                value={data.password}
                                onChangeText={text => dataSetter("password", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                                secureTextEntry={!passwordVisible}
                                right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => {
                                    setPasswordVisible(!passwordVisible)
                                }}/>}
                            />
                            <TextInput
                                label="Potvrdi lozinku"
                                value={data.confirmPassword}
                                onChangeText={text => dataSetter("confirmPassword", text)}
                                mode='outlined'
                                style={{marginBottom: 10}}
                                secureTextEntry={!confirmVisible}
                                right={<TextInput.Icon icon={confirmVisible ? "eye-off" : "eye"} onPress={() => {
                                    setConfirmVisible(!confirmVisible)
                                }}/>}
                            />
                        </Card.Content>
                    </Card>
                    <View/>
                    <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                        <Button mode='contained' onPress={registerHandler}>Potvrdi</Button>
                        <Divider/>
                        <Text variant="titleMedium" style={{textAlign: 'center'}}>Već imaš nalog?</Text>
                        <Button mode='outlined' onPress={() => navigation.navigate("LoginScreen")}>Ulogujte
                            se</Button>
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
            </KeyboardAwareScrollView>
        </ScreenBackground>
    )
}

export default RegistrationScreen;