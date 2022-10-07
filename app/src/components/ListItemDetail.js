import {useEffect, useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './style';

export const ListTokens = ({item}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState({});

  useEffect(() => {
    if (item) {
      const image = {uri: item.token_image};
      const name = item.token_name;
      setImage(image);
      setName(name);
    }
  }, [item]);

  return (
    <ImageBackground
      source={image}
      imageStyle={{borderRadius: 10}}
      resizeMode={'cover'}
      style={styles.cardColWrap}>
      <View style={styles.cardColTitleWrapToken}>
        <Text style={styles.cardColTitle}>{name}</Text>
      </View>
    </ImageBackground>
  );
};
