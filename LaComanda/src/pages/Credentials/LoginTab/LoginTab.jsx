import {
  KeyboardAvoidingView,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
  Keyboard,
  Vibration
} from 'react-native';
import React, {
  useContext, useState, useEffect
} from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { styles } from './styles';
import GlobalContext from '../../../context/GlobalContext';
import { handleLoginErrorMessage } from './utils';
import theme from '../../../config/theme';
import { signInUser } from '../../../services/AuthService';
import Gifplay from '../../../../assets/gifplayBig.gif';
import { getUserByEmail, updateItem } from '../../../services/FirestoreServices';

function LoginTab() {
  const { setUser } = useContext( GlobalContext );
  const [email, setEmail] = useState( '' );
  const [password, setPassword] = useState( '' );
  const [errorMessage, setErrorMessage] = useState( '' );
  const [error, setError] = useState( false );
  const [loading, setLoading] = useState( false );
  const navigation = useNavigation();
  const [getData, getUserData] = useState( false );

  useEffect(() => {
    if ( email && password ) {
      getUserByEmail( 'users', email, ( data ) => {
        if ( data ) {
          const respuesta = data.docs.map(( doc ) => doc.data())[0];
          if ( respuesta && respuesta.approved ) {
            setUser({
              name: respuesta.name,
              surname: respuesta.surname,
              approved: respuesta.approved,
              cuil: respuesta.cuil,
              dni: respuesta.dni,
              email: respuesta.email,
              photo: respuesta.photo,
              role: respuesta.rol,
              password: respuesta.password
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Su usuario todavía no fué aprobado',
              position: 'bottom'
            });
            Vibration.vibrate( 1000 );
            setError( true );
            setLoading( false );
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Usuario no encontrado',
            position: 'bottom'
          });
          Vibration.vibrate( 1000 );

          setError( true );
          setLoading( false );
        }
      }, ( err ) => {
        Toast.show({
          type: 'error',
          text1: err,
          position: 'bottom'
        });
        Vibration.vibrate( 1000 );

        setError( true );
        setLoading( false );
      });
      setTimeout(() => {
        signIn( email, password );
      }, 5000 );
    }
  }, [getData]);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if ( email.length === 0 || password.length === 0 ) {
      setError( true );
      setErrorMessage( 'Todos los campos son obligatorios' );
      return;
    }
    setLoading( true );
    getUserData( true );
  };

  const signIn = async ( userEmail, userPassword ) => {
    await signInUser( userEmail, userPassword )
      .then( async ( userCredential ) => {
        setLoading( false );
        await registerForPushNotificationAsync( userCredential );
        console.log( 'User logged in with: ', userCredential.user.uid );
        navigation.replace( 'Home' );
      })
      .catch(( err ) => {
        setLoading( false );
        setError( true );
        setErrorMessage( handleLoginErrorMessage( err.code ));
        console.log( err.code );
        console.log( err.message );
      });
  };

  const registerForPushNotificationAsync = async ( user ) => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if ( existingStatus !== 'granted' ) {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if ( finalStatus !== 'granted' ) {
        console.log( 'Failed to get push token for push notification!' );
        return;
      }
      const token = ( await Notifications.getExpoPushTokenAsync()).data;
      updateItem( 'users', user.user.uid, { pushToken: token });
    } catch ( err ) {
      console.log( err );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='height'>

      {loading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator style={styles.spinner} size={180} color={theme.colors.icons} />
        </View>
      )}

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>

          <Image
            style={{ width: 290, height: 290 }}
            source={Gifplay}
          />

          <TextInput
            placeholder='Mail'
            placeholderTextColor='black'
            style={styles.input}
            value={email}
            onChangeText={( text ) => setEmail( text )}
            keyboardType='email-address'
          />
          <TextInput
            placeholder='Contraseña'
            placeholderTextColor='black'
            style={styles.input}
            value={password}
            onChangeText={( text ) => setPassword( text )}
            secureTextEntry
          />
          {error && <Text style={styles.error}>{errorMessage}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEmail( 'Invitado5@invitado.com' );
              setPassword( '12345678' );
            }}
          >
            <Text>Rapido</Text>
          </TouchableOpacity>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginTab;
