import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Dummy1} from '../../../assets';
import {colors, fonts} from '../../../assets/utils';

const HomeProfile = () => {
  return (
    <View style={styles.container}>
      <Image source={Dummy1} style={styles.avatar} />
      <View>
        <Text style={styles.name}>Howdy Abdur </Text>
      </View>
    </View>
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
    marginTop: 20,
  },
});
