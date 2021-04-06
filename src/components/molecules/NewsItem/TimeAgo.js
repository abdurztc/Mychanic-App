/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import moment from 'moment';
import 'moment/locale/id';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { colors, fonts } from '../../../assets/utils';

const TimeAgo = ({time}) => {
  moment.locale('id');
  const [date] = useState(time);
  const timeAgo = moment(date || moment.now()).fromNow();
  return (
    <View>
      <Text style={styles.date}>{timeAgo}</Text>
    </View>
  );
};

export default TimeAgo;

const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 4,
  },
});
