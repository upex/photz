import React from 'react';
import {View, Text, StyleSheet, Image}  from 'react-native';

const ResultsDetail = ({result}) => {
  const getRandomPic = () => `https://source.unsplash.com/random/?${result.name}`

  return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: getRandomPic()}} /> 
        <Text style={styles.name}>{result.name}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15
  },
  image: {
    borderRadius: 4,
    width: 180,
    height: 120
  },
  name: {
    fontWeight: 'bold',
    marginTop: 2
  }
});

export default ResultsDetail;