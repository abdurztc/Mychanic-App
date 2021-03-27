/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, showError} from '../../assets/utils';
import {
  Category,
  ForYouItem,
  Gap,
  HomeProfile,
  TopMechanical,
} from '../../components';
import {FireDB} from '../../config';

const Home = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryMechanic, setCategoryMechanic] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  useEffect(() => {
    getCategoryMechanic();
    getTopMechanical();
    getForYouItem();
  }, []);

  const getTopMechanical = () => {
    FireDB.database()
      .ref('mechanics/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        console.log('top mekanik: ', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log('data parse: ', data);
          setMechanics(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };

  const getForYouItem = () => {
    FireDB.database()
      .ref('news/')
      .once('value')
      .then(res => {
        console.log('news: ', res.val());
        if (res.val()) {
          setNews(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };
  const getCategoryMechanic = () => {
    FireDB.database()
      .ref('category_mechanic/')
      .once('value')
      .then(res => {
        console.log('category mekanik: ', res.val());
        if (res.val()) {
          setCategoryMechanic(res.val());
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Ayo konsultasi masalah kendaraan dengan mekanikmu
            </Text>
            <Text style={styles.browse}>Browse by mechanical category</Text>
          </View>

          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryMechanic.map(item => {
                  return (
                    <Category
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseMechanic')}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Our Top mechanical</Text>
            {mechanics.map(mechanic => {
              return (
                <TopMechanical
                  key={mechanic.id}
                  name={mechanic.data.fullName}
                  category={mechanic.data.category}
                  avatar={{uri: mechanic.data.photo}}
                  onPress={() => navigation.navigate('MechanicProfile')}
                />
              );
            })}

            <Text style={styles.sectionLabel}>Good News for you</Text>
          </View>
          {news.map(item => {
            return (
              <ForYouItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  wrapperSection: {paddingHorizontal: 16},
  content: {
    flex: 1,
    backgroundColor: colors.cardLight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 24,
    marginBottom: 20,
    maxWidth: 329,
  },
  browse: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
    marginBottom: 28,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
