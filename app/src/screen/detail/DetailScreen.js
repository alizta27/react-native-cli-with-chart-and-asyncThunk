import {useEffect, useState} from 'react';
import styles from './style';
import {ListTokens} from '../../components/ListItemDetail';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import fetchStats from '../../store/actions/fetchStats';
import fetchCollectionById from '../../store/actions/fetchCollectionById';
import {LineChart} from 'react-native-chart-kit';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DetailScreen = ({route}) => {
  const item = {...route.params};
  const banner = {uri: item[0].banner_image_url};
  const image = {uri: item[0].image_url};
  const [token, setToken] = useState([]);
  const {stats} = useSelector(state => state.statsReducer);
  const {collection, status} = useSelector(
    state => state.collectionByIdReducer,
  );

  const [statsData, setStatsData] = useState([]);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [floor, setFloor] = useState(0);
  const [totalFloor, setTotalFloor] = useState(0);
  const [oneDayChange, setOneDayChange] = useState(0);
  const [forCart, setForCart] = useState({});
  const [oneDayChangeGap, setOneDayChangeGap] = useState(0);
  const [oneDayChangePercent, setOneDayChangePercent] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const arr = [];
    const item = {...route.params};
    for (const key in item) {
      arr.push(item[key]);
    }
    setItemsTotal(arr.length);
    setToken(arr);
  }, []);

  useEffect(() => {
    if (token.length) {
      const id = token[0].col_id;
      dispatch(fetchStats(id));
      dispatch(fetchCollectionById(id));
    }
  }, [token]);

  useEffect(() => {
    if (stats.length) {
      let comparison = 0;
      for (const key in stats) {
        const date = new Date(stats[key].timestamp).getMonth() + 1;
        if (date > comparison) {
          comparison = date;
        }
      }
      const newStats = stats.filter(
        el => new Date(el.timestamp).getMonth() + 1 === comparison,
      );
      setStatsData(newStats);
    }
  }, [stats]);

  useEffect(() => {
    if (collection) {
      const totalVolume = Number(collection.total_volume);
      const volume = Number(collection.one_day_volume);
      const dayChange = Number(collection.one_day_change);
      setFloor(volume.toFixed(1));
      setTotalFloor(totalVolume.toFixed(1));
      setOneDayChange(dayChange.toFixed(2));
    }
  }, [collection]);

  useEffect(() => {
    if (statsData.length) {
      let cartData = {
        label: [],
        dataSets: [],
      };
      const lastPrice = +statsData[0].floor_price_eth;
      let totalPrice = 0;
      for (const key in statsData) {
        cartData.label.push(statsData[key].timestamp);
        cartData.dataSets.push(statsData[key].floor_price_eth);
        totalPrice += +statsData[key].floor_price_eth;
      }
      let percent = (100 / totalPrice) * lastPrice;
      setForCart(cartData);
      const gap =
        +statsData[0].total_volume_eth - +statsData[1]?.total_volume_eth;

      setOneDayChangeGap(gap.toFixed(2));
      setOneDayChangePercent(percent.toFixed(2));
    }
  }, [statsData]);

  const renderItem = ({item}) => {
    return <ListTokens item={item} />;
  };

  const RenderChart = () => {
    return (
      <LineChart
        data={{
          labels: forCart.label,
          datasets: [
            {
              data: forCart.dataSets,
            },
          ],
        }}
        width={Dimensions.get('window').width + 60}
        height={100}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#ffff',
          backgroundGradientFrom: '#ffff',
          backgroundGradientTo: '#ffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgb(130,147,255), ${opacity})`,
          style: {
            borderRadius: 1,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '3',
            stroke: 'white',
            fill: '#FF8383',
          },
          fillShadowGradient: '#8293FF',
        }}
        bezier
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withInnerLines={false}
        withHorizontalLines={false}
        withVerticalLines={false}
        withOuterLines={false}
        style={{
          marginVertical: 8,
          left: -15,
        }}
      />
    );
  };
  if (!status) {
    return (
      <View style={styles.container}>
        <ImageBackground
          resizeMode={'cover'}
          source={banner}
          style={styles.header}>
          <View style={styles.profile}>
            <Image
              source={image}
              resizeMode={'cover'}
              style={styles.imgProfile}
            />
            <View style={styles.barContainer}>
              <View>
                <Text style={styles.colName}>{collection.name}</Text>
              </View>
              <View style={styles.infoWrap}>
                <View style={styles.itemDesc}>
                  <Text>Items</Text>
                  <Text style={styles.barItemInfo}>{itemsTotal}</Text>
                </View>
                <View style={styles.floorDesc}>
                  <Text>Floor</Text>
                  <Text style={styles.barItemInfo}>{floor}</Text>
                </View>
                <View style={styles.totalFloorDesc}>
                  <Text>Total Floor</Text>
                  <Text style={styles.barItemInfo}>{totalFloor}</Text>
                </View>
                <View style={styles.oneDayDesc}>
                  <Text>1 Day</Text>
                  <View style={styles.oneDayChange}>
                    <AntDesign
                      name={oneDayChange < 0 ? 'caretdown' : 'caretup'}
                      size={15}
                      color={oneDayChange < 0 ? '#FF8282' : '#82FFA3'}
                    />
                    <Text
                      style={[
                        styles.barItemInfo,
                        {color: oneDayChange < 0 ? '#FF8282' : '#82FFA3'},
                      ]}>
                      {oneDayChange}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.statsWrap}>
          <View style={styles.statsHead}>
            <View style={styles.statsHeadPercent}>
              <Text style={styles.percentTitle}>
                {stats[0]?.floor_price_eth}
              </Text>
              <View style={styles.oneDayChange}>
                <AntDesign
                  name={oneDayChangePercent < 0 ? 'caretdown' : 'caretup'}
                  size={15}
                  color={oneDayChangePercent < 0 ? '#FF8282' : '#82FFA3'}
                />
                <Text
                  style={[
                    styles.percentSecondary,
                    {color: oneDayChangePercent < 0 ? '#FF8282' : '#82FFA3'},
                  ]}>
                  {oneDayChangePercent}%
                </Text>
              </View>
            </View>
            <View style={styles.statsHeadOption}>
              <View style={styles.option1wrap}>
                <Text style={styles.option1}>1d</Text>
              </View>
              <View style={styles.option2wrap}>
                <Text style={styles.option2}>7d</Text>
              </View>
              <View style={styles.option3wrap}>
                <Text style={styles.option3}>30d</Text>
              </View>
            </View>
          </View>
          <View style={styles.stats}>
            {forCart?.label?.length ? <RenderChart /> : null}
          </View>
        </View>
        <FlatList
          horizontal
          data={token}
          renderItem={renderItem}
          keyExtractor={item => item.token_name}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>...{status}</Text>
      </View>
    );
  }
};

export default DetailScreen;
