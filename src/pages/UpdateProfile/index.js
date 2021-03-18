/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from '../../assets/utils';
import {Button, Gap, Header, Input, Profile} from '../../components';

const UpdateProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove/>
          <Gap height={26} />
          <Input label="Full Name" />
          <Gap height={24} />
          <Input label="Kendaraan Anda" />
          <Gap height={24} />
          <Input label="Email" />
          <Gap height={24} />
          <Input label="Password" />
          <Gap height={40} />
          <Button title="Save Update" onPress={() => navigation.goBack('UserProfile')}  />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cardLight,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
