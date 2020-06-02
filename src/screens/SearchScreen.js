import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SerachBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchAPI, error, setError, loader, results] = useResults();
  
  const onChangeText = query => {
    setError(false);
    setQuery(query);
  }

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
      <ResultsList results={results} />
    </>
    );
}

const styles = StyleSheet.create({
  infoStyle: {
    alignItems: 'center'
  }
});

export default SearchScreen;
