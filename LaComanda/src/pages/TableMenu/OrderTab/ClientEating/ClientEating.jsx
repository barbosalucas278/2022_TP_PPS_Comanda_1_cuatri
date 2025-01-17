import {
  Text, TouchableOpacity, View, TextInput, Vibration
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import styles from './styles';
import GlobalContext from '../../../../context/GlobalContext';
import ItemProductStatus from '../../../../components/ItemProductStatus/ItemProductStatus';
import Scanner from '../../../../components/Scanner/Scanner';
import { updateItem } from '../../../../services/FirestoreServices';
import { OrderStatus } from '../../../../util/Enums';
import { navigate } from '../../../../config/RootNavigation';

export default function ClientEating() {
  const { client } = useContext( GlobalContext );
  const [scanner, setScanner] = useState( false );
  const [showPropina, setShowPropina] = useState( false );
  const [propina, setPropina] = useState( 0 );
  const [totalNow, setTotalNow] = useState( 0 );
  useEffect(() => {
    setTotalNow( client.order.total );
    if ( client.discount ) {
      setTotalNow( client.order.total - ( client.order.total * ( client.discount / 100 )));
    }
  }, [client.discount]);

  const getTheCheck = () => {
    updateItem( 'clients', client.email, { totalToPaid: totalNow, tip: propina, orderState: OrderStatus.WaitingCheck });
    navigate( 'TableMenu', { dontRedirect: false });
  };
  const handleScannerResult = ( scannerResult ) => {
    if ( scannerResult === client.assignedTable ) {
      setScanner( false );
      setShowPropina( true );
    } else {
      Toast.show({
        type: 'error',
        text1: 'Mesa scanneada es invalida',
        position: 'bottom'
      });
      Vibration.vibrate( 1000 );
    }
  };

  return (
    <View>
      { scanner ? (
        <View>
          <Scanner onScan={( result ) => handleScannerResult( result )} />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.containerDetails}>
            <Text style={styles.text}>Pedido realizado</Text>
            {client.order.products.map(( product ) => ( <ItemProductStatus product={product} withPrice /> ))}
            <Text style={[styles.text, { fontWeight: 'bold', marginTop: 0 }]}>
              Subtotal: $
              {client.order.total}
            </Text>
            {client.discount > 0 && (
              <Text style={[styles.text, { fontWeight: 'bold', marginTop: 5 }]}>
                Descuento: %
                {client.discount}
              </Text>
            )}
            {showPropina
            && (
              <View style={styles.containerPropina}>
                <Text style={styles.text}>Ingrese la Propina</Text>
                <View style={styles.formControl}>
                  <TextInput
                    placeholder='Propina'
                    keyboardType='numeric'
                    value={propina}
                    onChangeText={( text ) => {
                      setTotalNow( parseFloat( text ) + client.order.total );
                      setPropina( text );
                    }}
                  />
                </View>
              </View>
            )}

            <Text style={[styles.text, { fontWeight: 'bold', marginBottom: 30 }]}>
              Total: $
              {' '}
              {totalNow}
            </Text>
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => getTheCheck()}
            >
              <Text style={styles.textButton}>Pedir la cuenta</Text>
            </TouchableOpacity>
            {!showPropina
            && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setScanner( true )}
              >
                <Text style={styles.textButton}>Dejar propina</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

