/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {colors, getData, showError, storeData} from '../../assets/utils';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {FireDB} from '../../config';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    vehicle: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  // useEffect(() => {
  //   getData('user').then(res => {
  //     const data = res;
  //     setPhoto({uri: res.photo});
  //     setProfile(data);
  //   });
  // }, []);
  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karater');
      } else {
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };
  const updatePassword = () => {
    FireDB.auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(err => {
          showMessage(err.message);
        });
      }
    });
  };
  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;
    FireDB.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        // console.log('success: ');
        storeData('user', data)
          .then(() => {
            navigation.replace('MainApp');
          })
          .catch(() => {
            showError('Uupps terjadi masalah');
          });
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

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary({includeBase64: true}, response => {
      // Same code as in above section!
      console.log('response: ', response);
      if (response.didCancel || response.error) {
        showMessage({
          message: 'oops, sepertinya anda tidak memilih foto nya?',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        console.log('response getImage: ', response);
        const source = {uri: response.uri};
        setPhotoForDB(`data:${response.type};base64, ${response.base64}`);
        setPhoto(source);
      }
    });
  };

  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Kendaraan"
            value={profile.vehicle}
            onChangeText={value => changeText('vehicle', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          {/* <Input
            label="Password"
            secureTextEntry
            value={password} disable
            onChangeText={value => setPassword(value)}
          /> */}
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
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
