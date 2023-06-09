import {TouchableOpacity, View} from "react-native";
import {Card, Text} from "react-native-paper";
import {useEffect, useState} from "react";
import {Skeleton} from "native-base";
import {searchProducers} from "../fetch/search";
import {getMedia} from "../fetch/media";
import {environment} from "../enviroments/enviroment";
import {getSellerById} from "../fetch/sellers";
import {useNavigation} from "@react-navigation/native";

const {serverUrl}= environment;

const SellerCard = ({data}) => {
    const [image, setImage] = useState();
    const navigation = useNavigation();

    const loadImage = async () => {
        try {
            await getMedia(data?.mediaID).then(async r => {
                if (r.status === 200) {
                    const res = await r.json();
                    if (res.type === 'image'){
                        setImage(serverUrl + "/" + res.srcUrl);
                    } else {
                        setImage("No Image")
                    }
                }
            })
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (data.mediaID){
            loadImage();
        }
    }, []);

    const navigateHandler = async () => {
        await getSellerById(data?.id).then(async r => {
            const res = await r.json();
            navigation.navigate("SellerScreen", {seller: {...res, pfp: image}})
        })
    }

    return(
        <View style={{width: '100%', paddingHorizontal: 6, marginBottom: 12}}>
            <TouchableOpacity onPress={() => {navigateHandler()}}>
                <Card style={{width: '100%'}}>
                    {
                        image ?
                            image === 'No Image' ?
                                <Card.Cover source={{ uri: image }} />
                                :
                                <Card.Cover source={{ uri: image }} />
                            :
                            <Skeleton h="195" />
                    }
                    <Card.Content>
                        <Text variant="titleMedium">{data?.name}</Text>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </View>
    )
}

export default SellerCard;