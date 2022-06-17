/* eslint-disable react/prop-types */
import { Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './syles';
import Spinner from '../../../components/Spinner/Spinner';
import GlobalContext from '../../../context/GlobalContext';
import CreateSurvey from './CreateSurvey/CreateSurvey';
import { saveItemInCollection, updateItem } from '../../../services/FirestoreServices';
import { saveImageInStorage } from '../../../services/StorageServices';
import ListOfSurveys from './ListOfSurveys/ListOfSurveys';

export default function SurveysTab() {
  const { client } = useContext( GlobalContext );
  const [spinner, setSpinner] = useState( false );
  const [surveyDone, setSurveyDone] = useState( false );
  useEffect(() => {
    setSurveyDone( client.surveysDone );
  }, [client.surveysDone]);
  const handlesubmit = ( _newSurvey ) => {
    setSpinner( true );
    saveProduct( _newSurvey );
  };
  const saveProduct = async ( newSurvey ) => {
    const blobs = [];
    const uris = [];
    createBlob( newSurvey.firstPhoto ).then(( blob1 ) => {
      if ( blob1 ) { blobs.push( blob1 ); }
      createBlob( newSurvey.secondPhoto ).then(( blob2 ) => {
        if ( blob2 ) { blobs.push( blob2 ); }
        createBlob( newSurvey.thirdPhoto ).then(( blob3 ) => {
          if ( blob3 ) { blobs.push( blob3 ); }
          saveImageInStorage( newSurvey.name, blobs[0]).then(( uri1 ) => {
            if ( uri1 ) { uris.push( uri1 ); }
            saveImageInStorage( newSurvey.name, blobs[1]).then(( uri2 ) => {
              if ( uri2 ) { uris.push( uri2 ); }
              saveImageInStorage( newSurvey.name, blobs[2]).then(( uri3 ) => {
                if ( uri3 ) { uris.push( uri3 ); }
                saveItemInCollection( 'surveys', newSurvey.name, newSurvey ).then(() => {
                  updateItem( 'clients', client.email, { surveysDone: true });
                  setSpinner( false );
                }).catch(( e ) => {
                  console.log( e );// mostrar el error
                });
              });
            });
          });
        });
      });
    });
  };
  async function createBlob( photosUris ) {
    if ( photosUris ) {
      return ( await fetch( photosUris )).blob();
    }
    return null;
  }
  return (
    <View>
      {
        spinner
          ? ( <Spinner styles={styles.containerSpinner} /> )
          : (
            <View>
              {
                surveyDone
                  ? (
                    <View style={styles.container}>
                      <ListOfSurveys />
                    </View>
                  ) : (
                    <View style={styles.container}>
                      <CreateSurvey onSubmit={handlesubmit} />
                    </View>
                  )
              }
            </View>
          )
      }
    </View>
  );
}

