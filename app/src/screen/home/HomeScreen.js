import {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import fetchWalletContents from '../../store/actions/fetchWalletCollections';
import fetchCollections from '../../store/actions/fetchCollections.js';
import styles from './style';
import {ListCollections, ListItemHome} from '../../components/ListItemHome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation}) => {
  const {walletContents, status} = useSelector(state => state.walletReducer);
  const {collections} = useSelector(state => state.collectionsReducer);
  const dispatch = useDispatch();
  const [listCollection, setListCollection] = useState([]);

  useEffect(() => {
    dispatch(fetchWalletContents());
    dispatch(fetchCollections());
  }, []);

  useEffect(() => {
    if (collections.length && walletContents.length) {
      const arr = [];
      const objCol = {};

      for (let key in walletContents) {
        const token = JSON.parse(walletContents[key]?.collection_json);
        const name = token.name;
        const col = collections.filter(el => el.name === name);
        if (!objCol[name]) {
          objCol[name] = [
            {
              ...token,
              col_id: col[0].id,
              token_name: walletContents[key].name,
              token_image: walletContents[key].image_url,
            },
          ];
        } else {
          objCol[name].push({
            ...token,
            col_id: col[0].id,
            token_name: walletContents[key].name,
            token_image: walletContents[key].image_url,
          });
        }
      }
      for (const key in objCol) {
        arr.push(objCol[key]);
      }
      setListCollection(arr);
    }
  }, [walletContents, collections]);

  const renderItem = ({item}) => {
    return <ListItemHome item={item} navigation={navigation} />;
  };

  const renderCollections = ({item}) => {
    return <ListCollections item={item} />;
  };

  if (!status) {
    return (
      <>
        <View style={styles.headerWrapper}>
          <View style={styles.headerTitle}>
            <Text style={styles.headTitleText}>Explore Collections</Text>
          </View>
          <View style={styles.cantainerSide}>
            <View style={styles.headSearch}>
              <MaterialCommunityIcons
                name="nfc-search-variant"
                size={30}
                color={'white'}
              />
            </View>
            <View style={styles.headProfile}>
              <Image
                style={styles.logo}
                resizeMode={'cover'}
                source={{
                  uri: 'https://cdn.dribbble.com/users/2514020/screenshots/16937528/media/7afa2d018936993f39b3265b6fbc4acc.png?compress=1&resize=400x300',
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.subtitle}>
            <View style={styles.blueDot} />
            <Text>Collections</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FlatList
              horizontal
              data={listCollection}
              renderItem={renderItem}
              keyExtractor={item => item[0].id}
            />
          </View>
          <View style={styles.subtitle}>
            <View style={styles.blueDot} />
            <Text>Tokens</Text>
          </View>
          <FlatList
            data={walletContents}
            renderItem={renderCollections}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    );
  } else {
    return (
      <View>
        <Text>...{status}</Text>
      </View>
    );
  }
};

export default HomeScreen;
