import {
  Text, View, Image, ImageBackground, ScrollView, Dimensions, TouchableOpacity
} from 'react-native';
import React, { useContext } from 'react';
import styles from './styles';
import Clocheimg from '../../../../../assets/cloche.png';
import CheckImg from '../../../../../assets/check.gif';
import ExplosionGif from '../../../../../assets/explosion-check.gif';
import GlobalContext from '../../../../context/GlobalContext';
import ItemProductStatus from '../../../../components/ItemProductStatus/ItemProductStatus';
import { OrderStatus } from '../../../../util/Enums';
import { updateItem } from '../../../../services/FirestoreServices';

export default function ClientConfirmation() {
  const { client } = useContext( GlobalContext );
  const confirmOrderRecived = () => {
    updateItem( 'clients', client.email, { orderState: OrderStatus.OrderRecivedConfirmed });
  };
  return (
    <View style={{ height: Dimensions.get( 'screen' ).height * 0.8, alignItems: 'center' }}>
      <View style={styles.containerImg}>
        {client.orderState === OrderStatus.OrderRecived
            && (
              <Image
                source={Clocheimg}
                style={{ width: Dimensions.get( 'screen' ).width * 0.4, height: Dimensions.get( 'screen' ).width * 0.4 }}
              />
            )}
        {client.orderState === OrderStatus.OrderRecivedConfirmed
            && (
              <ImageBackground source={ExplosionGif} style={{ width: Dimensions.get( 'screen' ).width * 0.4, height: Dimensions.get( 'screen' ).width * 0.4 }}>
                <Image
                  source={CheckImg}
                  style={{ width: Dimensions.get( 'screen' ).width * 0.4, height: Dimensions.get( 'screen' ).width * 0.4 }}
                />
              </ImageBackground>
            )}
      </View>
      <Text style={styles.text}>¿Confirma la correcta recepción de su pedido?</Text>
      <ScrollView>
        <View style={styles.containerListOfItemsProduct}>
          {client.order.products.map(( product ) => (
            <ItemProductStatus product={product} />
          ))}
        </View>
      </ScrollView>
      {client.orderState === OrderStatus.OrderRecived
      && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => confirmOrderRecived()}
        >
          <Text style={styles.textButton}>Confirmar recepción</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

