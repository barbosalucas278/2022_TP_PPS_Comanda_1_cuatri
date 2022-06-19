import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import ItemProductStatus from '../../../../components/ItemProductStatus/ItemProductStatus';
import StandbyScreen from '../../../../components/StandbyScreen/StandbyScreen';
import GlobalContext from '../../../../context/GlobalContext';
import styles from './styles';

export default function WaitingConfirmedOrder() {
  const { client } = useContext( GlobalContext );
  const { totalEstimatedTime } = client.order;

  return (
    <View>

      <View style={styles.containerWaitingScreen}>
        <StandbyScreen text='Tiempo estimado para recibir el pedido' />
        <Text style={styles.text}>
          {totalEstimatedTime}
          {' '}
          Minutos
        </Text>
      </View>
      <View style={styles.containerListOfItemsProduct}>
        {client.order.products.map(( product ) => (
          <ItemProductStatus product={product} withStatus />
        ))}
      </View>
    </View>
  );
}

