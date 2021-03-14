import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Dummy1, IconStar} from '../../../assets';
import {colors, fonts} from '../../../assets/utils';

const TopMechanical = () => {
  return (
    <View style={styles.container}>
      <Image source={Dummy1} style={styles.avatar} />
      <View style={styles.profile}>
        <Text style={styles.name}>Takayama Touma</Text>
        <Text style={styles.category}>Spesialist Diesel</Text>
      </View>
      <View style={styles.rate}>
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
      </View>
    </View>
  );
};

export default TopMechanical;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  profile: {
    flex: 1,
  },
  rate: {
    flexDirection: 'row',
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
  },
});
