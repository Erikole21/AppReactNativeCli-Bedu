import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import ProductList from '../../sections/container/ProductList';


const Home = props => { 
  return (
    <Fragment>     
      <ProductList />
    </Fragment>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#e350a8',
    borderRadius: 5,
  },
  txtusername: {
    backgroundColor: '#99c84a',
    borderRadius: 5,
    color: 'white',
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLabel: {
    color: 'white',
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
