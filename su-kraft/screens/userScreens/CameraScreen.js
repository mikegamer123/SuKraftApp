import {Button, Image, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {Camera} from "expo-camera";
import {Audio} from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {IconButton} from "react-native-paper";

const CameraScreen = (props) => {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);
    const [galleryItems, setGalleryItems] = useState([]);
    const [cameraRef, setCameraRef] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const loadPage = async () => {
        const cameraStatus = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermissions(cameraStatus.status === 'granted');
        const audioStatus = await Audio.requestPermissionsAsync();
        setHasAudioPermissions(audioStatus.status === 'granted');
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermissions(galleryStatus.status === 'granted');
        if (galleryStatus.status === 'granted') {
            const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy: ['creationTime'], mediaType: ['video']})
            setGalleryItems(userGalleryMedia.assets);
        }
    }

    useEffect(() => {
        loadPage();
    }, [])

    const recordVideo = async () => {
        if (cameraRef){
            try {
                const options = {maxDuration: 60, quality: Camera.Constants.VideoQuality['480']}

                const videoRecordPromise = cameraRef.recordAsync(options);

                if (videoRecordPromise){
                    const data = await videoRecordPromise;
                    const source = data.uri;
                    navigation.navigate("SavePostScreen", {source: source});
                }
            } catch (e) {
                console.error(e)
            }
        }
    }

    const stopVideo = async () => {

        if (cameraRef){
            cameraRef.stopRecording();
        }
    }

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        })

        if (!result.canceled){
            navigation.navigate("SavePostScreen", {source: result.assets[0].uri});
        }
    }

    if (!hasCameraPermissions || !hasAudioPermissions || !hasAudioPermissions) {
        return <View></View>
    }

    if (!isFocused) {
        return <View></View>
    }

    return (
        <View style={{flex: 1}}>
            <Camera
                ref={ref => setCameraRef(ref)}
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    aspectRatio: 9 / 16,
                }}
                ratio={'16:9'}
                type={cameraType}
                flashMode={cameraFlash}
                onCameraReady={() => {setIsCameraReady(true)}}
            />

            <View style={{
                top: 60,
                right: 20,
                position: 'absolute'
            }}>
                <IconButton onPress={() => setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)} icon='camera-flip' size={34} iconColor='white' />
                <IconButton onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)} icon='flash' size={34} iconColor='white' />
            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                }}
            >
                <View style={{flex: 1}}></View>
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 3,
                        marginBottom: 30
                    }}
                >
                    <TouchableOpacity
                        style={{
                            borderWidth: 8,
                            borderColor: '#ff404087',
                            backgroundColor: '#ff4040',
                            borderRadius: 100,
                            height: 80,
                            width: 80,
                            alignSelf: 'center'
                        }}
                        disabled={!isCameraReady}
                        onPressIn={() => {recordVideo()}}
                        onPressOut={() => {stopVideo()}}
                    />
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 2,
                            borderColor: 'white',
                            borderRadius: 10,
                            overflow: 'hidden',
                            width: 50,
                            height: 50,
                            marginTop: 15,
                            right: -20
                        }}
                        onPress={() => {
                            pickFromGallery();
                        }}
                    >
                        {
                            galleryItems[0] == undefined ?
                                <View/>
                                :
                                <Image
                                    style={{
                                        height: 50,
                                        width: 50,
                                    }}
                                    source={{uri: galleryItems[0].uri}}
                                />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CameraScreen;