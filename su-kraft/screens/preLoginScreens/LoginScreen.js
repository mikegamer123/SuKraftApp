import ScreenBackground from "../../components/ScreenBackground";
import {Avatar, Button, Card, Divider, Snackbar, Text, TextInput} from "react-native-paper";
import {useContext, useState} from "react";
import {Dimensions, Image, View} from "react-native";
import {loginUser, registerUser} from "../../fetch/auth";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../App";
import {getUserAgent} from "../../hooks/getUserAgent";

const LoginScreen = () => {
    const authContext = useContext(AuthContext);
    const navigation = useNavigation();
    const [data, setData] = useState({
        "email": "",
        "password": "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [snackbarObj, setSnackbarObj] = useState({visible: false, message: ""});

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const loginHandler = async () => {
        await loginUser({...data, "user_agent": getUserAgent()}).then(async r => {
            const status = await r.status;
            if (status === 200){
                const res = await r.json();
                if (res.access_token) {
                    if (res.user.userRole === 'seller'){
                        await AsyncStorage.setItem('sellerId', JSON.stringify(res?.user?.id));
                    }
                    await AsyncStorage.setItem('user', JSON.stringify(res?.user));
                    await AsyncStorage.setItem('userId', JSON.stringify(res?.user?.id));
                    await AsyncStorage.setItem('token', res?.access_token);
                    await authContext.signIn();
                }
            } else {
                if (status === 401){
                    const res = await r.json();
                    setSnackbarObj({visible: true, message: res.message})
                } else {
                    setSnackbarObj({visible: true, message: "Login neuspešan."})
                }
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
                        <TextInput
                            label="Lozinka"
                            value={data.password}
                            onChangeText={text => dataSetter("password", text)}
                            mode='outlined'
                            style={{marginBottom: 10}}
                            secureTextEntry={!passwordVisible}
                            right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => {setPasswordVisible(!passwordVisible)}} />}
                        />
                    </Card.Content>
                </Card>
                <View/>
                <View style={{marginBottom: 20, height: 200, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={loginHandler}>Potvrdi</Button>
                    <Button mode='outlined' onPress={() => {navigation.navigate("ForgotPasswordScreen")}}>Zaboravio sam lozinku</Button>
                    <Divider />
                    <Text variant="titleMedium" style={{textAlign: 'center', color: '#fff'}}>Nemaš nalog?</Text>
                    <Button mode='outlined' onPress={() => navigation.navigate("RegistrationScreen")}>Kreiraj nalog</Button>
                </View>
                <Snackbar
                    visible={snackbarObj.visible}
                    onDismiss={()=> {
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

export default LoginScreen;