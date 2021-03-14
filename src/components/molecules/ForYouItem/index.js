import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Dummy1} from '../../../assets';
import {colors, fonts} from '../../../assets/utils';

const ForYouItem = () => {
  return (
    <View style={styles.container}>
      <Image source={Dummy1} style={styles.image} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          Tips membersihkan ruang mesin di musim hujan{' '}
        </Text>
        <Text style={styles.date}>Today</Text>
      </View>
    </View>
  );
};

export default ForYouItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom:12,
    paddingTop: 16,
    paddingHorizontal: 16
  },
  titleWrapper: {flex: 1},
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%'
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 60,
    borderRadius: 11,
    marginRight: 12
  },
});
