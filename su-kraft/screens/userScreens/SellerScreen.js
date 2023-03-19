import ScreenBackground from "../../components/ScreenBackground";
import {Dimensions, View} from "react-native";
import AvatarImage from "react-native-paper/src/components/Avatar/AvatarImage";
import {Button, Text} from "react-native-paper";
import * as Linking from 'expo-linking';

const SellerScreen = (props) => {
    const seller = props.route.params.seller;

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
                <View>
                    <Text variant='headlineMedium' style={{color: 'white', maxWidth:Dimensions.get("window").width * 0.6, textAlign: 'right'}}>{seller.seller.name}</Text>
                    <Text variant='headlineSmall' style={{color: 'white', maxWidth:Dimensions.get("window").width * 0.6, textAlign: 'right'}}>@{seller.user?.username}</Text>
                </View>
            </View>
            <View style={{paddingVertical: 20}}>
                <Text variant='headlineSmall' style={{color: 'white'}}>Moja priča</Text>
                <Text variant='titleMedium' style={{marginTop: 10, color: 'white'}}>{seller.seller.description}</Text>
            </View>
            <View style={{paddingVertical: 20}}>
                <Text variant='headlineSmall' style={{color: 'white'}}>Kontakt</Text>
                <Button onPress={() => {Linking.openURL('sms:' + seller.user?.phoneNo)}} mode='text'><Text variant='titleMedium' style={{marginTop: 10, color: 'white'}}>Broj telefona: {seller.user?.phoneNo}</Text></Button>
                <Button onPress={() => {Linking.openURL('mailto:' + seller.user?.email)}} mode='text'><Text variant='titleMedium' style={{marginTop: 10, color: 'white'}}>E-mail adresa: {seller.user?.email}</Text></Button>
            </View>
        </ScreenBackground>
    )
}

export default SellerScreen;