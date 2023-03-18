import {Video} from "expo-av";
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";
import {Dimensions} from "react-native";

const SinglePost = forwardRef ((props, parentRef) => {
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
        if (ref.current == null){
            return;
        }

        const status = await ref.current.getStatusAsync();

        if (status?.isPlaying){
            return;
        }
        try {
            await ref.current.playAsync();
        } catch (e) {
            console.error(e)
        }
    }

    const stop = async () => {
        if (ref.current == null){
            return;
        }

        const status = await ref.current.getStatusAsync();

        if (!status?.isPlaying){
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
        if (ref.current == null){
            return;
        }
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.error(e)
        }
    }

    return (
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
    )
})

export default SinglePost;