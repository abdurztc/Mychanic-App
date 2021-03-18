/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../assets/utils';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';

const MechanicProfile = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Info Mekanik" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name="Yuvia" desc="Spesialist Diesel" />
      <Gap height={10} />
      <ProfileItem label="Pendidikan" value="Toyota Akademi" />
      <ProfileItem label="Pengalaman" value="Astra Otopart" />
      <ProfileItem label="No. ID" value="00098989012" />
      <View style={styles.action}>
        <Button
          title="Mulai Konsultasi"
          onPress={() => navigation.navigate('Chatting')}
        />
      </View>
    </View>
  );
};

export default MechanicProfile;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cardLight,
    flex: 1,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 50,
  },
});
