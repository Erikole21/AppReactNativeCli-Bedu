import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import ProductDetail from './productDetail';
import { useNavigation } from '@react-navigation/native';
import Empty from '../../../src/components/Empty';
import Separator from '../../components/vertical-separator';
import Close from '../../components/Close';

const makeHTML = id => {
  return `
    <style>
      .video {
        position: relative;
        padding-bottom: 56.25%;
      }
      iframe {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    </style>
    <div class="video">
    <iframe width="560" height="315" src="https://es.wikipedia.org/wiki/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  `;
};

function Details(props) {
  console.log('props..detail ', props.route.params);
  const [secctions, setSecctions] = useState([]);
  //   const {codeAcademicCharge} = props.route.params.item;

  /* Fetchin data from api */
  //   async function getActivities(code) {
  //     await fetch(
  //       `https://api-gcp.sige-edu.com:8000/api/secctions/secction/byacademicharge/${code}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )
  //       .then(response => response.json())
  //       .then(data => {
  //         setSecctions(data);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  //       .finally(() => {});
  //   }

  //   useEffect(() => {
  //     getActivities(codeAcademicCharge);
  //   }, []);
  console.log('secctions', secctions);
  let keyExtractor = 1;
  //   let keyExtractor = item => item.codeSecction.toString();
  let renderEmpty = () => <Empty text="No hay sugerencias"></Empty>;
  let itemSeparator = () => <Separator />;
  let viewSubject = item => {
    // navigation.navigate('Actividad', {item: item})
  };
  let renderItem = ({ item }) => {
    return (
      <ProductDetail
        {...item}
        onPress={() => {
          viewSubject(item);
        }}
      />
    );
  };
  const navigation = useNavigation();
  const closeDetail = () => {
    navigation.navigate('HomeNavigation');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ width: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.top}>          
          <Text style={styles.productName}>{props.route.params.item.name}</Text>
          <Text style={styles.description}>
            {props.route.params.item.Pais}
          </Text>
          <View style={styles.container}>
            <View style={styles.left}>
              <Close  onPress={closeDetail} />
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.details}>
            <Image
              style={styles.cover}
              source={{
                uri: props.route.params.item.urlImage,
              }}
            />
          </View>
        </View>
        <View style={styles.trailer}>
          {/* <WebView source={{ html: makeHTML(props.route.params.item.name + " (" + props.route.params.item.Pais + ")") }} /> */}
          <WebView source={{ uri: "https://es.wikipedia.org/wiki/" + props.route.params.item.description }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop:-98    
    
  }, 
  trailer: {
    height: 440,
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  cover: {
    width: '100%',
    height: 200,
  },
  title: {
    color: '#44546b',
    fontSize: 18,
    fontWeight: 'bold',
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
  top: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    padding: 5,
    backgroundColor: 'white'
  },
  bottom: {
    padding: 10,
    flex: 1,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 22.5,
    color: '#4c4c4c',
    marginLeft: 10,
    flex: 1,
  },
});

export default Details;
