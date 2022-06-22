/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import {
  Text, TextInput, TouchableOpacity, View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';

export default function GameOne( props ) {
  const { onGameEnded } = props;
  const [num1, setNum1] = useState( 0 );
  const [num2, setNum2] = useState( 0 );
  const [operation, setOperation] = useState( '' );
  const [userInput, setUserInput] = useState( 0 );
  useEffect(() => {
    setNum1( generateRandomNumber());
    setNum2( generateRandomNumber());
    setOperation( selectRandomOperation());
  }, []);

  const generateRandomNumber = ( maximo = 100 ) => {
    const num = Math.round( Math.random() * maximo );
    return num;
  };
  const selectRandomOperation = () => {
    const operations = ['+', '-', '*'];
    const index = generateRandomNumber( 2 );
    return operations[index];
  };
  const sendResult = () => {
    let result;
    switch ( operation ) {
      case '+':
        const sum = num1 + num2;
        result = sum;
        break;
      case '-':
        const rest = num1 - num2;
        result = rest;
        break;
      case '*':
        const mult = num1 * num2;
        result = mult;
        break;
      default:
        break;
    }

    if ( userInput == result ) {
      onGameEnded( true );
    } else {
      onGameEnded( false );
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>{num1}</Text>
      </View>
      <View>
        <Text>{operation}</Text>
      </View>
      <View>
        <Text>{num2}</Text>
      </View>
      <View>
        <Text style={styles.buttonText}>¿Cuánto es?</Text>
        <TextInput
          style={styles.formControl}
          onChangeText={( number ) => setUserInput( number )}
          value={userInput}
          keyboardType='numeric'
          placeholder='Ingresá el resultado'
          placeholderTextColor='white'
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => sendResult()}
        >
          <Text style={styles.textButton}>Arriesgar!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

