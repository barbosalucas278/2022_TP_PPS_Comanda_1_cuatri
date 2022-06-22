import {
  View, TouchableOpacity, Text, Vibration
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import UserProfile from '../../components/UserProfile/UserProfile';
import Fab from '../../components/Fab/Fab';
import GlobalContext from '../../context/GlobalContext';
import Scanner from '../../components/Scanner/Scanner';
import Styles from './styles';
import {
  getAllClients,
  getAllMetres, getClientByEmail, getUserByEmail, saveItemInCollection
} from '../../services/FirestoreServices';
import { OrderStatus } from '../../util/Enums';
import { sendPushNotification } from '../../services/PushNotificationService';

export default function Home() {
  const {
    user, client, setClient, setClients
  } = useContext( GlobalContext );
  const [scanner, setScanner] = useState( false );
  const [btnScannerText, setBtnScannerText] = useState( 'Ingresar' );
  const navigation = useNavigation();

  useEffect(() => {
    switch ( user.role ) {
      case 'Dueño':
      case 'Supervisor':
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponseOwnerSupervisor );
        break;
      case 'Mozo':
        getAllClients(( data ) => {
          const response = data.docs.map(( doc ) => doc.data());
          if ( response ) {
            setClients( response );
          }
        }, ( error ) => console.log( error ));
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponseWaiter );
        break;
      case 'Cocinero':
      case 'Bartender':
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponseEmployee );
        break;
      case 'Metre':
        Notifications.addNotificationResponseReceivedListener( handleNotificationResponseMetre );
        break;
      case 'Cliente':
      case 'Invitado':
        getClientByEmail( user.email, ( data ) => {
          const response = data.docs.map(( doc ) => doc.data())[0];
          if ( response ) {
            setClient( response );
          }
        }, ( error ) => console.log( error ));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    getUserByEmail( 'clients', user.email, ( data ) => {
      const response = data.docs.map(( doc ) => doc.data())[0];
      if ( response && response.email === user.email && response.orderState !== OrderStatus.FinishedProcess ) {
        setBtnScannerText( 'Menú' );
      } else {
        setBtnScannerText( 'Ingresar' );
      }
    }, ( error ) => console.log( error ));
  }, [btnScannerText]);

  const mainAction = () => {
    console.log( client.orderState );
    if ( client.orderState === undefined ) {
      setScanner( true );
    }
    switch ( client.orderState ) {
      case undefined:
        setScanner( true );
        break;
      case OrderStatus.WaitingList:
      case OrderStatus.WaitingForScanTable:
        navigation.navigate( 'ClientsHome' );
        break;
      case OrderStatus.ScannedAssignedTable:
      case OrderStatus.OrderSended:
      case OrderStatus.OrderConfirmed:
      case OrderStatus.OrderRecived:
      case OrderStatus.OrderRecivedConfirmed:
      case OrderStatus.CheckWaiting:
      case OrderStatus.ClientEating:
      case OrderStatus.WaitingCheck:
      case OrderStatus.AlreadyPaid:
        navigation.navigate( 'TableMenu', { dontRedirect: true });
        break;
      default:
        setScanner( true );
        break;
    }
  };

  const handleNotificationResponseOwnerSupervisor = () => {
    navigation.navigate( 'Approvals' );
  };
  const handleNotificationResponseMetre = () => {
    navigation.navigate( 'ClientsOnHold' );
  };
  const handleNotificationResponseWaiter = () => {
    navigation.navigate( 'WaiterChat' );
  };
  const handleNotificationResponseEmployee = () => {
    // navigation.navigate( 'Confirmations' );
  };

  const renderButtonScanner = () => {
    if ( user.role === 'Cliente' || user.role === 'Invitado' ) {
      return (
        <TouchableOpacity
          style={Styles.button}
          onPress={() => mainAction()}
        >
          <Text style={Styles.text}>{btnScannerText}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const handleScannerResult = ( scannerResult ) => {
    if ( scannerResult === 'ingreso' ) {
      setScanner( false );
      const newClient = {
        name: user.name,
        email: user.email,
        role: user.role,
        surname: user.surname,
        photo: user.photo,
        orderState: OrderStatus.WaitingList,
        surveysDone: false
      };
      saveItemInCollection( 'clients', user.email, newClient ).then(() => {
        setClient( newClient );
        getAllMetres(( data ) => {
          const response = data.docs.map(( doc ) => doc.data());
          const usersToken = response.map(( u ) => u.pushToken ).filter(( us ) => us !== undefined );
          console.log( usersToken );
          sendPushNotification( usersToken, 'Nuevo Ingreso', 'Ha ingresado un cliente a la lista de espera' );
        }, ( err ) => { console.log( err ); });
      });
      setTimeout(() => {
        navigation.navigate( 'ClientsHome' );
      }, 2000 );
    } else {
      Toast.show({
        type: 'error',
        text1: 'El Qr es inválido',
        position: 'bottom'
      });
      Vibration.vibrate( 1000 );
    }
  };

  return (
    <View>
      <Fab
        style={{}}
        type={user.role}
      />
      { scanner ? (
        <View>
          <Scanner onScan={( result ) => handleScannerResult( result )} />
        </View>
      ) : (
        <View style={Styles.container}>
          <UserProfile />
          {renderButtonScanner()}
        </View>
      )}
    </View>
  );
}
