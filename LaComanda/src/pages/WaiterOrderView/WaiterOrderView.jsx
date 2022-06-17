/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import {
  View, Text, FlatList, TouchableOpacity, Pressable
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import { getAllClientsToOrder, getAllCooksAndBartenders, updateItem } from '../../services/FirestoreServices';
import { sendPushNotification } from '../../services/PushNotificationService';

export default function WaiterOrderView() {
  const [usefulClients, setUsefulClients] = useState([{}]);

  useEffect(() => {
    getAllClientsToOrder(( data ) => {
      const response = data.docs.map(( doc ) => doc.data());
      if ( response ) {
        setUsefulClients( response );
      }
    }, ( error ) => console.log( error ));

    setTimeout(() => {
    }, 3000 );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={usefulClients}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={(({ item: c }) => <ClientCard data={c} id={c.id} /> )}
      />
    </View>
  );
}

function ClientCard( props ) {
  const {
    data, id
  } = props;
  const [messageKitchen, setMessageKitchen] = useState( '' );
  const [messageBar, setMessageBar] = useState( '' );
  const [buttonType, setButtonType] = useState( 'Confirmar Pedido' );

  useEffect(() => {
    if ( data && data.order && data.order.products ) {
      const cocina = data.order.products.filter(( p ) => p.sector === 'Cocina' );
      const pendienteC = cocina.filter(( p ) => p.productState === '1' );
      const preparacionC = cocina.filter(( p ) => p.productState === '2' );
      const listoC = cocina.filter(( p ) => p.productState === '3' );

      const bar = data.order.products.filter(( p ) => p.sector === 'Bar' );
      const pendienteB = bar.filter(( p ) => p.productState === '1' );
      const preparacionB = bar.filter(( p ) => p.productState === '2' );
      const listoB = bar.filter(( p ) => p.productState === '3' );

      if ( data.orderState === '5' ) {
        setButtonType( 'Pedido en preparación' );
      }

      if ( listoC.length === cocina.length && listoB.length === bar.length ) {
        setButtonType( 'Entregar Pedido' );
      }

      if ( pendienteC ) {
        setMessageKitchen( 'Pendiente' );
      }

      if ( preparacionC && preparacionC.length >= pendienteC.length ) {
        setMessageKitchen( 'En Preparación' );
      }

      if ( listoC.length === cocina.length ) {
        setMessageKitchen( 'Listo' );
      }

      if ( cocina.length === 0 ) {
        setMessageKitchen( 'No hay productos' );
      }

      if ( pendienteB ) {
        setMessageBar( 'Pendiente' );
      }

      if ( preparacionB && preparacionB.length >= pendienteB.length ) {
        setMessageBar( 'En Preparación' );
      }

      if ( listoB.length === bar.length ) {
        setMessageBar( 'Listo' );
      }

      if ( bar.length === 0 ) {
        setMessageBar( 'No hay productos' );
      }
    }
  }, [data]);

  const handleOrderAction = () => {
    if ( buttonType === 'Confirmar Pedido' ) {
      updateItem( 'clients', data.email, { orderState: '5' });
      getAllCooksAndBartenders(( dataFB ) => {
        const response = dataFB.docs.map(( doc ) => doc.data());
        const usersToken = response.map(( u ) => u.pushToken );
        sendPushNotification( usersToken, 'Nuevo Pedido', 'Hay un pedido pendiente' );
      }, ( err ) => { console.log( err ); });
      sendPushNotification();
    } else if ( buttonType === 'Entregar Pedido' ) {
      updateItem( 'clients', data.email, { orderState: '6' });
    }
  };

  return (
    <View style={styles.clientCard}>
      <View style={{ marginBottom: 5 }}>
        <Text style={styles.textName}>{`Mesa: ${data.assignedTable}`}</Text>
        <Text style={styles.textName}>{`Cliente: ${data.name}`}</Text>
        <Text style={styles.textName}>{`Cocina: ${messageKitchen}`}</Text>
        <Text style={styles.textName}>{`Bar: ${messageBar}`}</Text>
      </View>
      {( buttonType === 'Confirmar Pedido' || buttonType === 'Entregar Pedido' )
        ? (
          <TouchableOpacity style={styles.icon} onPress={() => handleOrderAction()}>
            <Text style={styles.textOrder}>{buttonType}</Text>
          </TouchableOpacity>
        )
        : (
          <Pressable
            disable
            style={styles.iconDisabled}
          >
            <Text style={styles.textOrder}>{buttonType}</Text>
          </Pressable>
        )}
    </View>
  );
}
