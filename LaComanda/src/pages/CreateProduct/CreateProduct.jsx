/* eslint-disable no-param-reassign */
import { View } from 'react-native';
import React from 'react';
import Styles from './Styles';
import ProductForm from '../../components/ProductForm/ProductForm';
import { saveItemInCollection } from '../../services/FirestoreServices';
import { saveImageInStorage } from '../../services/StorageServices';

export default function CreateProduct() {
  const handlesubmit = ( formData ) => {
    saveProduct( formData );
  };
  const saveProduct = async ( newProduct ) => {
    const blobs = [];
    const uris = [];
    createBlob( newProduct.firstPhoto ).then(( blob1 ) => {
      blobs.push( blob1 );
      createBlob( newProduct.secondPhoto ).then(( blob2 ) => {
        blobs.push( blob2 );
        createBlob( newProduct.thirdPhoto ).then(( blob3 ) => {
          blobs.push( blob3 );
          saveImageInStorage( newProduct.name, blobs[0]).then(( uri1 ) => {
            uris.push( uri1 );
            saveImageInStorage( newProduct.name, blobs[1]).then(( uri2 ) => {
              uris.push( uri2 );
              saveImageInStorage( newProduct.name, blobs[2]).then(( uri3 ) => {
                uris.push( uri3 );
                newProduct = {
                  description: newProduct.description,
                  elaborationTime: newProduct.elaborationTime,
                  name: newProduct.name,
                  price: newProduct.price,
                  photos: uris
                };
                saveItemInCollection( 'products', newProduct.name, newProduct ).then(() => {
                  // redireccionar success
                }).catch(() => { /* redireccionar error*/ });
              });
            });
          });
        });
      });
    });
  };
  async function createBlob( photosUris ) {
    return ( await fetch( photosUris )).blob();
  }
  const handleCancel = () => {
    // redireccionar cancel
  };
  return (
    <View style={Styles.container}>
      <ProductForm onSubmit={handlesubmit} onCancel={handleCancel} />
    </View>
  );
}
