import React, {useState, useRef, useEffect} from 'react';
import {View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Alert, CameraRoll, Image}  from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import useResultDownload from '../hooks/useResultDownload';
import useMountedRef from '../hooks/useMountedRef';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const ResultsShowScreen = () => {
  const [name, setName] = useState('');
  const [uri, setUri] = useState('');
  const [profileLink, setProfileLink] = useState('');
  const [photoId, setPhotoId] = useState('');
  const [loader, setLoader] = useState(false);
  const {downloadPhoto} = useResultDownload();
  const isMountedRef = useMountedRef();

  const route = useRoute();
  const navigation = useNavigation();

  const showLoader = () => (loader ? <ActivityIndicator size="small" /> : (
    <TouchableOpacity onPress={downloadImage} style={styles.downLoadButton}>
      <Text style={styles.downloadLabel}>Download</Text>
      <Feather style={styles.downloadIconStyle} name='download' size={24} />
    </TouchableOpacity>));

  const saveFile = async fileUri => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          await MediaLibrary.createAlbumAsync("Download", asset, false);
          Alert.alert('Image Successfully Downloaded.');
          setLoader(false);
      } else {
        setLoader(false);
      }
  }
  
  useEffect(() => {
    const {id, urls: {regular}, user: {name, links:{html}}} = route.params.item;
    setName(name);
    setUri(regular);
    setPhotoId(id);
    setProfileLink(html);
    navigation.setOptions({
      title: name
    });
  }, []);

  const downloadImage = () => {
    setLoader(true);
    downloadPhoto(photoId, resp => {
      const fileUri = FileSystem.documentDirectory + uuidv4() +'.jpg';
      FileSystem.downloadAsync(resp.url, fileUri)
      .then(({ uri }) => {
          if(isMountedRef.current){
            saveFile(uri);
          }
        })
        .catch(error => {
          console.error(error);
        })
    });
  }


  return (
    <>
    <View style={styles.imageContainer}>
     {uri ? <Image style={styles.image} source={{uri}} /> : null }
    </View>
    <View style={styles.attributeContainer}>
      <Text>Photo by {name} on Unsplash</Text>
    </View>
    <View style={styles.downloadContainer}>
        {showLoader()}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    margin: 1
  },
  attributeContainer: {
    alignItems: 'center',
    marginVertical: 15
  },
  downloadContainer: {
    marginHorizontal: 1,
    marginVertical: 10,
    alignItems: 'center'
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  attribute: {
    fontWeight: 'bold',
    marginTop: 2
  },
  downLoadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    width: '60%',
    backgroundColor: 'green',
    borderRadius: 4

  },
  downloadLabel: {
    color: '#fff',
    fontSize: 20
  },
  downloadIconStyle: {
    color: '#fff',
    marginLeft: 10
  }
});

export default ResultsShowScreen;