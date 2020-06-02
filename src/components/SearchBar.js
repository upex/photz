import React from 'react';
import {ActivityIndicator, View, TextInput, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';

const SearhBar = ({term, loader, onChangeText, onEndEditing}) => {
  return(
    <View style={styles.backgroundStyle}>
      <Feather name='search' style={styles.iconStyle} />
      <TextInput 
      placeholder='Search'
      style={styles.inputSyle}
      value={term}
      autoCapitalize='none'
      autoCorrect={false}
      onChangeText={onChangeText}
      onEndEditing={() => onEndEditing(term)}
      />
      { loader && <ActivityIndicator style={styles.loaderStyle} size="small" /> }
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#ddd',
    height: 50,
    borderRadius: 5,
    margin: 15,
    flexDirection: 'row'
  },
  inputSyle: {
    flex: 1,
    fontSize: 18,
    paddingRight: 20
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15
  },
  loaderStyle: {
    position: 'absolute',
    color: '#00ff00',
    right: 0,
    top: 15
  }
});

export default SearhBar;