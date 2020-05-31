import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity}  from 'react-native';
import ResultsDetail from './ResultsDetail';
import {useNavigation} from '@react-navigation/native';

const ResultsList = ({title, results = []}) => {
  const navigation = useNavigation();
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ResultDetails', {id: item.id, name: item.name})}>
        <ResultsDetail result={item} />
      </TouchableOpacity>
      );
  }

  return (
    results.length ? <View style={styles.resultsList}>
      <Text style={styles.title}>{title}</Text>
      <FlatList 
      horizontal
      showsHorizontalScrollIndicator={false}
      data={results}
      keyExtractor={({id}) => id}
      renderItem={renderItem}
      />
    </View> : null 
    );
}

const styles = StyleSheet.create({
  resultsList: {
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    marginLeft: 15,
    marginBottom: 5,
    fontWeight: 'bold'
  }
});

export default ResultsList;