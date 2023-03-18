import AsyncStorage from "@react-native-async-storage/async-storage";

export const getJWT = async () => await AsyncStorage.getItem("token")