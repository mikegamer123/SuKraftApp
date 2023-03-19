import {Dimensions, Image, View} from "react-native";
import ScreenBackground from "../../components/ScreenBackground";
import {Video} from "expo-av";
import {Button, Card, TextInput} from "react-native-paper";
import {useContext, useState} from "react";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createPost} from "../../fetch/posts";
import {uploadVideo} from "../../fetch/media";
import {UserContext} from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

const SavePostScreen = (props) => {
    const source = props.route.params.source;
    const {user} = useContext(UserContext);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const createPostHandler = async () => {
        console.log("START");
        setLoading(true);
        try {
            const sellerId = await AsyncStorage.getItem("sellerId");
            await createPost({
                sellerID: sellerId,
                description: description
            }).then(async r => {
                if (r.status === 201){
                    const res = await r.json();
                    if (res.id){
                        await uploadVideo(res.id, source).then(async r2 => {
                            if (r2.status === 201) {
                                const res2 = await r2.json();
                                console.log(res2);
                                setLoading(false);
                                navigation.navigate("Home");
                            } else {
                                console.log(r2.status);
                            }
                        })
                    }
                } else {
                    console.log(r.status)
                }
            })
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ScreenBackground>
            <KeyboardAwareScrollView style={{flex: 1}}>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                    <Video
                        source={{uri: source}}
                        shouldPlay
                        videoStyle={{width: Dimensions.get("window").width * 0.6, aspectRatio: 9 / 16}}
                        style={{width: Dimensions.get("window").width * 0.6, aspectRatio: 9 / 16}}
                        posterStyle={{width: Dimensions.get("window").width * 0.6, aspectRatio: 9 / 16}}
                        useNativeControls
                    />
                </View>
                <Card style={{marginVertical: 20}}>
                    <Card.Content>
                        <TextInput
                            label="Opis"
                            value={description}
                            onChangeText={text => setDescription(text)}
                            mode='outlined'
                            multiline
                            style={{marginBottom: 10}}
                        />
                    </Card.Content>
                </Card>
                <Button mode='contained' style={{marginBottom: 10}} onPress={() => {
                    createPostHandler()
                }}>Post</Button>
            </KeyboardAwareScrollView>
        </ScreenBackground>
    )
}

export default SavePostScreen;