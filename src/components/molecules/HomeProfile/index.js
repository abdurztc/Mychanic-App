/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../assets/utils';

const HomeProfile = ({onPress, profile}) => {
  // const [profile, setProfile] = useState({
  //   photo: ILNullPhoto,
  //   fullName: '',
  //   vehicle: '',
  // });

  // useEffect(() => {
  //   getData('user').then(res => {
  //           const data = res;
  //     data.photo = {uri: res.photo};
  //          setProfile(res);
  //   });
  // }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.vehicle}>{profile.vehicle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 10,
    textTransform: 'capitalize',
  },
  vehicle: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,

    textTransform: 'capitalize',
  },
});
