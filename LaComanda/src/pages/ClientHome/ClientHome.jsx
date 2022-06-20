import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import styles from './styles.js';
import StandbyScreen from '../../components/StandbyScreen/StandbyScreen.jsx';
import GlobalContext from '../../context/GlobalContext.js';
import { OrderStatus } from '../../util/Enums.js';
import Scanner from '../../components/Scanner/Scanner.js';
import theme from '../../config/theme.js';
import { updateItem } from '../../services/FirestoreServices.js';
import ListOfSurveys from '../TableMenu/SurveysTab/ListOfSurveys/ListOfSurveys.jsx';

export default function ClientHome() {
  const [waiting, setWaiting] = useState( null );
  const [spinner, setSpinner] = useState( false );
  const { client } = useContext( GlobalContext );
  const navigation = useNavigation();
  useEffect(() => {
    switch ( client.orderState ) {
      case OrderStatus.WaitingList:
        setWaiting( true );
        break;
      case OrderStatus.WaitingForScanTable:
        setWaiting( false );
        break;
      default:
        break;
    }
  }, [client.orderState]);
  const handleScan = ( _scanResult ) => {
    setSpinner( true );
    if ( _scanResult === client.assignedTable ) {
      updateItem( 'clients', client.email, { orderState: OrderStatus.ScannedAssignedTable });
      Toast.show({
        type: 'success',
        text1: 'Mesa tomada correctamente',
        position: 'bottom'
      });
      navigation.navigate( 'TableMenu' );
    } else {
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: 'No es la mesa asignada',
          position: 'bottom'
        });
        setSpinner( false );
      }, 1000 );
    }
  };
  return (
    <View>
      { waiting
        ? (
          <View style={styles.containerWaitingScreen}>
            <StandbyScreen text='Se encuentra en lista de espera para ingresar' />
            <ListOfSurveys />
          </View>
        ) : (
          <View style={styles.containerScannerTable}>
            <Text style={styles.textScanTable}>Debe Scannear la mesa que se le fue asignada</Text>
            {
              spinner ? (
                <View style={styles.containerSpinner}>
                  <ActivityIndicator size={180} color={theme.colors.primary} />
                </View>
              )
                : <Scanner onScan={handleScan} />
            }
          </View>
        ) }
    </View>
  );
}

