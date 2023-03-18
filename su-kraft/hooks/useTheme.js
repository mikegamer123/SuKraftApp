import {Platform, useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme} from 'react-native-paper';

const blue = '#0077b6';

export default function useTheme() {
    const colorScheme = useColorScheme();

    const baseTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

    const theme = {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: blue,
        },
    };

    return theme;
}