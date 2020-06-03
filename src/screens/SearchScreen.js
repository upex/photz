import React, {useState, useCallback, useMemo} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SerachBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const {isRefreshing, setIsRefreshing, searchAPI, error, setError, loader, pageNo, results} = useResults();
  
  const onChangeText = query => {
    setError(false);
    setQuery(query);
  };

  const handleOnEndReached = () => {
    searchAPI(query, pageNo);
  };

  const handleOnRefresh = useCallback(() => {
    setIsRefreshing(true);
    searchAPI(query);
  }, [query, isRefreshing]);
  
  const renderResultList = () => {
    return <ResultsList 
      loader={loader}
      isRefreshing={isRefreshing}
      results={results} 
      handleOnRefresh={handleOnRefresh}
      handleOnEndReached={handleOnEndReached} />
  }

  return (
    <>
      <SerachBar 
      term={query}
      onChangeText={onChangeText}
      onEndEditing={() => searchAPI(query)}
      />
      <View style={styles.infoStyle}>
        { error && (<Text style={{fontSize: 20, color: 'red'}}>Something went wrong!</Text>) }
        { !error && !loader && !results.length ? (<Text style={{fontSize: 20}}>Start typing to see images!</Text>) : null }
      </View>
      {renderResultList()}
    </>
    );
}

const styles = StyleSheet.create({
  infoStyle: {
    alignItems: 'center'
  }
});

export default React.memo(SearchScreen);
