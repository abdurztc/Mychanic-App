/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/utils';

const Link = ({title, size, align}) => {
  return (
    <View>
      <Text style={styles.text(size, align)}>{title} </Text>
    </View>
  );
};

export default Link;

const styles = StyleSheet.create({
  text: (size, align) => ({
    fontSize: size,
    color: colors.text.primary,
    fontFamily: 'Nunito-Regular',
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
