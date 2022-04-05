import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { FlatList, LogBox } from 'react-native';
import Empty from '../../components/Empty';
import Product from '../components/product';
import Separator from '../../components/vertical-separator';
import { useNavigation } from '@react-navigation/native';
import Layout from '../../components/ProducListLayout';
import { createServer } from 'miragejs';
import api from '../../sections/container/ApiMock'
import AsyncStorage from '@react-native-async-storage/async-storage';

if (window.server) {
  window.server.shutdown();
}

window.server = createServer({
  routes() {
    this.get('/api/products', () => {
      return {
        products:

          [
            { id: 1, name: 'San Andres', urlImage: "https://tse3.mm.bing.net/th/id/AMMS_6d145ae3097b7d0d5e3fabbdf22894ec?pid=ImgDet&rs=1", year: 2010, Pais: 'Colombia', description: 'San Andres (Colombia)' },
            {
              id: 2, name: 'Cartagena',
              urlImage: "https://tse3.mm.bing.net/th/id/OIP.B-Mh5FAMV_jp25gje0CYFwHaE7?pid=ImgDet&rs=1",
              year: 2014, Pais: 'Colombia', description: 'Cartagena Colombia'
            },
            {
              id: 3, name: 'Santa Marta',
              urlImage: "https://cloud.officetur.com/clientes/transhotel/images/promos/image_2112.jpg",
              year: 2017, Pais: 'Colombia', description: 'Santa Marta (Colombia)'
            },
            {
              id: 4,
              name: 'Medellín',
              urlImage: "https://th.bing.com/th/id/R.56603521bd463160ed4f3d6dd941add5?rik=d2a2msU%2f%2f1aCkw&pid=ImgRaw&r=0",
              year: 2008,
              Pais: 'Colombia',
              description: 'Medellín (Colombia)',
            },
            {
              id: 5,
              name: 'Bogotá',
              urlImage: "https://www.discoverwalks.com/blog/wp-content/uploads/2020/06/bogota_skyline.jpg",
              year: 2008,
              Pais: 'Colombia',
              description: 'Bogotá (Colombia)'
            },
            {
              id: 6,
              name: 'Cancún',
              urlImage: "https://th.bing.com/th/id/R.23fac81081d711d95c66612911a04d33?rik=F3g%2fgue6ADvmFw&pid=ImgRaw&r=0",
              year: 2008,
              Pais: 'México',
              description: 'Cancún'
            },
            {
              id: 7,
              name: 'Tulum',
              urlImage: "https://tse2.mm.bing.net/th/id/OIP.A_wjKLO9wq0fFqKeVL7TCgHaEK?pid=ImgDet&rs=1",
              year: 2008,
              Pais: 'México',
              description: 'Tulum'
            },
            {
              id: 8,
              name: 'Ciudad de México',
              urlImage: "https://tse3.mm.bing.net/th/id/OIP.surDktBup7upGJ7_Dqu8cAHaFj?pid=ImgDet&rs=1",
              year: 2008,
              Pais: 'México',
              description: 'Ciudad de México'
            }
          ]
      };
    });
  }
});

LogBox.ignoreLogs(['Warning: ...']);

const ProductList = props => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);  
  React.useEffect(() => {

    fetch('/api/products')
      .then(res => res.json())
      .then(async json => {
        for (const product of json.products) {
          const agregado = await api.viajeAgregado(product.id);
          product.agregado = agregado;
        }
        if (props.todos) {
          setProducts(json.products);
        }
        else {
          const viajesAgregados = await api.consultarViajesAgregados();
          const misViajes = [];
          json.products.forEach(product => {
            if (viajesAgregados && viajesAgregados.find(v => v.idViaje == product.id) != null) {
              misViajes.push(product);
            }
          });
          setProducts(misViajes);
        }
      });

  }, []);
  // Consumo de API con Axios
  // const getCharacters = async id => {
  //   const response = await axios.get<CharactersResponse>(
  //     'https://rickandmortyapi.com/api/character',
  //     {
  //       params: {
  //         page: 1,
  //       },
  //     },
  //   );

  //   return response.data;
  // };

  // Consumo de API con fetch
  // const getProducts = async id => {
  //   fetch(
  //     `https://api-gcp.sige-edu.com:8000/api/courses/academiccharge/bystudent/${codeStudent}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(data => {
  //       setProducts(data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //     .finally(() => {});
  // };
  // useEffect(() => {
  //   loginSucess();
  // }, []);
  const itemSeparator = () => <Separator />;
  const keyExtractor = item => item.id.toString();
  const renderEmpty = () => <Empty text="No hay sugerencias" />;
  const viewProduct = item => {
    navigation.navigate('Details', {
      item: item,
    });
  };
  const refrescarData = async ()=>{
    for (const product of products) {
      const agregado = await api.viajeAgregado(product.id);
      product.agregado = agregado;
    }
    if (props.todos) {
      setProducts(products);
    }
    else {
      const viajesAgregados = await api.consultarViajesAgregados();
      const misViajes = [];
      products.forEach(product => {
        if (viajesAgregados && viajesAgregados.find(v => v.idViaje == product.id) != null) {
          misViajes.push(product);
        }
      });
      setProducts(misViajes);
    }    
    console.log('refrescando')
  };
  const renderItem = ({ item }) => {

    return (
      <Product
        refrescar={()=> refrescarData()}
        product={item}
        todos={props.todos}
        onPress={() => viewProduct(item)}
        onLongPress={() => viewProduct(item)}
      />
    );
  };


  return (
    <Layout>
      <FlatList
        data={products}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={renderEmpty}
        keyExtractor={keyExtractor}
        renderItem={renderItem}        
      />
    </Layout>
  );
};

export default ProductList;
