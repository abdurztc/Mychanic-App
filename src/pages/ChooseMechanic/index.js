/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dummy3} from '../../assets';
import {colors} from '../../assets/utils';
import {Header, List } from '../../components';

const ChooseMechanic = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title="Pilih Spesialist Diesel"
        onPress={() => navigation.goBack()}
      />
      <List
        type="next"
        profile={Dummy3}
        name="Raiden Abdur Rahman"
        desc="Toyota Motor"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        type="next"
        profile={Dummy3}
        name="Raiden Abdur Rahman"
        desc="Toyota Motor"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        type="next"
        profile={Dummy3}
        name="Raiden Abdur Rahman"
        desc="Toyota Motor"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        type="next"
        profile={Dummy3}
        name="Raiden Abdur Rahman"
        desc="Toyota Motor"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        type="next"
        profile={Dummy3}
        name="Raiden Abdur Rahman"
        desc="Toyota Motor"
        onPress={() => navigation.navigate('Chatting')}
      />
    </View>
  );
};

export default ChooseMechanic;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cardLight,
    flex: 1,
  },
});
