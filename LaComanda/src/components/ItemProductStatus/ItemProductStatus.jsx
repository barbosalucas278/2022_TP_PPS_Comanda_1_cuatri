/* eslint-disable react/prop-types */
import { Text, View } from 'react-native';
import React from 'react';
import { ProductStatus } from '../../util/Enums';
import styles from './styles';

export default function ItemProductStatus( props ) {
  const { product, withStatus } = props;
  const rederProductStatus = ( state ) => {
    switch ( state ) {
      case ProductStatus.Pendding:
        return (
          <View style={styles.containerItemStateProduct}>
            <Text>Pendiente</Text>
          </View>
        );
      case ProductStatus.InProgress:
        return (
          <View style={styles.containerItemStateProduct}>
            <Text>En Preparación</Text>
          </View>
        );
      case ProductStatus.Done:
        return (
          <View style={[styles.containerItemStateProduct, styles.containerStateDone]}>
            <Text style={{ color: 'white' }}>Terminado!</Text>
          </View>
        );
      default:
        return <Text> </Text>;
    }
  };
  return (
    <View style={[styles.containerItemProduct]}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={styles.quantity}>
          <Text>{product.quantity}</Text>
        </View>
        <Text style={styles.textItemProduct}>
          {product.name}
        </Text>
      </View>
      {withStatus
      && rederProductStatus( product.productState )}
    </View>
  );
}

