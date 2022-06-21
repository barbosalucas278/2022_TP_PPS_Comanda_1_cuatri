/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { getClientsWithProductsToPrepare } from '../../services/FirestoreServices';
import { styles } from './styles';
import { OrderCard } from '../../components/OrderCard/OrderCard';

export default function CookBarmanOrderView() {
  const { user } = useContext( GlobalContext );
  const [usefulOrders, setUsefulOrders] = useState([]);

  useEffect(() => {
    getClientsWithProductsToPrepare(( data ) => {
      const clients = data.docs.map(( doc ) => doc.data());
      if ( clients ) {
        const array = [];
        clients.forEach(( c ) => {
          const products = c.order.products.map(( p, i ) => ({
            product: p, docClient: c, index: i
          }));
          array.push( ...products );
        });
        if ( user.role === 'Cocinero' ) {
          const prods = array.filter(( a ) => a.product.sector === 'Cocina' );
          setUsefulOrders( prods );
        }

        if ( user.role === 'Bartender' ) {
          const prods = array.filter(( a ) => a.product.sector === 'Bar' );
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

