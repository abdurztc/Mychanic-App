/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { colors, fonts } from '../../../assets/utils';

const IsMe = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>Selamat Siang Pak, saya mau tanya</Text>
      </View>
      <Text style={styles.date}>21.10 PM</Text>
    </TouchableOpacity>
  );
};

export default IsMe;

const styles = StyleSheet.create({
  container: {marginBottom: 20, alignItems: 'flex-end', paddingRight: 16},

  chatContent: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.white,
    maxWidth: '70%',
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});
