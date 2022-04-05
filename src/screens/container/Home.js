import React, { Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProductList from '../../sections/container/ProductList';


const Home = props => {
  return (
    <Fragment>
      <View style={styles.top}>
        <Text style={styles.productName}>Viajes Sugeridos</Text>
      </View>
      <ProductList todos={true} />
    </Fragment>
  );
};
const styles = StyleSheet.create({
  productName: {
    color: '#4c4c4c',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    padding: 2,
    borderRadius:5,
    backgroundColor: 'white'
  }
});

export default Home;
