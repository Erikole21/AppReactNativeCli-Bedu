import {SafeAreaView, Text} from 'react-native';
import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@storage_Key');
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };
const getData = async () => {
  try {       
    const value = await AsyncStorage.getItem('@storage_Key');
    if (value !== null) {
      // value previously stored
      console.log(value);
      return value;      
    }
  } catch (e) {
    // error reading value
  }
};

export default function Strains() {    

  const [strain, setStrain] = useState('');
    
  useEffect(() => {
      async function loadStorage() {              
        setStrain(await getData());
      }            

      loadStorage();
  }, []);

  return (
    <SafeAreaView>
      <Text>{strain}</Text>
    </SafeAreaView>
  );
}
