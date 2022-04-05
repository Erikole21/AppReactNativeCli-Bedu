import React from 'react';
import { Image } from 'react-native';
import {
  createDrawerNavigator, DrawerContentScrollView, DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import NavigationTab from './NavigationTab';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Perfil from '../screens/container/Profile'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={NavigationTab}        
        options={{
          title: 'Home',
          drawerIcon: () => renderImageViaje()
        }}
      />     
      <Drawer.Screen
        name="Perfil"
        component={Perfil}        
        options={{
          title: 'Perfil',
          drawerIcon: () => renderImageSetting()
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;


function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const handleClose = async () => {
    await AsyncStorage.removeItem('@Users');
    //await AsyncStorage.removeItem('@MisViajes');
    navigation.navigate('Login');
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Cerrar Sesión" onPress={handleClose} icon={renderImageCerrarSesion} />
    </DrawerContentScrollView>
  );
}

function renderImageViaje(image) {
  return (
    <Image
      style={{
        width: 24,
        height: 24,
        top: 5,
        marginLeft: 5,
        marginRight: 5,
      }}
      source={require('../../assets/ic_viajes/de-viaje.png')}
    />
  );
}

function renderImageCerrarSesion(image) {
  return (
    <Image
      style={{
        width: 24,
        height: 24,
        top: 5,
        marginLeft: 5,
        marginRight: 5,
      }}
      source={require('../../assets/ic_logout/check-out.png')}
    />
  );
}

function renderImageSetting(image) {
  return (
    <Image
      style={{
        width: 24,
        height: 24,
        top: 5,
        marginLeft: 5,
        marginRight: 5,
      }}
      source={require('../../assets/ic_settings/gear.png')}
    />
  );
}