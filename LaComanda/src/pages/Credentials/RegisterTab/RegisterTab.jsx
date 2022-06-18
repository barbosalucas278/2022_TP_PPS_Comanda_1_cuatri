/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import {
  View, TouchableOpacity, Text, ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserForm from '../../../components/UserForm/UserForm';
import { UserTypes } from '../../../util/Enums';
import Styles from './Styles';
import { createUserWithEmailAndPassword, signOutUser } from '../../../services/AuthService';
import { saveImageInStorage } from '../../../services/StorageServices';
import { getAllAprrovedUsers, saveItemInCollection } from '../../../services/FirestoreServices';
import theme from '../../../config/theme';
import { sendPushNotification } from '../../../services/PushNotificationService';

function RegisterTab({ route }) {
  const { displayFormOnType } = route.params;
  const [userTypeForm, setUserTypeForm] = useState( displayFormOnType );
  const [spinner, showSpinner] = useState( false );
  const navigation = useNavigation();

  const handleSubmit = ( newUser ) => {
    registerUser( newUser );
  };

  const registerUser = ( newUser ) => {
    showSpinner( true );
    createUserWithEmailAndPassword( newUser.email, newUser.password ).then(( user ) => {
      createBlob( newUser.photo ).then(( blob ) => {
        saveImageInStorage( user.user.uid, blob ).then(( uri ) => {
          newUser.photo = uri;
          saveItemInCollection( 'users', user.user.uid, newUser );
        })
          .catch(( error ) => console.log( error ));
      }).catch(( error ) => { console.log( error ); });
    }).then(() => {
      getAllAprrovedUsers(( data ) => {
        const response = data.docs.map(( doc ) => doc.data());
        const usersToken = response.filter(( u ) => u.rol === 'Dueño' || u.rol === 'Supervisor' ).map(( u ) => u.pushToken ).filter(( us ) => us !== undefined );
        console.log( usersToken );
        sendPushNotification( usersToken, 'Nuevo Registro', 'Se ha registrado un nuevo cliente, no olvides aprobarlo' );
      }, ( err ) => { console.log( err ); });
      signOutUser();
      showSpinner( false );
      navigation.navigate( 'Ingresar' );
    });
  };

  async function createBlob( photoUri ) {
    return ( await fetch( photoUri )).blob();
  }

  const renderForm = ( userType ) => (
    <View>
      <UserForm userType={userType} onSubmit={handleSubmit} />
    </View>
  );

  const renderHeaderIcon = () => (
    <TouchableOpacity onPress={() => handleBack()}>
      <MaterialCommunityIcons name='arrow-left-circle' color={theme.colors.secondary} size={50} />
    </TouchableOpacity>
  );

  const handleBack = () => {
    navigation.replace( 'Credentials', { screen: 'Registrarse', displayFormOnType: UserTypes.None });
  };

  const handleHeaderIcon = () => {
    navigation.setOptions({ headerLeft: renderHeaderIcon });
  };

  const handleChosen = ( type ) => {
    handleHeaderIcon();
    setUserTypeForm( type );
  };

  return (
    <View>
      { spinner ? (
        <View style={Styles.containerSpinner}>
          <ActivityIndicator style={Styles.spinner} size={180} color={theme.colors.icons} />
        </View>
      ) : (
        <View style={Styles.container}>
          {userTypeForm !== UserTypes.None ? renderForm( userTypeForm )
            : (
              <View style={Styles.containerChoose}>
                <TouchableOpacity
                  onPress={() => handleChosen( UserTypes.Guest )}
                  style={Styles.button}
                >
                  <View>
                    <Text style={Styles.buttonText}>Registrate como</Text>
                    <Text style={Styles.buttonTextSecondary}>Invitado</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChosen( UserTypes.Client )}
                  style={Styles.button}
                >
                  <View>
                    <Text style={Styles.buttonText}>Registrate como</Text>
                    <Text style={Styles.buttonTextSecondary}>Cliente</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </View>
      )}
    </View>
  );
}

export default RegisterTab;
