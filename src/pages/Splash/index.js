/* eslint-disable prettier/prettier */
import React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {colors, fonts} from '../../assets/utils';
import {FireDB} from '../../config';

const Splash = ({navigation}) => {
  useEffect(() => {
    const clear = FireDB.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          navigation.replace('MainApp');
        } else {
          navigation.replace('GetStarted');
        }
      }, 3000);
    });

    return () => clear();
  }, [navigation]);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Chanic</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
