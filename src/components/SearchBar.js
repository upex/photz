import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Feather} from '@expo/vector-icons';

const SearhBar = ({term, onChangeText, onEndEditing}) => {
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
  }
});

export default SearhBar;