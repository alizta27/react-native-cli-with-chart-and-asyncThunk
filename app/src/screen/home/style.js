import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#3F8F7FF',
    flexDirection: 'column',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    height: 100,
    width: '50%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headTitleText: {
    fontSize: 25,
    fontFamily: 'Alkalami-Regular',
    margin: 0,
    color: '#3d465f',
  },
  cantainerSide: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 20,
  },
  headSearch: {
    height: 100,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#0180cb',
    marginRight: 10,
  },
  headProfile: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: '100%',
    borderRadius: 10,
  },
  subtitle: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    width: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blueDot: {
    backgroundColor: '#0180cb',
    height: '100%',
    width: 10,
    marginRight: 20,
  },
});
export default styles;
