import {useEffect, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './style';

export const ListItemHome = ({item, navigation}) => {
  const image = {uri: item[0].banner_image_url};
  const name = item[0].name;
  const total = item.length;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', item)}>
      <ImageBackground
        source={image}
        style={styles.cardList}
        resizeMode={'cover'}
        imageStyle={{borderRadius: 10}}>
        <View style={styles.cardDescWrap}>
          <View style={styles.cardNameWrap}>
            <Text style={styles.cardNameText}>{name}</Text>
            <Text style={styles.cardNameTextSecondary}>
              Owned Token: {total}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const ListCollections = ({item}) => {
  const image = {uri: item.image_url};
  const [name, setName] = useState('');

  useEffect(() => {
    setName(item.name);
    if (name.length <= 5) {
      const collection = JSON.parse(item.collection_json);
      setName(`${collection.name} ${item.name}`);
    }
  }, [item]);

  return (
    <ImageBackground
      source={image}
      resizeMode={'cover'}
      style={styles.cardColWralp}>
      <View style={styles.cardColTitleWrap}>
        <Text style={styles.cardColTitle}>{name}</Text>
      </View>
    </ImageBackground>
  );
};
