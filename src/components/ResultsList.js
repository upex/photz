import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, View}  from 'react-native';
import {useNavigation} from '@react-navigation/native';
import formatData from '../utils/formatData';

const numColumns = 2;
const ResultsList = ({results}) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ResultsShowScreen', 
        {item})}
        style={styles.item}
      >
        <Image style={styles.image} source={{uri: item.urls.small}} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
      keyExtractor={({id}) => id}
      showsVerticalScrollIndicator={false}
      data={formatData('id', results, numColumns)}
      renderItem={renderItem}
      numColumns={numColumns}
      />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  }
});

export default ResultsList;