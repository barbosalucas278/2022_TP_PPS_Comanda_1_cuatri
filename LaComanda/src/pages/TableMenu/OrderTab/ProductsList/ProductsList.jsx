/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/no-unstable-nested-components */
import {
  FlatList, Text, View, TouchableOpacity, ActivityIndicator
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';
import ProductItem from '../ProductItem/ProductItem';
import GlobalContext from '../../../../context/GlobalContext';
import { getAllCollection, updateItem } from '../../../../services/FirestoreServices';
import { OrderStatus } from '../../../../util/Enums';
import theme from '../../../../config/theme';

export default function ProductsList({ navigation }) {
  const { client } = useContext( GlobalContext );
  const [total, setTotal] = useState( 0 );
  const [totalEstimatedTime, setTotalEstimatedTime] = useState( 0 );
  const [spinner, setSpinner] = useState( false );
  const [productList, setProductList] = useState([]);
  const [newOrder, setNewOrder] = useState([]);
  useEffect(() => {
    getAllCollection( 'products', ( data ) => {
      const response = data.docs.map(( doc ) => doc.data());
      console.log( response );
      setProductList( response );
    }, ( error ) => { console.log( error ); });
  }, []);

  const handlerAddproduct = ( _product ) => {
    const productsInOrder = newOrder.filter(( p ) => p.name === _product.name );
    if ( productsInOrder.length > 0 ) {
      productsInOrder[0].quantity += 1;
    } else {
      newOrder.push({ ..._product, quantity: 1 });
    }
    calculateTotal();
    calculateEstimatedTime();
  };

  const handlerRemoveProduct = ( _product ) => {
    const productsInOrder = newOrder.filter(( p ) => p.name === _product.name );
    if ( productsInOrder.length > 0 ) {
      if ( productsInOrder[0].quantity > 1 ) {
        productsInOrder[0].quantity -= 1;
      } else {
        setNewOrder( newOrder.filter(( p ) => p.name !== _product.name ));
      }
    }
    calculateTotal();
    calculateEstimatedTime();
  };

  const handlerQuantityInOrder = ( _product ) => {
    const productsInOrder = newOrder.filter(( p ) => p.name === _product.name );
    return productsInOrder.length > 0 ? productsInOrder[0].quantity : 0;
  };

  const calculateTotal = () => {
    if ( newOrder.length > 0 ) {
      const t = newOrder.reduce(( _total, p ) => _total + ( p.price * p.quantity ), 0 );
      setTotal( t );
    } else {
      setTotal( newOrder.length );
    }
  };

  const calculateEstimatedTime = () => {
    if ( newOrder.length > 0 ) {
      const t = newOrder.reduce(( _total, p ) => _total + ( parseInt( p.elaborationTime, 10 ) * p.quantity ), 0 );
      setTotalEstimatedTime( t );
    } else {
      setTotalEstimatedTime( 0 );
    }
  };

  const createOrder = () => {
    setSpinner( true );
    updateItem( 'clients', client.email, {
      orderState: OrderStatus.OrderSended,
      order: {
        totalEstimatedTime, total, products: newOrder, discount: 0, tip: 0
      }
    }).then(() => {
      getAllWaiter(( data ) => {
        const response = data.docs.map(( doc ) => doc.data());
        const usersToken = response.map(( u ) => u.pushToken ).filter(( us ) => us !== undefined );
        sendPushNotification( usersToken, 'Nuevo Pedido', 'Ha ingresado un nuevo pedido para confirmar' );
      }, ( err ) => { console.log( err ); });
      navigation.navigate( 'WaitingOrder' );
    });
  };

  return (
    <View style={styles.container}>
      {
        spinner ? (
          <View style={styles.container}>
            <ActivityIndicator size={180} color={theme.colors.primary} />
          </View>
        )
          : (

            <View style={styles.containerList}>
              <Text style={styles.estimatedTimeText}>
                Tiempo Estimado:
                {' '}
                {totalEstimatedTime}
                {' '}
                minutos
              </Text>
              <FlatList
                data={productList}
                renderItem={({ item: p }) => (
                  <ProductItem
                    product={p}
                    addProduct={handlerAddproduct}
                    removeProduct={handlerRemoveProduct}
                    quantityInOrder={handlerQuantityInOrder}
                  />
                )}
              />

            </View>
          )
      }
      <TouchableOpacity style={styles.containerOrderButton} onPress={createOrder}>
        <View style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Hacer Pedido </Text>
          <Text style={styles.orderTotalPriceButtonText}>
            $
            {' '}
            {total}
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

