import * as Device from 'expo-device';

export const getUserAgent = () => {
    return(
        Device.osName + " " +  Device.modelName + " " + Device.osVersion
    )
}