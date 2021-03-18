/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../assets/utils';
import {Gap, Header, List, Profile} from '../../components';

const UserProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name="Raiden Abdur Rahman" desc="Honda Civic Type R" />
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Today"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Edit Profile"
        desc="Last Update Today"
        type="next"
        icon="language"
      />
      <List
        name="Edit Profile"
        desc="Last Update Today"
        type="next"
        icon="rate"
      />
      <List
        name="Edit Profile"
        desc="Last Update Today"
        type="next"
        icon="sign-out"
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cardLight,
    flex: 1,
  },
});
