/* eslint-disable prettier/prettier */
import React from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Dummy2, Dummy3, Dummy4, JSONCategoryMechanic} from '../../assets';
import {colors, fonts, getData} from '../../assets/utils';
import {
  Category,
  ForYouItem,
  Gap,
  HomeProfile,
  TopMechanical,
} from '../../components';

const Home = ({navigation}) => {
  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
    });
  });
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
                {JSONCategoryMechanic.data.map(item => {
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
            <TopMechanical
              name="Steffi"
              category="Spesialist Diesel"
              avatar={Dummy2}
              onPress={() => navigation.navigate('MechanicProfile')}
            />
            <TopMechanical
              name="Dasha"
              category="Spesialist Diesel"
              avatar={Dummy3}
              onPress={() => navigation.navigate('MechanicProfile')}
            />
            <TopMechanical
              name="Yupy"
              category="Spesialist Diesel"
              avatar={Dummy4}
              onPress={() => navigation.navigate('MechanicProfile')}
            />
            <Text style={styles.sectionLabel}>Good News for you</Text>
          </View>

          <ForYouItem />
          <ForYouItem />
          <ForYouItem />
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
