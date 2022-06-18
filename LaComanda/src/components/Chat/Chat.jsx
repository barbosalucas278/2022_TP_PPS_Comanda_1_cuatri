/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React, {
  useState,
  useContext,
  useLayoutEffect,
  useCallback
} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  Time,
  InputToolbar,
  Composer
} from 'react-native-gifted-chat';
import { getAllMessages, addMessage, getAllWaiter } from '../../services/FirestoreServices';
import theme from '../../config/theme';
import GlobalContext from '../../context/GlobalContext';
import { sendPushNotification } from '../../services/PushNotificationService';

export default function Chat() {
  const { user, client } = useContext( GlobalContext );
  const [userRole] = useState( user.role );
  const [messages, setMessages] = useState([]);
  const [spinner, setSpinner] = useState( true );

  useLayoutEffect(() => {
    getAllMessages(
      'chats',
      ( data ) => {
        const response = data.docs.map(( doc ) => doc.data());
        setMessages(
          response
            .map(( M ) => ({
              _id: M._id,
              createdAt: M.createdAt.toDate(),
              text: M.text,
              user: { _id: M.user._id, name: M.user._id }
            }))
        );
      },
      ( error ) => console.log( error )
    ).then(() => {
      setTimeout(() => {
        setSpinner( false );
      }, 3000 );
    });
  }, []);

  const onSend = useCallback(( messages = []) => {
    Keyboard.dismiss();
    setMessages(( previousMessages ) => GiftedChat.append( previousMessages, messages ));

    const {
      _id, createdAt, text, user
    } = messages[0];

    addMessage( 'chats', {
      _id,
      createdAt,
      text,
      user
    });

    if ( userRole === 'Cliente' || userRole === 'Invitado' ) {
      getAllWaiter(( data ) => {
        const response = data.docs.map(( doc ) => doc.data());
        console.log( response );
        const usersToken = response.map(( u ) => u.pushToken ).filter(( us ) => us !== undefined );
        sendPushNotification( usersToken, 'Nueva consulta', 'Un cliente realizó una consulta al chat' );
      }, ( err ) => { console.log( err ); });
    }
  }, []);

  const renderBubble = ( props ) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: theme.colors.primary
        },
        left: {
          backgroundColor: theme.colors.icons
        }
      }}
      textStyle={{
        right: {
          color: theme.colors.secondary
        },
        left: {
          color: theme.colors.secondary
        }
      }}
      usernameStyle={{ color: theme.colors.secondary }}
    />
  );

  const renderSend = ( props ) => (
    <Send
      {...props}
      textStyle={{
        color: 'white',
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        paddingTop: 12,
        height: 50,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
      label='Enviar'
    />
  );

  const renderComposer = ( props ) => (
    <Composer
      {...props}
      placeholder='Escribí tu mensaje'
      placeholderTextColor='black'
      composerHeight={60}
    />
  );

  const renderInputToolbar = ( props ) => (
    <InputToolbar
      {...props}
      primaryStyle={{
        backgroundColor: 'lightgrey',
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
        color: 'white'
      }}
      optionTintColor='white'
    />
  );

  const renderTime = ( props ) => (
    <Time
      {...props}
      timeTextStyle={{
        left: {
          color: 'black'
        },
        right: {
          color: 'white'
        }
      }}
    />
  );

  return (
    <View style={styles.container}>

      {spinner && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={180} color={theme.colors.icons} />
        </View>
      )}
      <GiftedChat
        dateFormat='LL'
        renderComposer={renderComposer}
        renderInputToolbar={renderInputToolbar}
        renderTime={renderTime}
        renderUsernameOnMessage
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={( messages ) => onSend( messages )}
        renderSend={renderSend}
        messagesContainerStyle={styles.messagesContainer}
        user={{
          _id: user.role === 'Mozo' ? ( `${user.name} - Mozo` ) : ( `${client.name}- Mesa ${client.assignedTable}` )
        }}
        renderBubble={renderBubble}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height
  },
  input: {
    color: 'blue'
  },
  messagesContainer: {
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height * 0.7,
    justifyContent: 'flex-end'
  },
  spinnerContainer: {
    width: Dimensions.get( 'screen' ).width,
    height: Dimensions.get( 'screen' ).height * 0.8,
    justifyContent: 'center'
  }
});
