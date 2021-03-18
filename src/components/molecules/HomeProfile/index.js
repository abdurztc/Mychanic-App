/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Dummy1} from '../../../assets';
import {colors, fonts} from '../../../assets/utils';

const HomeProfile = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={Dummy1} style={styles.avatar} />
      <View>
        <Text style={styles.name}>Howdy Abdur SubKhi </Text>
        <Text style={styles.vehicle}>HONDA CIVIC </Text>
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
