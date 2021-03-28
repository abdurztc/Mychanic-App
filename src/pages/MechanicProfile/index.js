/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../assets/utils';
import {Button, Gap, Header, Profile, ProfileItem} from '../../components';

const MechanicProfile = ({navigation, route}) => {
  const dataMechanic = route.params;
  return (
    <View style={styles.page}>
      <Header title="Info Mekanik" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <Profile name={dataMechanic.data.fullName} desc={dataMechanic.data.category} photo={{ uri:dataMechanic.data.photo }}/>
      <Gap height={10} />
      <ProfileItem label="Pendidikan" value={dataMechanic.data.pendidikan} />
      <ProfileItem label="Pengalaman" value={dataMechanic.data.experience} />
      <ProfileItem label="No. ID" value={dataMechanic.data.No_ID} />
      <View style={styles.action}>
        <Button
          title="Mulai Konsultasi"
          onPress={() => navigation.navigate('Chatting', dataMechanic)}
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
