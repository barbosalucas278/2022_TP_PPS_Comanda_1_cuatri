/* eslint-disable react/prop-types */
import {
  Image, Text, TouchableOpacity, View
} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';

export default function ProductItem( props ) {
  const {
    product, addProduct, removeProduct, quantityInOrder
  } = props;
  const [quantity, setQuantity] = useState( '0' );
  const onAdd = () => {
    console.log( product );
    addProduct( product );
    setQuantity( quantityInOrder( product ));
  };
  const onRemove = () => {
    removeProduct( product );
    setQuantity( quantityInOrder( product ));
  };

  //   quantityInOrder( product )
  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerPhoto}>
        <Image
          style={styles.photo}
          source={{ uri: product.photos[0].uri }}
          resizeMode='cover'
        />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>
          $
          {' '}
          {product.price}
        </Text>
        <View style={styles.containerCounter}>
          <TouchableOpacity onPress={() => onRemove()}><Text style={styles.textRemove}>-</Text></TouchableOpacity>
          <View><Text style={styles.textCounter}>{quantity}</Text></View>
          <TouchableOpacity onPress={() => onAdd()}><Text style={styles.textAdd}>+</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

