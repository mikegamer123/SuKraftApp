import ScreenBackground from "../../components/ScreenBackground";
import {Dimensions, View} from "react-native";
import AvatarImage from "react-native-paper/src/components/Avatar/AvatarImage";
import {Text} from "react-native-paper";

const SellerScreen = (props) => {
    const seller = props.route.params.seller;
    console.log("SELLER", seller);

    return(
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
                <AvatarImage source={{uri: seller?.pfp}} size={100} />
                <Text variant='headlineMedium' style={{color: 'white'}}>{seller.seller.name}</Text>
            </View>
            <View style={{paddingVertical: 20}}>
                <Text variant='headlineSmall' style={{color: 'white'}}>Moja priča</Text>
                <Text variant='titleMedium' style={{marginTop: 10, color: 'white'}}>{seller.seller.description}</Text>
            </View>
        </ScreenBackground>
    )
}

export default SellerScreen;