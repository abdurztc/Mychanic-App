/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { ILNullPhoto } from '../../../assets';
import { colors, fonts, getData } from '../../../assets/utils';

const HomeProfile = ({onPress}) => {
  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    vehicle: '',
  });

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user: ', res);
      const data = res;
      data.photo = {uri: res.photo};
      console.log('new profile: ', data);
      setProfile(res);
    });
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.vehicle}>{profile.vehicle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 10,
    textTransform: 'capitalize',
  },
  vehicle: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,

    textTransform: 'capitalize',
  },
});
