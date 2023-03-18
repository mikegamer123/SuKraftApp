import {View} from "react-native";
import ScreenBackground from "../../components/ScreenBackground";
import {useEffect, useState} from "react";
import {Button, Dialog, Divider, Portal, Provider, RadioButton, Searchbar, SegmentedButtons} from "react-native-paper";
import {getAllCategories} from "../../fetch/categories";
import {searchProducers, searchProducts} from "../../fetch/search";
import {FlashList} from "@shopify/flash-list";
import ProductCard from "../../components/ProductCard";
import SellerCard from "../../components/SellerCard";

const SearchScreen = (props) => {
    const [selectedType, setSelectedType] = useState('products');
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedCategoryProduct, setSelectedCategoryProduct] = useState('');
    const [selectedCategoryProducer, setSelectedCategoryProducer] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [producers, setProducers] = useState([]);

    const loadScreen = async () => {
        try {
            await getAllCategories().then(async r => {
                if (r.status === 200) {
                    const res = await r.json();
                    setAllCategories(res);
                }
            });
            searchHandler();
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadScreen();
    }, []);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const onChangeSearch = query => setSearchQuery(query);

    const searchHandler = async () => {
        if (selectedType === 'products') {
            try {
                await searchProducts({
                    querySearch: searchQuery,
                    categoryID: selectedCategoryProduct
                }).then(async r => {
                    if (r.status === 200) {
                        const res = await r.json();
                        setProducts(res.products);
                        console.log("item s", res);
                    }
                })
            } catch (e) {
                console.error(e)
            }
        } else {
            try {
                await searchProducers({
                    querySearch: searchQuery,
                    categoryID: selectedCategoryProducer
                }).then(async r => {
                    if (r.status === 200) {
                        const res = await r.json();
                        setProducers(res);
                        console.log("Person r", res);
                    }
                })
            } catch (e) {
                console.error(e);
            }
        }
    }
    const searchHandlerWhenTab = async (tab) => {
        if (tab === 'products') {
            try {
                await searchProducts({
                    querySearch: searchQuery,
                    categoryID: selectedCategoryProduct
                }).then(async r => {
                    if (r.status === 200) {
                        const res = await r.json();
                        setProducts(res.products);
                        console.log("item s", res);
                    }
                })
            } catch (e) {
                console.error(e)
            }
        } else {
            try {
                await searchProducers({
                    querySearch: searchQuery,
                    categoryID: selectedCategoryProducer
                }).then(async r => {
                    if (r.status === 200) {
                        const res = await r.json();
                        setProducers(res);
                        console.log("Person r", res);
                    }
                })
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <Provider>
            <ScreenBackground>
                <View style={{width: '100%', marginTop: 20, marginBottom: 10}}>
                    <SegmentedButtons
                        value={selectedType}
                        onValueChange={(v) => {
                            setSelectedType(v);
                            searchHandler(v);
                        }}
                        buttons={[
                            {
                                value: 'products',
                                label: 'Proizvodi',
                            },
                            {
                                value: 'producers',
                                label: 'Krafteri',
                            }
                        ]}
                    />
                </View>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Izaberite kategoriju</Dialog.Title>
                        {
                            selectedType === 'products' ?
                                <Dialog.Content>
                                    <RadioButton.Group onValueChange={value => setSelectedCategoryProduct(value)}
                                                       value={selectedCategoryProduct}>
                                        <RadioButton.Item label="Nijedna" value=""/>
                                        {
                                            allCategories.map(item => {
                                                if (item.type === 'product') {
                                                    return (
                                                        <RadioButton.Item label={item.name} value={item.id}/>
                                                    )
                                                }
                                            })
                                        }
                                    </RadioButton.Group>
                                </Dialog.Content>
                                :
                                <Dialog.Content>
                                    <RadioButton.Group onValueChange={value => setSelectedCategoryProducer(value)}
                                                       value={selectedCategoryProducer}>
                                        <RadioButton.Item label="Nijedna" value=""/>
                                        {
                                            allCategories.map(item => {
                                                if (item.type === 'seller') {
                                                    return (
                                                        <RadioButton.Item label={item.name} value={item.id}/>
                                                    )
                                                }
                                            })
                                        }
                                    </RadioButton.Group>
                                </Dialog.Content>
                        }
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Button mode='outlined' style={{marginTop: 10}} onPress={showDialog}>
                    {selectedType === 'products' ?
                        (selectedCategoryProduct !== undefined && selectedCategoryProduct !== '') ?
                            allCategories.find(x => x.id === selectedCategoryProduct).name
                            :
                            "Izaberite kategoriju"
                        :
                        (selectedCategoryProducer !== undefined && selectedCategoryProducer !== '') ?
                            allCategories.find(x => x.id === selectedCategoryProducer).name
                            :
                            "Izaberite kategoriju"
                    }
                </Button>
                <Button mode='contained' style={{marginTop: 10}} onPress={searchHandler}>Primeni</Button>
                <Divider style={{marginVertical: 10}}/>
                {
                    selectedType === 'products' ?
                        <FlashList
                            data={products}
                            numColumns={2}
                            renderItem={({item, index}) => {
                                return(
                                    <ProductCard data={item}/>
                                )
                            }}
                        />
                        :
                        <FlashList
                            data={producers}
                            numColumns={2}
                            renderItem={({item, index}) => {
                                console.log(item)
                                return(
                                    <SellerCard data={item}/>
                                )
                            }}
                        />
                }
            </ScreenBackground>
        </Provider>
    )
}

export default SearchScreen;