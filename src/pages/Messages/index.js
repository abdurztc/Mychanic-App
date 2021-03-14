/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dummy1, Dummy2, Dummy3, Dummy4} from '../../assets';
import {colors, fonts} from '../../assets/utils';
import {ListMechanic} from '../../components';

const Messages = () => {
  const [mechanics] = useState([
    {
      id: 1,
      profile: Dummy1,
      name: 'Abdur Rahman',
      desc: 'Oke Sensei',
    },
    {
      id: 2,
      profile: Dummy2,
      name: 'Lya',
      desc: 'Oke Sensei',
    },
    {
      id: 3,
      profile: Dummy3,
      name: 'Dasha',
      desc: 'Oke Sensei',
    },
    {
      id: 4,
      profile: Dummy4,
      name: 'Yupi',
      desc: 'Oke Sensei',
    },
  ]);
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Chat History</Text>
        {mechanics.map(mechanic => {
          return (
            <ListMechanic
            key={mechanic.id}
              profile={mechanic.profile}
              name={mechanic.name}
              desc={mechanic.desc}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.cardLight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
