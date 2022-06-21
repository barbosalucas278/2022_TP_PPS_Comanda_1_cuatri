/* eslint-disable react/prop-types */
import {
  View, Text, TouchableOpacity, Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { updateItem } from '../../services/FirestoreServices';
import { styles } from './styles';

export function OrderCard( props ) {
  const {
    data
  } = props;
  const [state, setState] = useState( '' );
  const [photo, setPhoto] = useState( '' );
  useEffect(() => {
    if ( data.product.photos && photo === '' ) {
      setPhoto( data.product.photos[0].uri );
    }

    switch ( data.product.productState ) {
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
  }, [data.docClient.order.products[data.index].productState]);

  const handleOrderAction = async () => {
    if ( state === 'Comenzar a preparar' ) {
      data.product.productState = '2';
    } else if ( state === 'Terminar' ) {
      data.product.productState = '3';
      data.docClient.order.totalEstimatedTime -= ( parseInt( data.product.elaborationTime, 10 ) * data.product.quantity );
    }

    data.docClient.order.products[data.index] = data.product;
    updateItem( 'clients', data.docClient.email, data.docClient );

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
        <Text style={styles.textName}>{`Producto: ${data.product.name}`}</Text>
        <Text style={styles.textName}>{`Cantidad: ${data.product.quantity}`}</Text>
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

