/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text, TouchableOpacity, Vibration, View
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import { OrderStatus } from '../../util/Enums';
import GlobalContext from '../../context/GlobalContext';
import styles from './styles';
import Scanner from '../../components/Scanner/Scanner';
import { navigate } from '../../config/RootNavigation';

export default function TableMenu() {
  const { client } = useContext( GlobalContext );
  const [scanner, setScanner] = useState( false );
  const [active, setActive] = useState( '' );
  useEffect(() => {
    if ( active ) {
      switch ( client.orderState ) {
        case OrderStatus.ScannedAssignedTable:
          navigate( 'ProductsList' );
          break;
        case OrderStatus.OrderSended:
          navigate( 'WaitingConfirmation' );
          break;
        case OrderStatus.OrderConfirmed:
          navigate( 'WaitingConfirmedOrder' );
          break;
        case OrderStatus.OrderRecived:
          navigate( 'ClientConfirmation' );
          break;
        case OrderStatus.OrderRecivedConfirmed:
          setTimeout(() => {
            navigate( 'ClientEating' );
          }, 3000 );
          break;
        case OrderStatus.ClientEating:
          navigate( 'ClientEating' );
          break;
        case OrderStatus.WaitingCheck:
          navigate( 'WaitingCheck' );
          break;
        case OrderStatus.FinishedProcess:
          navigate( 'Home' );
          break;
        default:
          break;
      }
    }
  }, [client.orderState]);

  const onGameScreen = () => {
    setScanner( true );
    setActive( 'GameTab' );
  };
  const onSurveyScreen = () => {
    setScanner( true );
    setActive( 'SurveyTab' );
  };
  const onOrderScreen = () => {
    setScanner( true );
    setActive( 'OrderTab' );
  };
  const handleScannerResult = ( _scanResult ) => {
    if ( _scanResult === client.assignedTable ) {
      console.log( 'Scanner result: ', _scanResult );
      setScanner( false );
      if ( active === 'OrderTab' ) {
        switch ( client.orderState ) {
          case OrderStatus.ScannedAssignedTable:
            navigate( 'ProductsList' );
            break;
          case OrderStatus.OrderSended:
            navigate( 'WaitingConfirmation' );
            break;
          case OrderStatus.OrderConfirmed:
            navigate( 'WaitingConfirmedOrder' );
            break;
          case OrderStatus.OrderRecived:
            navigate( 'ClientConfirmation' );
            break;
          case OrderStatus.OrderRecivedConfirmed:
            setTimeout(() => {
              navigate( 'ClientEating' );
            }, 3000 );
            break;
          case OrderStatus.ClientEating:
            navigate( 'ClientEating' );
            break;
          case OrderStatus.WaitingCheck:
            navigate( 'WaitingCheck' );
            break;
          default:
            break;
        }
      } else {
        navigate( active );
      }
      Toast.show({
        type: 'success',
        text1: 'Mesa scaneada correctamente',
        position: 'bottom'
      });
    } else {
      setScanner( false );
      setActive( '' );
      Toast.show({
        type: 'error',
        text1: 'La mesa scaneada no es la asignada',
        position: 'bottom'
      });
      Vibration.vibrate( 1000 );
    }
  };
  const handleChat = () => {
    navigate( 'ClientChat' );
  };
  return (
    <View>
      { scanner ? (
        <View>
          <Scanner onScan={( result ) => handleScannerResult( result )} />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onGameScreen()}
          >
            <Icon name='gamepad' size={50} color='white' />
            <Text style={styles.textButton}>Juegos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSurveyScreen()}
          >
            <IconMaterial name='message-star' size={50} color='white' />
            <Text style={styles.textButton}>Encuestas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onOrderScreen()}
          >
            <Icon name='concierge-bell' size={50} color='white' />
            <Text style={styles.textButton}>Pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChat} style={styles.containerChatIconTouchable}>
            <View style={styles.containerChatIcon}>
              <ChatIcon name='chatbubbles-outline' style={styles.chatIcon} size={40} color='white' />
            </View>
          </TouchableOpacity>
        </View>
      )}

    </View>

  );
}

