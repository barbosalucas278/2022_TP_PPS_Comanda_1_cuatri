import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import ItemProductStatus from '../../../../components/ItemProductStatus/ItemProductStatus';
import StandbyScreen from '../../../../components/StandbyScreen/StandbyScreen';
import GlobalContext from '../../../../context/GlobalContext';
import { ProductStatus } from '../../../../util/Enums';
import styles from './styles';

export default function WaitingConfirmation() {
  const { client } = useContext( GlobalContext );

  return (
    <View>
      <View style={styles.containerWaitingScreen}>
        <StandbyScreen text='Su pedido será confirmado a la brevedad' />
      </View>
      <View style={styles.containerListOfItemsProduct}>
        {client.order.products.map(( product ) => (
          <ItemProductStatus product={product} />
        ))}
      </View>
    </View>
  );
}
