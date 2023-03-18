import { LogBox } from "react-native";

if (__DEV__) {
    const ignoreWarns = [
        "Setting a timer for a long period of time",
        "ViewPropTypes will be removed from React Native",
        "exported from 'deprecated-react-native-prop-types'.",
        "Require cycle",
        "Deprecation warning: moment().add(period, number) is deprecated. Please use moment().add(number, period).",
    ];

    const warn = console.warn;
    console.warn = (...arg) => {
        for (const warning of ignoreWarns) {
            if (arg[0].startsWith(warning)) {
                return;
            }
        }
        warn(...arg);
    };

    LogBox.ignoreLogs(ignoreWarns);
}