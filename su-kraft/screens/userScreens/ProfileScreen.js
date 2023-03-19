import ScreenBackground from "../../components/ScreenBackground";
import {Avatar, Button, Card, Snackbar, TextInput} from "react-native-paper";
import {useContext, useState} from "react";
import {Dimensions, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../App";
import {UserContext} from "../../contexts/UserContext";
import {updateUser} from "../../fetch/users";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const authContext = useContext(AuthContext);
    const {user} = useContext(UserContext);
    const [data, setData] = useState({
        "firstName": user.firstName,
        "lastName": user.lastName,
    });

    const dataSetter = (field, value) => {
        setData(prevState => {
            return {...prevState, [field]: value};
        });
    }

    const handleSaveChanges = async () => {
        await updateUser({...user, ...data}).then(async r => {
            const res = await r.json();
            if (res && res?.[0].includes("updated successfully")) {
                await authContext.refreshUser();
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
            <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Card>
                    <Card.Title
                        title='Vaši podaci'
                        left={(props) => <Avatar.Icon {...props} icon="account"/>}
                    />
                    <Card.Content>
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
                            label="Email"
                            value={user.email}
                            onChangeText={text => dataSetter("email", text)}
                            keyboardType='email'
                            disabled
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                        <TextInput
                            label="Broj telefona"
                            value={user.phoneNo}
                            onChangeText={text => dataSetter("phoneNumber", text)}
                            keyboardType='numeric-pad'
                            disabled
                            mode='outlined'
                            style={{marginBottom: 10}}
                        />
                    </Card.Content>
                </Card>
                <View/>
                <View style={{marginBottom: 20, height: 140, justifyContent: 'space-around'}}>
                    <Button mode='contained' onPress={() => {
                        handleSaveChanges();
                    }}>Sačuvaj</Button>
                    <Button mode='contained-tonal' onPress={() => {
                        authContext.signOut();
                    }}>Odjavi se</Button>
                </View>
                <Snackbar
                    visible={false}
                    onDismiss={() => {
                    }}
                    action={{
                        label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    Hey there! I'm a Snackbar.
                </Snackbar>
            </View>
        </ScreenBackground>
    )
}

export default ProfileScreen;