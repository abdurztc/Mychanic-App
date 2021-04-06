/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ILNullPhoto } from '../../assets';
import { colors, getData } from '../../assets/utils';
import { Gap, Header, List, Profile } from '../../components';
import { FireDB } from '../../config';

const UserProfileTab = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    vehicle: '',
    photo: ILNullPhoto,
  });
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  });
  const signOut = () => {
    FireDB.auth()
      .signOut()
      .then(() => {
        console.log('success sign out');
        navigation.replace('GetStarted');
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.vehicle}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        // desc="Last Update Today"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      {/* <List
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
      /> */}
      <List name="Logout" type="next" icon="sign-out" onPress={signOut} />
    </View>
  );
};

export default UserProfileTab;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cardLight,
    flex: 1,
  },
});
