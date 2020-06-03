import React from 'react';
import {Text, Dimensions, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, View}  from 'react-native';
import {useNavigation} from '@react-navigation/native';
import formatData from '../utils/formatData';

const numColumns = 2;

const RenderItem = React.memo(({ item }) => {
  const navigation = useNavigation();

  if (item.empty === true) {
    return <View style={[styles.item, styles.itemInvisible]} />;
  }
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ResultsShowScreen', 
      {item})}
      style={styles.item}
    >
      <Image style={styles.image} source={{uri: item.urls.thumb}} />
    </TouchableOpacity>
  );
});

const ResultsList = ({results, loader, isRefreshing, handleOnRefresh, handleOnEndReached}) => {
  
  const renderFooter = () => (loader ? <ActivityIndicator size="large" /> : null);

  const computedRenderUI = ({item}) => <RenderItem item={item} />

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        keyExtractor={({id}) => id}
        refreshControl={
        <RefreshControl 
        refreshing={isRefreshing}
        onRefresh={handleOnRefresh}
        />
        }
        showsVerticalScrollIndicator={false}
        data={formatData('id', results, numColumns)}
        renderItem={computedRenderUI}
        numColumns={numColumns}
        ListFooterComponent={renderFooter()}
        onEndReachedThreshold={0.4}
        onEndReached={handleOnEndReached}
        removeClippedSubviews={true}
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
    backgroundColor: 'transparent'
  }
});

export default React.memo(ResultsList);