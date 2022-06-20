import {
  Dimensions,
  Image, ImageBackground, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import React, { useContext } from 'react';
import uuid from 'react-native-uuid';
import styles from './styles';
import ItemProductStatus from '../../../../components/ItemProductStatus/ItemProductStatus';
import GlobalContext from '../../../../context/GlobalContext';
import { OrderStatus } from '../../../../util/Enums';
import CheckImg from '../../../../../assets/check.gif';
import ExplosionGif from '../../../../../assets/explosion-check.gif';
import ClockImg from '../../../../../assets/clock.gif';
import { saveItemInCollection, updateItem } from '../../../../services/FirestoreServices';

export default function WaitingCheck() {
  const { client } = useContext( GlobalContext );

  const downloadTicket = () => {
    // updateItem( 'clients', client.email, { orderState: OrderStatus.OrderRecivedConfirmed });
    // setTimeout(() => {
    //   updateItem( 'clients', client.email, { orderState: OrderStatus.ClientEating });
    // }, 3000 );
  };
  const goHome = () => {
    updateItem( 'clients', client.email, { orderState: OrderStatus.FinishedProcess });
    saveItemInCollection( 'ordersHistory', uuid.v4().toString(), client );
  };
  return (
    <View style={{ height: Dimensions.get( 'screen' ).height * 0.3, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={styles.containerImg}>
        {client.orderState === OrderStatus.WaitingCheck
            && (
              <Image
                source={ClockImg}
                style={{ width: Dimensions.get( 'screen' ).width * 0.4, height: Dimensions.get( 'screen' ).width * 0.4 }}
              />
            )}
        {client.orderState === OrderStatus.AlreadyPaid
            && (
              <ImageBackground source={ExplosionGif} style={{ width: Dimensions.get( 'screen' ).width * 0.4, height: Dimensions.get( 'screen' ).width * 0.4 }}>
                <Image
                  source={CheckImg}
                  style={{ width: Dimensions.get( 'screen' ).width * 0.4, height: Dimensions.get( 'screen' ).width * 0.4 }}
                />
              </ImageBackground>
            )}
        {client.orderState === OrderStatus.WaitingCheck && <Text style={styles.text}>Procesando el pago</Text>}
        {client.orderState === OrderStatus.AlreadyPaid && <Text style={styles.text}>Su pago ha sido procesado correctamente</Text>}
        <ScrollView>
          <View style={styles.containerListOfItemsProduct}>
            {client.order.products.map(( product ) => (
              <ItemProductStatus product={product} withPrice />
            ))}
          </View>
          <Text style={styles.textDetails}>
            Descuento:
            {' '}
            {client.order.discount ? client.order.discount : '0'}
            %
          </Text>
          <Text style={styles.textDetails}>
            Propina:
            {' '}
            $
            {client.order.tip ? client.order.tip : '0'}
          </Text>
          <Text style={styles.textDetails}>
            Total:
            {' '}
            $
            {client.totalToPaid}
          </Text>
        </ScrollView>
      </View>
      {client.orderState === OrderStatus.AlreadyPaid
      && (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => downloadTicket()}
          >
            <Text style={styles.textButton}>Descargar Comprobante</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goHome()}
          >
            <Text style={styles.textButton}>Volver al inicio</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

