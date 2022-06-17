/* eslint-disable react/prop-types */
import { View } from 'react-native';
import React from 'react';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import theme from '../../config/theme';

export default function Fab( props ) {
  const { type } = props;

  const navigation = useNavigation();

  const renderIcon = () => <MaterialCommunityIcons name='hammer-wrench' size={40} color='white' />;

  const renderDynamicFab = () => {
    switch ( type ) {
      case 'Dueño':
      case 'Supervisor':
        return (
          <ActionButton
            offsetY={10}
            offsetX={10}
            verticalOrientation='down'
            buttonColor={theme.colors.icons}
            position='left'
            degrees={0}
            onPress={() => {}}
            renderIcon={renderIcon}
            style={{ zIndex: 9999, width: 120, height: 100 }}
          >
            <ActionButton.Item
              spaceBetween={2}
              buttonColor={theme.colors.icons}
              useNativeFeedback
              title='Aprobaciones'
              textStyle={{
                fontSize: 14,
                width: 90,
                height: 100
              }}
              style={{ zIndex: 9999 }}
              onPress={() => {
                navigation.navigate( 'Approvals' );
              }}
            >
              <MaterialCommunityIcons name='check-decagram' size={40} color='white' />
            </ActionButton.Item>
            <ActionButton.Item
              spaceBetween={2}
              buttonColor={theme.colors.icons}
              useNativeFeedback
              title='Altas'
              textStyle={{
                fontSize: 14
              }}
              style={{ zIndex: 9999 }}
              onPress={() => {
                navigation.navigate( 'Additions' );
              }}
            >
              <MaterialCommunityIcons name='account-plus' size={40} color='white' />
            </ActionButton.Item>
          </ActionButton>
        );
      case 'Metre':
        return (
          <ActionButton
            offsetY={10}
            offsetX={10}
            verticalOrientation='down'
            buttonColor={theme.colors.icons}
            position='left'
            degrees={0}
            onPress={() => {}}
            renderIcon={renderIcon}
            style={{ zIndex: 9999, width: 120, height: 100 }}
          >
            <ActionButton.Item
              spaceBetween={2}
              buttonColor={theme.colors.icons}
              useNativeFeedback
              title='Aceptar Clientes'
              textStyle={{
                fontSize: 14,
                width: 105,
                height: 100
              }}
              style={{ zIndex: 9999 }}
              onPress={() => {
                navigation.navigate( 'ClientsOnHold' );
              }}
            >
              <MaterialCommunityIcons name='check-decagram' size={40} color='white' />
            </ActionButton.Item>
          </ActionButton>
        );
      case 'Mozo':
        return (
          <ActionButton
            offsetY={10}
            offsetX={10}
            verticalOrientation='down'
            buttonColor={theme.colors.icons}
            position='left'
            degrees={0}
            onPress={() => {}}
            renderIcon={renderIcon}
            style={{ zIndex: 9999, width: 120, height: 100 }}
          >
            <ActionButton.Item
              spaceBetween={2}
              buttonColor={theme.colors.icons}
              useNativeFeedback
              title='Chat'
              textStyle={{
                fontSize: 14,
                width: 105,
                height: 100
              }}
              style={{ zIndex: 9999 }}
              onPress={() => {
                navigation.navigate( 'WaiterChat' );
              }}
            >
              <ChatIcon name='chatbubbles-outline' size={40} color='white' />
            </ActionButton.Item>
            <ActionButton.Item
              spaceBetween={2}
              buttonColor={theme.colors.icons}
              useNativeFeedback
              title='Pedidos'
              textStyle={{
                fontSize: 14,
                width: 105,
                height: 100
              }}
              style={{ zIndex: 9999 }}
              onPress={() => {
                navigation.navigate( 'WaiterOrderView' );
              }}
            >
              <ChatIcon name='chatbubbles-outline' size={40} color='white' />
            </ActionButton.Item>
          </ActionButton>
        );
      case 'Cocinero':
      case 'Bartender':
        return (
          <ActionButton
            offsetY={10}
            offsetX={10}
            verticalOrientation='down'
            buttonColor={theme.colors.icons}
            position='left'
            degrees={0}
            onPress={() => {}}
            renderIcon={renderIcon}
            style={{ zIndex: 9999, width: 120, height: 100 }}
          >
            <ActionButton.Item
              spaceBetween={2}
              buttonColor={theme.colors.icons}
              useNativeFeedback
              title='Agregar Producto'
              textStyle={{
                fontSize: 14,
                width: 112,
                height: 100
              }}
              style={{ zIndex: 9999 }}
              onPress={() => {
                navigation.navigate( 'Additions' );
              }}
            >
              <MaterialCommunityIcons name='check-decagram' size={40} color='white' />
            </ActionButton.Item>
          </ActionButton>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{}}>
      {renderDynamicFab()}
    </View>
  );
}
