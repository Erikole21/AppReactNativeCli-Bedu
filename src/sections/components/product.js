import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../../sections/container/ApiMock'

const tempColor = ['#FF6347', '#FFA500', '#FFD700', '#32CD32'];

const Product = props => {
  const [agregado, setAgregado] = useState(props.product.agregado);
  const Agregardetail = async () => {
    if (props.todos) {
      await api.agregarViaje(props.product.id);
      setAgregado(true);
      props.refrescar();
    }
    else {
      await api.quitarViaje(props.product.id);      
      props.refrescar();
    }
  };
  return (
    <View style={styles.cardproduct}>
      {
        !agregado ?
          <View style={styles.container}>
            <View style={styles.left} >
              <TouchableOpacity onPress={Agregardetail} style={styles.containerAdd}>
                <Text style={styles.button}>+</Text>
              </TouchableOpacity>
            </View>
          </View> : null
      }
      {
        !props.todos ?
          <View style={styles.container}>
            <View style={styles.left} >
              <TouchableOpacity onPress={Agregardetail} style={styles.containerDelete}>
                <Text style={styles.buttonRed}>X</Text>
              </TouchableOpacity>
            </View>
          </View> : null
      }
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.product}>
          <Text style={styles.productName}>{props.product.name}</Text>
          <Image source={{
            uri: props.product.urlImage,
          }}
            style={styles.imagen} />
          <Text style={styles.productPrice}>{props.product.Pais}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    fontWeight: 'bold',
    color: 'white',
  },
  containerAdd: {
    backgroundColor: '#14b739',
    borderRadius: 12,
    width: 35,
    height: 35,
    marginRight: 10,
    marginBottom: 0,
    marginTop: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDelete: {
    backgroundColor: '#ff6c3e',
    borderRadius: 10,
    width: 30,
    height: 30,
    marginRight: 10,
    marginBottom: 0,
    marginTop: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',

  },
  cardproduct: {
    paddingBottom: 0,
  },
  imagen: {
    width: 350,
    height: 330,
    borderRadius: 30,
    alignSelf: 'center'
  },
  productName: {
    color: '#4c4c4c',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  product: {
    height: 400,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product;
