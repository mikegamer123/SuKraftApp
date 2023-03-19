import {useContext, useEffect, useState} from "react";
import {Avatar, Button, Card, Dialog, IconButton, List, Portal, Text, TextInput} from "react-native-paper";
import {createReview, getReviewsByProductId} from "../fetch/reviews";
import {View} from "react-native";
import {Slider} from "native-base";
import {UserContext} from "../contexts/UserContext";
import {FlashList} from "@shopify/flash-list";

const CommentsByProductId = (props) => {
    const [comments, setComments] = useState([]);
    const productId = props?.productId;
    const canComment = props?.canComment;
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(80);
    const [newModal, setNewModal] = useState(false);
    const {user} = useContext(UserContext);

    const loadData = async () => {
        await getReviewsByProductId(productId).then(async r => {
            const res = await r.json();
            setComments(res);
            console.log(res);
        })
    }

    const sendReview = async () => {
        await createReview({
            productID: productId,
            userID: user?.id,
            reviewText: comment,
            rating: rating/20,
        }).then(async r => {
            const res = await r.json();
            loadData();
        })
    }

    useEffect(() => {
        loadData();
    }, [canComment])

    return(
        <Card style={{width: '100%', marginTop: 20, marginBottom: 20, padding: 20}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{width: 56}}/>
                <Text variant='headlineSmall' style={{textAlign: 'center'}}>Ocene</Text>
                <IconButton icon='comment' mode='contained' size={30} onPress={() => {
                    setNewModal(true)
                }}/>
            </View>
            <Card.Content>
                <List.Section style={{width: '100%', flex: 1}}>
                    <Portal>
                        <Dialog visible={newModal} onDismiss={() => {setNewModal(false)}}>
                            <Dialog.Title>Vaša ocena</Dialog.Title>
                            <Dialog.Content>
                                <Slider defaultValue={80} step={20} colorScheme="cyan" onChange={v => {
                                    setRating(v);
                                }}>
                                    <Slider.Track>
                                        <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                                <TextInput
                                    label="Komentar"
                                    value={comment}
                                    onChangeText={text => setComment(text)}
                                    mode='outlined'
                                    style={{marginVertical: 10}}
                                />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={() => {setNewModal(false); sendReview()}}>U redu</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <FlashList
                        data={comments}
                        contentContainerStyle={{width: '100%'}}
                        estimatedItemSize={20}
                        renderItem={({item, index}) => <List.Item
                            key={item.review.id}
                            style={{width: '100%'}}
                            description={"Ocena: " + item?.review?.rating + "  " + item?.review?.reviewText}
                            title={item?.user?.username}
                        />}
                    />
                </List.Section>
            </Card.Content>
        </Card>
    )
}

export default CommentsByProductId