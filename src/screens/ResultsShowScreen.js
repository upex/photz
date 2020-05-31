import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResultsShowScreen = () => {
  const [uri, setUri] = useState('');
  const navigation = useNavigation();
  const {params: {name}} = useRoute();

  useEffect(() => {
    navigation.setOptions({
      title: name
    });
    setUri(getPic(name));
  }, []);

  const getPic = name => `https://source.unsplash.com/random/?${name}`;

  return (
    uri ? <View style={styles.container}>
      <Image style={styles.image} source={{uri}} /> 
    </View> : null
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: 300,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    maxHeight: '100%'
  }
});

export default ResultsShowScreen;