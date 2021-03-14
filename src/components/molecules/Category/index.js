/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILDiesel, ILMotor, ILTransmisi} from '../../../assets';
import {colors, fonts} from '../../../assets/utils';

const Category = ({category}) => {
  const Icon = () => {
    if (category === 'Diesel') {
      return <ILDiesel style={styles.ilustration} />;
    }
    if (category === 'Motor') {
      return <ILMotor style={styles.ilustration} />;
    }
    if (category === 'Transmisi') {
      return <ILTransmisi style={styles.ilustration} />;
    }
    return <ILDiesel style={styles.ilustration} />;
  };

  return (
    <View style={styles.container}>
      <Icon />
      <Text style={styles.label}>Spesialist</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
    width: 100,
    height: 110,
  },
  ilustration: {
    marginBottom: 7,
    alignSelf: 'center',
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
    textAlign: 'center',
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
  },
});
