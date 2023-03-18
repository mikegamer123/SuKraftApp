import "./ignoreWarnings";
console.reportErrorsAsExceptions = false;

const isAndroid = require('react-native').Platform.OS === 'android'; // this line is only needed if you don't use an .android.js file
const isHermesEnabled = !!global.HermesInternal;  // this line is only needed if you don't use an .android.js file

// in your index.js file
if (isHermesEnabled || isAndroid) {  // this line is only needed if you don't use an .android.js file

    require('@formatjs/intl-getcanonicallocales/polyfill');
    require('@formatjs/intl-locale/polyfill');

    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
    require('@formatjs/intl-pluralrules/locale-data/sr.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-displaynames/polyfill');
    require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
    require('@formatjs/intl-displaynames/locale-data/sr.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-listformat/polyfill');
    require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
    require('@formatjs/intl-listformat/locale-data/sr.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-numberformat/polyfill');
    require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
    require('@formatjs/intl-numberformat/locale-data/sr.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
    require('@formatjs/intl-relativetimeformat/locale-data/sr.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-datetimeformat/polyfill');
    require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT
    require('@formatjs/intl-datetimeformat/locale-data/sr.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

    require('@formatjs/intl-datetimeformat/add-golden-tz.js');

    // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
    if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {

        // If you are using react-native-cli
        // let RNLocalize = require('react-native-localize');
        // Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());

        //  Are you using Expo, use this instead of previous 2 lines
        Intl.DateTimeFormat.__setDefaultTimeZone(
            require("expo-localization").timezone
        );
    }
} // this line is only needed if you don't use an .android.js file

import { View } from 'react-native';
import PreLoginNavigation from "./navigation/preLogin/PreLoginNavigation";
import {Provider as PaperProvider} from 'react-native-paper';
import useTheme from "./hooks/useTheme";
import InAppNavigation from "./navigation/inApp/InAppNavigation";
import {createContext, useEffect, useMemo, useReducer, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserById} from "./fetch/users";
import {UserContext} from "./contexts/UserContext";

export const AuthContext = createContext(null);

export default function App() {
    const theme = useTheme();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isLoading: false,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        userToken: null,
                        isLoading: false,
                    };
            }
        },
        {
            isLoading: true,
            userToken: null,
        }
    );

    const authContext = useMemo(
        () => ({
            signIn: async () => {
                const userToken = await AsyncStorage.getItem("token");
                const userId = await AsyncStorage.getItem("userId");
                await getUserById(userId).then(async r => {
                    const res = await r.json();
                    setUser(res?.user);
                    dispatch({type: "SIGN_IN", token: userToken});
                })
            },
            refreshUser: async () => {
                const userId = await AsyncStorage.getItem("userId");
                await getUserById(userId).then(async r => {
                    const res = await r.json();
                    console.log("REFRESHING")
                    setUser(res?.user);
                })
            },
            signOut: async () => {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("userId");
                await AsyncStorage.removeItem("user");
                setUser({});
                dispatch({type: "SIGN_OUT"});
            }
        }),
        []
    );

    useEffect(() => {
        const bootstrapAsync = async () => {
            const userToken = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("userId");
            if(userToken){
                dispatch({type: "SIGN_IN", token: userToken});
            }
            if (userId){
                await getUserById(userId).then(async r => {
                    if (r.status === 200){
                        const res = await r.json();
                        setUser(res?.user);
                        await AsyncStorage.setItem('user', JSON.stringify(res?.user));
                    }
                })
            }
            setLoading(false);
        }
        bootstrapAsync();
    }, []);

    const renderApp = useMemo(() => {
        if (loading){
            return <View />
        }
        if (!state.userToken){
            return <InAppNavigation />
        }
        return <PreLoginNavigation />
    }, [state.userToken, loading]);

  return (
      <AuthContext.Provider value={authContext}>
          <UserContext.Provider value={{user: user, setUser: setUser}}>
              <PaperProvider theme={theme}>
                  <View style={{flex: 1, backgroundColor: theme.colors.backgroundColor}}>
                      {
                          renderApp
                      }
                  </View>
              </PaperProvider>
          </UserContext.Provider>
      </AuthContext.Provider>
  );
}
