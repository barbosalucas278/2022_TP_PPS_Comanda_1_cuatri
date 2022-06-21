/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import {
  View, Text, FlatList, TouchableOpacity, Image
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { getClientsWithProductsToPrepare, getUserByEmail, updateItem } from '../../services/FirestoreServices';
import { styles } from './styles';

export default function CookBarmanOrderView() {
  const { user } = useContext( GlobalContext );
  const [usefulOrders, setUsefulOrders] = useState([{}]);

  useEffect(() => {
    getClientsWithProductsToPrepare(( data ) => {
      const clients = data.docs.map(( doc ) => doc.data());
      if ( clients ) {
        let array = [];
        clients.forEach(( c ) => {
          const products = c.order.products.map(( p, i ) => ({
            ...p, client: c.email, index: i, originalProduct: p
          }));
          array = products;
        });

        if ( user.role === 'Cocinero' ) {
          const prods = array.filter(( a ) => a.sector === 'Cocina' );
          setUsefulOrders( prods );
        }

        if ( user.role === 'Bartender' ) {
          const prods = array.filter(( a ) => a.sector === 'Bar' );
          setUsefulOrders( prods );
        }
      }
    }, ( error ) => console.log( error ));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={usefulOrders}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={(({ item: c }) => <OrderCard data={c} /> )}
      />
    </View>
  );
}

function OrderCard( props ) {
  const {
    data
  } = props;
  const [state, setState] = useState( '' );
  const [photo, setPhoto] = useState( '' );

  useEffect(() => {
    if ( data.photos && photo === '' ) {
      setPhoto( data.photos[0].uri );
    }

    switch ( data.productState ) {
      case '1':
        setState( 'Comenzar a preparar' );
        break;
      case '2':
        setState( 'Terminar' );
        break;
      case '3':
        setState( 'Producto terminado' );
        break;
      default:
        break;
    }
    console.log( data );
  }, [data.productState]);

  const handleOrderAction = async () => {
    if ( state === 'Comenzar a preparar' ) {
      data.originalProduct.productState = '2';
    } else if ( state === 'Terminar' ) {
      data.originalProduct.productState = '3';
    }

    getUserByEmail( 'clients', data.client, ( clientData ) => {
      const mydata = clientData.docs.map(( doc ) => doc.data())[0];
      mydata.order.products[data.index] = data.originalProduct;
      updateItem( 'clients', data.client, mydata );
    }, ( err ) => { console.log( err ); });

    // acá mandar push a Mozo cuando state === 3.
  };

  return (
    <View style={styles.clientCard}>
      <View style={styles.formControlPhoto}>
        <Image
          style={styles.formControlPhotoWithPhoto}
          source={{ uri: photo }}
          resizeMode='cover'
        />
      </View>
      <View style={{ marginBottom: 5 }}>
        <Text style={styles.textName}>{`Producto: ${data.name}`}</Text>
        <Text style={styles.textName}>{`Cantidad: ${data.quantity}`}</Text>
      </View>
      {( state === 'Comenzar a preparar' || state === 'Terminar' )
        ? (
          <TouchableOpacity style={styles.icon} onPress={() => handleOrderAction()}>
            <Text style={styles.textOrder}>{state}</Text>
          </TouchableOpacity>
        )
        : (
          <TouchableOpacity style={styles.icon} disabled>
            <Text style={styles.textOrder}>{state}</Text>
          </TouchableOpacity>
        )}
    </View>
  );
}
