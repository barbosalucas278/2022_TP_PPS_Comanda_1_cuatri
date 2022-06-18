/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import {
  View, Text, TouchableOpacity, FlatList, Image
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { app } from '../../../firebase';
import { styles } from './styles';
import { saveItemInCollection, updateItem } from '../../services/FirestoreServices';
import theme from '../../config/theme';

export default function Approvals() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    app.firestore().collection( 'users' ).where( 'rol', '==', 'Cliente' ).where( 'ownerDecided', '==', false )
      .onSnapshot(( querySnapshots ) => {
        const users = querySnapshots.docs.map(( doc ) => ({ data: doc.data(), id: doc.id }));

        setClients( users );
      }, ( err ) => {
        console.log( err );
      });
  }, []);

  const handleApproval = ( id, email, isApproved ) => {
    updateItem( 'users', id, { approved: isApproved, ownerDecided: true })
      .then(() => {
        const emailTemplate = {
          from: 'approvals',
          email,
          isApproved
        };
        saveItemInCollection( 'mails', email, emailTemplate );
      })
      .catch(( err ) => { console.log( err ); });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={clients}
        ItemSeparatorComponent={() => <Text> </Text>}
        renderItem={(({ item: c }) => <ClientCard data={c.data} id={c.id} handleApproval={handleApproval} /> )}
      />
    </View>
  );
}

function ClientCard( props ) {
  const {
    data, id, handleApproval
  } = props;

  return (
    <View style={styles.clientCard}>
      <View style={styles.formControlPhoto}>
        <Image
          style={styles.formControlPhotoWithPhoto}
          source={{ uri: data.photo.uri }}
          resizeMode='cover'
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button} onPress={() => handleApproval( id, data.email, true )}>
          <Text style={styles.text}>Aprobar</Text>
          <MaterialCommunityIcons name='account-plus' size={35} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleApproval( id, data.email, false )}>
          <Text style={styles.text}>No aprobar</Text>
          <MaterialCommunityIcons name='account-minus' size={35} color={theme.colors.icons} />
        </TouchableOpacity>
      </View>
      <Text style={styles.textName}>{`${data.name} ${data.surname}`}</Text>
    </View>
  );
}
