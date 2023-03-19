import {Video, Audio} from "expo-av";
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import {Dimensions, Image, TouchableWithoutFeedback, View} from "react-native";
import AvatarImage from "react-native-paper/src/components/Avatar/AvatarImage";
import {IconButton, Text} from "react-native-paper";
import {getSellerById} from "../fetch/sellers";
import {useNavigation} from "@react-navigation/native";
import {environment} from "../enviroments/enviroment";

const {serverUrl}= environment;
const SinglePost = forwardRef((props, parentRef) => {
    const ref = useRef(null);
    useImperativeHandle(parentRef, () => ({
        play,
        stop,
        unload
    }))
    const navigation = useNavigation();

    useEffect(() => {
        load();
        return () => {
            unload();
        };
    }, []);

    const play = async () => {
        console.log("Play")

        if (ref.current == null) {
            return;
        }

        const status = await ref.current.getStatusAsync();

        if (status?.isPlaying) {
            return;
        }
        try {
            await ref.current.playAsync();
        } catch (e) {
            console.error(e)
        }
    }

    const stop = async () => {
        if (ref.current == null) {
            return;
        }

        const status = await ref.current.getStatusAsync();

        if (!status?.isPlaying) {
            return;
        }
        try {
            await ref.current.stopAsync();
        } catch (e) {
            console.error(e)
        }
    }

    const unload = async () => {
        if (ref.current == null) {
            return;
        }
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.error(e)
        }
    }

    const load = async () => {
        if (ref.current == null) {
            return;
        }
        try {
            // await ref.current.loadAsync({uri: props.url});
        } catch (e) {
            console.error(e)
        }
    }

    if (props.image){
        return (
            <TouchableWithoutFeedback
                onPress={async () => {

                }}
                style={{position: 'relative'}}
            >
                <View>
                    <Image
                        style={{height: Dimensions.get("window").height - 49}}
                        resizeMode="cover"
                        source={{
                            uri: props.url
                        }}
                    />
                    <View style={{position: 'absolute', padding: 20, width: Dimensions.get("window").width, height: 200, backgroundColor: 'rgba(0,0,0,0.25)', right: 0, bottom: 0}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <AvatarImage size={40} source={require('../assets/People/Person1.png')} />
                                <Text style={{marginLeft: 10, color: "#fff"}} variant='titleLarge'>@{props.username}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <IconButton
                                    icon="arrow-right"
                                    size={22}
                                    mode="contained-tonal"
                                    onPress={async () => {
                                        await getSellerById(props?.userId).then(async r => {
                                            const res = await r.json();
                                            console.log(res)
                                            navigation.navigate("SellerScreen", {seller: {...res, pfp: serverUrl + "/" + res?.imageSeller?.srcUrl}})
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        <View>
                            <Text numberOfLines={4} style={{color: '#fff'}} variant='bodyLarge'>{props.description}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <TouchableWithoutFeedback
            onPress={async () => {
                const status = await ref.current.getStatusAsync();

                if (status?.isPlaying) {
                    stop();
                } else {
                    play();
                }
            }}
            style={{position: 'relative'}}
        >
            <View>
                <Video
                    ref={ref}
                    videoStyle={{height: Dimensions.get("window").height - 49}}
                    style={{height: Dimensions.get("window").height - 49}}
                    posterStyle={{height: Dimensions.get("window").height - 49}}
                    resizeMode="cover"
                    isLooping={true}
                    source={{
                        uri: props.url
                    }}
                />
                <View style={{position: 'absolute', padding: 20, width: Dimensions.get("window").width, height: 200, backgroundColor: 'rgba(0,0,0,0.25)', right: 0, bottom: 0}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <AvatarImage size={40} source={require('../assets/People/Person1.png')} />
                            <Text style={{marginLeft: 10, color: "#fff"}} variant='titleLarge'>@{props.username}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <IconButton
                                icon="arrow-right"
                                size={22}
                                mode="contained-tonal"
                                onPress={async () => {
                                    await getSellerById(props?.userId).then(async r => {
                                        const res = await r.json();
                                        console.log(res)
                                        navigation.navigate("SellerScreen", {seller: {...res, pfp: serverUrl + "/" + res?.imageSeller?.srcUrl}})
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text numberOfLines={4} style={{color: '#fff'}} variant='bodyLarge'>{props.description}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
})

export default SinglePost;