import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProductList from '../../sections/container/ProductList';

export default class Orders extends Component {
  render() {
    return (
      <Fragment>
        <View style={styles.top}>
          <Text style={styles.productName}>Viajes Agregados</Text>
        </View>
        <ProductList todos={false} />
      </Fragment>
    );
  }
}

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
    borderRadius: 5,
    backgroundColor: 'white'
  }
});