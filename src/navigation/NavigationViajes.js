import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MisViajes from '../screens/container/Orders';
import Details from '../sections/components/details';

const Stack = createStackNavigator();

export default function NavigationViajes() {
    return (
        <Stack.Navigator initialRouteName='HomeNavigation'>
            <Stack.Screen
                name="HomeNavigation"
                component={MisViajes}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Details"
                component={Details}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
