import {useIsFocused, useNavigation} from "@react-navigation/native";
import ScreenBackground from "../../components/ScreenBackground";
import {useContext, useRef, useState} from "react";
import {environment} from "../../enviroments/enviroment";
import {AuthContext} from "../../App";
import {UserContext} from "../../contexts/UserContext";
import {FlashList} from "@shopify/flash-list";
import {Dimensions, View} from "react-native";
import SinglePost from "../../components/SinglePost";

const {serverUrl} = environment;

const HomeScreen = (props) => {
    const authContext = useContext(AuthContext);
    const {user} = useContext(UserContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [videos, setVideos] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29])
    const mediaRefs = useRef([]);

    const onViewableItemsChanged = useRef(({changed}) => {
        changed.forEach(element => {
            const cell = mediaRefs.current[element.key]
            if (cell){
                if (element.isViewable){
                    console.log("IN SCREEN PLAY", element.item)
                    cell.play();
                } else {
                    console.log("IN SCREEN STOP", element.item)
                    cell.stop();
                }
            }
        });
    })

    const renderItem = ({item, index}) => {
        return (
            <View style={{backgroundColor: "#000", height: Dimensions.get("window").height - 80}}>
                <SinglePost
                    ref={(PostSingleRef) => (mediaRefs.current[item] = PostSingleRef)}
                    url="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                />
            </View>
        )
    }

    return (
        <ScreenBackground style={{paddingHorizontal: 0}}>
            <FlashList
                data={videos}
                pagingEnabled
                windowSize={4}
                initialNumberToRender={0}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewablityConfig={{
                    itemVisiblePercentThreshold: 100
                }}
                keyExtractor={item => item}
                renderItem={renderItem}
                estimatedItemSize={Dimensions.get("window").height - 80}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </ScreenBackground>
    )
}

export default HomeScreen