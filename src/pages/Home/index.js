/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {colors, fonts, getData, showError, newsAPI} from '../../assets/utils';
import {
  Category,
  Gap,
  HomeProfile,
  NewsItem,
  TopMechanical,
} from '../../components';
import {FireDB} from '../../config';

const Home = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryMechanic, setCategoryMechanic] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });

  useEffect(() => {
    getCategoryMechanic();
    getTopMechanical();
    getForYouItem();
    // getNewsFromAPI();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

  const getTopMechanical = () => {
    FireDB.database()
      .ref('mechanics/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          setMechanics(data);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };
  // const getNewsFromAPI = () => {
  //   newsAPI
  //     .get(
  //       'top-headlines?country=id&category=science&apiKey=53276f86ee6c402aa05a888bb357bf58',
  //       //https://console.firebase.google.com/project/mychanic-21/storage/mychanic-21.appspot.com/files
  //     )
  //     .then(async res => {
  //       setNews(res.data.articles);
  //     })
  //     .catch(error => {
  //       showError(error.message);
  //     });
  // };

  // if (!news) {
  //   return null;
  // }
  const getForYouItem = () => {
    FireDB.database()
      .ref('news/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          setNews(filterData);
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
        if (res.val()) {
          const data = res.val();
          const filterData = data.filter(el => el !== null);
          // console.log('data category hasil filter: ', filterData);
          setCategoryMechanic(filterData);
        }
      })
      .catch(err => {
        showError(err.message);
      });
  };
  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile', profile)}
            />
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
                      key={`category-${item.id}`}
                      category={item.category}
                      onPress={() =>
                        navigation.navigate('ChooseMechanic', item)
                      }
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
                  onPress={() =>
                    navigation.navigate('MechanicProfile', mechanic)
                  }
                />
              );
            })}

            <Text style={styles.sectionLabel}>Good News for you</Text>
          </View>
          {news.map((item, key) => {
            return (
              <NewsItem
                key={key}
                title={item.title}
                date={item.date}
                urlToImage={{
                  uri:
                    item.urlToImage != null
                      ? item.urlToImage
                      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpajo6PFxcW3t7ecnJyqqqq+vr6xsbGXmO98AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABPUlEQVRoge3Tv0/CQBjG8YcWaMcebymOENLI2MZoHMHEvVUKjq1K4lhM2Kvxx7/tUUiamDhc6GSez8INzbf3HleAiIiIiIiIiIiIiNozAGzvuJYTW2reXmso7bX8YN96HUR1a7RZ6+VVOgU+p4LuZGrSkqK0PWfwfl+3ht/hcpdvPkJ0g0fBYpYZtS7HttfPMatbAbZzJ1kjjnqVK1ihNzdpdX3b65S4qVsjXbG9EtuoEzliC/RbDFoIL7wY2NZrQayPzw1VpH/FUUqNjVrx0+9W8Rzrlt7yMMvMWq7fzHhoCTp6Rr0vw0uiH8+as69bov/AyNqf/Rms3Ky1aO7EYV93X2nlBIXg7WVSmrWs5q4eWrvVdYLbpR4/PTeZ8S9O82mdzMr7SVstV6mqrRaKh9ZSRERERERERET0n/wAZwMqI9kyPcoAAAAASUVORK5CYII=',
                }}
                onPress={() => navigation.navigate('News', item)}
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
