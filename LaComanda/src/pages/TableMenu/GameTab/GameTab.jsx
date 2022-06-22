import { Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import styles from './styles';
import GameOne from '../../../components/Games/GameOne';
import { updateItem } from '../../../services/FirestoreServices';

import GlobalContext from '../../../context/GlobalContext';

export default function GameTab() {
  const { client } = useContext( GlobalContext );
  const [nivel, setNivel] = useState();
  const [playing, setPlaying] = useState( false );
  const handleGameOneEnded = ( _result ) => {
    if ( _result ) {
      setNivel( 2 );
      updateItem( 'clients', client.email, { discount: 10 });
      Toast.show({
        type: 'success',
        text1: 'Ganaste un 10% de descuento en el total de la cuenta!',
        position: 'bottom'
      });
    } else {
      setNivel( -1 );
      updateItem( 'clients', client.email, { discount: 0, gameover: true });
    }
    setPlaying( false );
  };
  const renderGame = () => {
    switch ( nivel ) {
      case 1:
        return <GameOne onGameEnded={handleGameOneEnded} />;
      case 2:
        return <View />;
      case 3:
        return <View />;
      default:
        return <View />;
    }
  };
  return (
    <View style={styles.container}>
      {renderGame()}
      {( !playing && !client.gameover )
      && (
        <TouchableOpacity onPress={() => {
          setPlaying( true );
          setNivel( 1 );
        }}
        >
          <View style={styles.containerStartGame}>

            {nivel === 2 ? <Text style={styles.textStartGame}>Empezar el segundo nivel!</Text>
              : (
                <Text style={styles.textStartGame}>
                  Empezar a jugar!
                </Text>
              )}
          </View>
        </TouchableOpacity>
      )}
      {( nivel === -1 || client.gameover ) && <Text style={styles.textStartGame}>No tiene mas oportunidades, la próxima será!</Text>}
    </View>
  );
}

