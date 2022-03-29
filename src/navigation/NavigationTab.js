import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import NavigationHome from '../navigation/NavigationHome'
import MisViajes from '../screens/container/Orders'


const Tab = createBottomTabNavigator();
const TabLayout = () => {     
  return (
    <Tab.Navigator     
      initialRouteName='ViajesTab' 
      screenOptions={{
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 23,
        },
        style: {
          backgroundColor: '#eaeaea',
        },
      }}>
      {/* Tab-HomeScreen */}
      <Tab.Screen
        name="MisViajesTab"              
        component={MisViajes}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => renderImageMisViajes(),
        }}
      />      
      {/* Tab-DealsScreen */}
      <Tab.Screen
        name="ViajesTab"
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: () => renderImageViaje(),
        }}
        component={NavigationHome}
      />            
    </Tab.Navigator>
  );
};
export default TabLayout;

function renderImageViaje(image) {
  return (
    <Image
      style={{
        width: 30,
        height: 30,
        top: 10,
        marginLeft: 10,
        marginRight: 10,
      }}
      source={require('../../assets/ic_viajes/de-viaje.png')}
    />
  );
}

function renderImageMisViajes(image) {
  return (
    <Image
      style={{
        width: 30,
        height: 30,
        top: 10,
        marginLeft: 10,
        marginRight: 10,
      }}
      source={require('../../assets/ic_home/camara.png')}
    />
  );
}
