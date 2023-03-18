import {Dimensions, Image, View} from "react-native";
import ScreenBackground from "../../components/ScreenBackground";
import {Video} from "expo-av";
import {Button, Card, TextInput} from "react-native-paper";
import {useState} from "react";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createPost} from "../../fetch/posts";
import {uploadVideo} from "../../fetch/media";

const SavePostScreen = (props) => {
    const source = props.route.params.source;
    const [description, setDescription] = useState("");

    const createPostHandler = async () => {
        try {
            await createPost({
                sellerID: 1,
                description: "Hello world"
            }).then(async r => {
                if (r.status === 201){
                    const res = await r.json();
                    if (res.id){
                        // console.log(res.id);
                        await uploadVideo(17, source).then(async r2 => {
                            if (r2.status === 201) {
                                const res2 = await r2.json();
                                console.log(res2);
                            } else {
                                console.log(r2.status);
                            };
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