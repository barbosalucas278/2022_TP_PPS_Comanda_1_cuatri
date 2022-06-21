/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import {
  Text, View, TouchableOpacity, Vibration
} from 'react-native';
import React, { useState, useContext } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Styles from './styles';
import UserForm from '../../components/UserForm/UserForm';
import { UserTypes } from '../../util/Enums';
import CreateTable from '../CreateTable/CreateTable';
import theme from '../../config/theme';
import CreateProduct from '../CreateProduct/CreateProduct';
import GlobalContext from '../../context/GlobalContext';
import { createUserWithEmailAndPassword } from '../../services/AuthService';
import { saveImageInStorage } from '../../services/StorageServices';
import { saveItemInCollection } from '../../services/FirestoreServices';

export default function Addition() {
  const [userTypeForm, setUserTypeForm] = useState( UserTypes.None );
  const { user } = useContext( GlobalContext );
  const navigation = useNavigation();

  const handleSubmit = ( newUser ) => {
    registerUser( newUser );
  };

  const registerUser = ( newUser ) => {
    try {
      createUserWithEmailAndPassword( newUser.email, newUser.password ).then(( user ) => {
        createBlob( newUser.photo ).then(( blob ) => {
          saveImageInStorage( user.user.uid, blob ).then(( uri ) => {
            newUser.photo = uri;
            saveItemInCollection( 'users', user.user.uid, newUser ).then(() => {
              Toast.show({
                type: 'success',
                text1: 'Se ha creado el usuario del Empleado correctamente',
                position: 'bottom'
              });
            });
          })
            .catch(( error ) => { throw error; });
        }).catch(( error ) => { throw error; });
      }).then(() => {
        navigation.navigate( 'Home' );
      });
    } catch ( error ) {
      Toast.show({
        type: 'error',
        text1: error,
        position: 'bottom'
      });
      Vibration.vibrate( 1000 );
    }
  };

  async function createBlob( photoUri ) {
    return ( await fetch( photoUri )).blob();
  }

  const renderForm = ( userType ) => {
    switch ( userType ) {
      case UserTypes.Client:
      case UserTypes.OwnerOrSupervisor:
      case UserTypes.Employee:
        return (
          <View>
            <UserForm userType={userType} onSubmit={handleSubmit} />
          </View>
        );
      case UserTypes.Table:
        return (
          <View>
            <CreateTable />
          </View>
        );
      case UserTypes.Product:
        return (
          <View>
            <CreateProduct />
          </View>
        );
      default:
        return <View />;
    }
  };

  const renderHeaderIcon = () => (
    <TouchableOpacity onPress={() => handleBack()}>
      <MaterialCommunityIcons name='arrow-left-circle' color={theme.colors.secondary} size={50} />
    </TouchableOpacity>
  );

  const handleBack = () => {
    navigation.replace( 'Additions', { screen: 'Home', displayFormOnType: UserTypes.None });
  };

  const handleHeaderIcon = () => {
    navigation.setOptions({ headerLeft: renderHeaderIcon });
  };

  const handleChosen = ( type ) => {
    handleHeaderIcon();
    setUserTypeForm( type );
  };
  const renderDynamicButtons = () => {
    switch ( user.role ) {
      case 'Dueño':
      case 'Supervisor':
        return (
          <>
            <TouchableOpacity
              onPress={() => handleChosen( UserTypes.OwnerOrSupervisor )}
              style={Styles.button}
            >
              <View>
                <Text style={Styles.buttonText}>Registrar</Text>
                <Text style={Styles.buttonTextSecondary}>Dueño o Supervisor</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChosen( UserTypes.Employee )}
              style={Styles.button}
            >
              <View>
                <Text style={Styles.buttonText}>Registrar</Text>
                <Text style={Styles.buttonTextSecondary}>Empleado</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleChosen( UserTypes.Table )}
              style={Styles.button}
            >
              <View>
                <Text style={Styles.buttonText}>Registrar</Text>
                <Text style={Styles.buttonTextSecondary}>Mesa</Text>
              </View>
            </TouchableOpacity>
          </>
        );
      case 'Metre':
        return (
          <TouchableOpacity
            onPress={() => handleChosen( UserTypes.Client )}
            style={Styles.button}
          >
            <View>
              <Text style={Styles.buttonText}>Registrar</Text>
              <Text style={Styles.buttonTextSecondary}>Cliente</Text>
            </View>
          </TouchableOpacity>
        );
      case 'Cocinero':
      case 'Bartender':
        return (
          <TouchableOpacity
            onPress={() => handleChosen( UserTypes.Product )}
            style={Styles.button}
          >
            <View>
              <Text style={Styles.buttonText}>Registrar</Text>
              <Text style={Styles.buttonTextSecondary}>Producto</Text>
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };
  return (
    <View style={Styles.container}>
      {userTypeForm !== UserTypes.None ? renderForm( userTypeForm )
        : (
          <View style={Styles.containerChoose}>
            {renderDynamicButtons()}
          </View>
        )}
    </View>
  );
}

