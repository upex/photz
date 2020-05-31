import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SerachBar from '../components/SearchBar';
import {Feather} from '@expo/vector-icons';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchAPI, error, setError, loader, results] = useResults();
  
  const onChangeText = query => {
    setError(false);
    setQuery(query);
  }

  const filteredResults = (start, end) => {
    return results.slice(start, end);
  }
  console.log('hello==>kela', loader)
  return (
    <>
      <SerachBar 
      term={query}
      onChangeText={onChangeText}
      onEndEditing={() => searchAPI(query)}
      loader={loader}
      />
      <View style={styles.infoStyle}>
        { error && (<Text style={{fontSize: 20, color: 'red'}}>Something went wrong!</Text>) }
        { !error && !loader && !results.length ? (<Text style={{fontSize: 20}}>No results found!</Text>) : null }
      </View>
      <ScrollView>
        <ResultsList results={filteredResults(0, 9)} title='Cost effective' />
        <ResultsList results={filteredResults(9, 19)} title='Bit Pricier' />
        <ResultsList results={filteredResults(19, 29)} title='Big Spender' />
        <ResultsList results={filteredResults(29, 39)} title='Fat Spender' />
      </ScrollView>
    </>
    );
}

const styles = StyleSheet.create({
  infoStyle: {
    alignItems: 'center'
  }
});

export default SearchScreen;
