/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../assets/utils';

const ForYouItem = ({title, date, image}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri:image }} style={styles.image} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ForYouItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleWrapper: {flex: 1},
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%',
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
    marginRight: 12,
  },
});
