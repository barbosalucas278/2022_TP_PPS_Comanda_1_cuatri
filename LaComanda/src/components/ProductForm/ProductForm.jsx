/* eslint-disable react/prop-types */
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ScrollView

} from 'react-native';
import React, { useState, useEffect } from 'react';
import Styles from './Styles';
import userImgDefault from '../../../assets/iconoCamara.png';
import CamaraView from '../CameraView/CamaraView';
import { ProductStatus } from '../../util/Enums';

export default function ProductForm( props ) {
  const { onSubmit } = props;
  const [formValid, setFormValid] = useState( false );

  const [name, setName] = useState( '' );
  const [errorName, hasErrorName] = useState({ message: '', error: false });

  const [description, setDescription] = useState( '' );
  const [errorDescription, hasErrorDescription] = useState({
    message: '',
    error: false
  });

  const [elaborationTime, setElaborationTime] = useState( '' );
  const [errorElaborationTime, hasErrorElaborationTime] = useState({ message: '', error: false });

  const [price, setPrice] = useState( '' );
  const [errorPrice, hasErrorPrice] = useState({ message: '', error: false });

  const [firstPhoto, setFirstPhoto] = useState( '' );
  const [errorFirstPhoto, hasErrorFirstPhoto] = useState({ message: '', error: false });

  const [secondPhoto, setSecondPhoto] = useState( '' );
  const [errorSecondPhoto, hasErrorSecondPhoto] = useState({ message: '', error: false });

  const [thirdPhoto, setThirdPhoto] = useState( '' );
  const [errorThirdPhoto, hasErrorThirdPhoto] = useState({ message: '', error: false });

  const [cameraActivated, setCameraActivate] = useState( false );
  const [numberPhotoTaken, setPhotoTaken] = useState( '' );

  useEffect(() => {
    if ( formValid ) {
      setFormValid( true );
      validateElaborationTime();
      validateName();
      validateDescription();
      validatePrice();
      validateFirstPhoto();
      validateSecondPhoto();
      validateThirdPhoto();
    }
  }, [name, description, elaborationTime, price, firstPhoto, secondPhoto, thirdPhoto]);

  function renderSpecificFormControl() {
    return (
      <>
        <View style={Styles.containerPhotos}>
          <View style={Styles.formControlPhoto}>
            <TouchableWithoutFeedback onPress={() => takePhoto( 1 )}>
              {firstPhoto === '' ? (
                <Image
                  style={Styles.formControlPhotoWithoutPhoto}
                  source={userImgDefault}
                  resizeMode='center'
                />
              ) : (
                <Image
                  style={Styles.formControlPhotoWithPhoto}
                  source={{ uri: firstPhoto }}
                  resizeMode='center'
                />
              )}
            </TouchableWithoutFeedback>
            {errorFirstPhoto.error && (
              <Text style={Styles.textPhotoError}>{errorFirstPhoto.message}</Text>
            )}
          </View>
          <View style={Styles.formControlPhoto}>
            <TouchableWithoutFeedback onPress={() => takePhoto( 2 )}>
              {secondPhoto === '' ? (
                <Image
                  style={Styles.formControlPhotoWithoutPhoto}
                  source={userImgDefault}
                  resizeMode='center'
                />
              ) : (
                <Image
                  style={Styles.formControlPhotoWithPhoto}
                  source={{ uri: secondPhoto }}
                  resizeMode='center'
                />
              )}
            </TouchableWithoutFeedback>
            {errorSecondPhoto.error && (
              <Text style={Styles.textPhotoError}>{errorSecondPhoto.message}</Text>
            )}
          </View>
          <View style={Styles.formControlPhoto}>
            <TouchableWithoutFeedback onPress={() => takePhoto( 3 )}>
              {thirdPhoto === '' ? (
                <Image
                  style={Styles.formControlPhotoWithoutPhoto}
                  source={userImgDefault}
                  resizeMode='center'
                />
              ) : (
                <Image
                  style={Styles.formControlPhotoWithPhoto}
                  source={{ uri: thirdPhoto }}
                  resizeMode='center'
                />
              )}
            </TouchableWithoutFeedback>
            {errorThirdPhoto.error && (
              <Text style={Styles.textPhotoError}>{errorThirdPhoto.message}</Text>
            )}
          </View>
        </View>
        <View style={Styles.formControl}>
          <TextInput
            placeholder='Nombre del producto'
            value={name}
            onChangeText={( text ) => setName( text )}
            onBlur={() => validateName()}
          />
          {errorName.error && (
            <Text style={Styles.textError}>{errorName.message}</Text>
          )}
        </View>
        <View style={Styles.formControl}>
          <TextInput
            placeholder='Descripcion'
            value={description}
            onChangeText={( text ) => setDescription( text )}
            onBlur={() => validateDescription()}
          />
          {errorDescription.error && (
            <Text style={Styles.textError}>{errorDescription.message}</Text>
          )}
        </View>
        <View style={Styles.formControl}>
          <TextInput
            placeholder='Tiempo de elaboración (minutos)'
            keyboardType='numeric'
            value={elaborationTime}
            onChangeText={( text ) => setElaborationTime( text )}
            onBlur={() => validateElaborationTime()}
          />
          {errorElaborationTime.error && (
            <Text style={Styles.textError}>{errorElaborationTime.message}</Text>
          )}
        </View>
        <View style={Styles.formControl}>
          <TextInput
            placeholder='Precio'
            keyboardType='numeric'
            value={price}
            onChangeText={( text ) => setPrice( text )}
            onBlur={() => validatePrice()}
          />
          {errorPrice.error && (
            <Text style={Styles.textError}>{errorPrice.message}</Text>
          )}
        </View>
      </>
    );
  }

  function validatePrice() {
    if ( price === '' ) {
      hasErrorPrice({ message: 'El precio es requerido.', error: true });
      setFormValid( false );
    } else if ( !parseFloat( price )) {
      hasErrorPrice({ message: 'Ingrese solamente numeros.', error: true });
      setFormValid( false );
    } else if ( price < 0 ) {
      hasErrorPrice({ message: 'El precio no puede ser negativo.', error: true });
      setFormValid( false );
    } else {
      hasErrorPrice({ message: '', error: false });
    }
  }
  function validateName() {
    if ( name === '' ) {
      hasErrorName({ message: 'El Número de mesa es requerido.', error: true });
      setFormValid( false );
    } else if ( name.length < 2 ) {
      hasErrorName({ message: 'El Nombre es muy corto.', error: true });
      setFormValid( false );
    } else if ( name.length > 40 ) {
      hasErrorName({ message: 'El Número es muy largo.', error: true });
      setFormValid( false );
    } else {
      hasErrorName({ message: '', error: false });
    }
  }
  function validateDescription() {
    if ( description === '' || description.length <= 0 ) {
      hasErrorDescription({ message: 'La descripcion es requerida.', error: true });
      setFormValid( false );
    } else if ( description.length <= 6 ) {
      hasErrorDescription({ message: 'La descripcion es muy corta.', error: true });
      setFormValid( false );
    } else if ( description.length > 200 ) {
      hasErrorDescription({ message: 'La descripcion es muy larga.', error: true });
      setFormValid( false );
    } else {
      hasErrorDescription({ message: '', error: false });
    }
  }
  function validateElaborationTime() {
    if ( elaborationTime === '' ) {
      hasErrorElaborationTime({ message: 'El Tiempo de elaboracion es requerido.', error: true });
      setFormValid( false );
    } else if ( elaborationTime <= 0 ) {
      hasErrorElaborationTime({ message: 'El Tiempo de elaboracion es inválido.', error: true });
      setFormValid( false );
    } else {
      hasErrorElaborationTime({ message: '', error: false });
    }
  }
  function validateFirstPhoto() {
    if ( firstPhoto === '' ) {
      hasErrorFirstPhoto({ message: 'La foto es requerida.', error: true });
      setFormValid( false );
    } else {
      hasErrorFirstPhoto({ message: '', error: false });
    }
  }
  function validateSecondPhoto() {
    if ( secondPhoto === '' ) {
      hasErrorSecondPhoto({ message: 'La foto es requerida.', error: true });
      setFormValid( false );
    } else {
      hasErrorSecondPhoto({ message: '', error: false });
    }
  }
  function validateThirdPhoto() {
    if ( thirdPhoto === '' ) {
      hasErrorThirdPhoto({ message: 'La foto es requerida.', error: true });
      setFormValid( false );
    } else {
      hasErrorThirdPhoto({ message: '', error: false });
    }
  }
  const handleSubmit = () => {
    Keyboard.dismiss();
    setFormValid( true );
    validatePrice();
    validateElaborationTime();
    validateName();
    validateDescription();
    validateFirstPhoto();
    validateSecondPhoto();
    validateThirdPhoto();

    if ( formValid ) {
      const product = {
        elaborationTime,
        price,
        name,
        description,
        firstPhoto,
        secondPhoto,
        thirdPhoto,
        productState: ProductStatus.Pendding
      };
      onSubmit( product );
    }
  };
  function takePhoto( photo ) {
    setPhotoTaken( photo );
    setCameraActivate( true );
  }
  function handleCamera( photo ) {
    switch ( numberPhotoTaken ) {
      case 1:
        setFirstPhoto( photo );
        break;
      case 2:
        setSecondPhoto( photo );
        break;
      case 3:
        setThirdPhoto( photo );
        break;
      default:
        break;
    }
    setCameraActivate( false );
    setPhotoTaken( '' );
  }

  return (
    <View>
      { cameraActivated ? (
        <View>
          <CamaraView onKeepPhoto={( photoTaken ) => handleCamera( photoTaken )} />
        </View>
      )
        : (
          <View style={Styles.container}>
            <ScrollView>
              <View style={Styles.containerForm}>
                {renderSpecificFormControl()}
              </View>
            </ScrollView>
            <TouchableOpacity style={Styles.button} onPress={() => handleSubmit()}>
              <Text style={Styles.buttonText}>Registrar Producto</Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
}

