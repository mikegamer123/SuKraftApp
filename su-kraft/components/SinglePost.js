import {Video} from "expo-av";
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import {Dimensions, TouchableWithoutFeedback, View} from "react-native";
import AvatarImage from "react-native-paper/src/components/Avatar/AvatarImage";
import {IconButton, Text} from "react-native-paper";

const SinglePost = forwardRef((props, parentRef) => {
    const ref = useRef(null);
    useImperativeHandle(parentRef, () => ({
        play,
        stop,
        unload
    }))

    useEffect(() => {
        return () => {
            unload();
        };
    }, []);

    const play = async () => {
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
        console.log("unload")
        if (ref.current == null) {
            return;
        }
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={async () => {
                const status = await ref.current.getStatusAsync();

                if (status?.isPlaying) {
                    console.log("STOP")
                    stop();
                } else {
                    console.log("PLAY")
                    play();
                }
            }}
            style={{position: 'relative'}}
        >
            <>
                <Video
                    ref={ref}
                    videoStyle={{height: Dimensions.get("window").height - 80}}
                    style={{height: Dimensions.get("window").height - 80}}
                    posterStyle={{height: Dimensions.get("window").height - 80}}
                    resizeMode="cover"
                    isLooping={true}
                    source={{
                        uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                    }}
                />
                <View style={{position: 'absolute', padding: 20, width: Dimensions.get("window").width, height: 200, backgroundColor: 'rgba(0,0,0,0.25)', right: 0, bottom: 0}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <AvatarImage size={40} source={require('../assets/People/Person1.png')} />
                            <Text style={{marginLeft: 10, color: "#fff"}} variant='titleLarge'>@username</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <IconButton
                                icon="heart"
                                size={22}
                                mode="contained-tonal"
                                onPress={() => console.log('Pressed')}
                            />
                            <IconButton
                                icon="comment"
                                size={22}
                                mode="contained-tonal"
                                onPress={() => console.log('Pressed')}
                            />
                        </View>
                    </View>
                    <View>
                        <Text numberOfLines={4} style={{color: '#fff'}} variant='bodyLarge'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consectetur eligendi facilis id iure labore numquam saepe temporibus! Accusantium aliquam aliquid animi beatae debitis dignissimos doloribus ducimus ea eaque earum eveniet excepturi id iste iusto modi neque nihil nobis non nulla numquam odio perferendis perspiciatis porro, quaerat quam qui quia, sed similique sit soluta tempora tempore temporibus ut veritatis, vitae voluptate voluptatem? Consequuntur laudantium mollitia quia quo sed sint sit.</Text>
                    </View>
                </View>
            </>
        </TouchableWithoutFeedback>
    )
})

export default SinglePost;