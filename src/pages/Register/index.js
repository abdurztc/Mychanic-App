/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ScrollView} from 'react-native-gesture-handler';
import {colors, storeData, useForm} from '../../assets/utils';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {FireDB} from '../../config';

const Register = ({navigation}) => {
  // const [fullName, setFullName] = useState('');
  // const [vehicle, setVehicle] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const [form, setForm] = useForm({
    fullName: '',
    vehicle: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const onContinue = () => {
    console.log(form);
    setLoading(true);
    FireDB.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false);
        setForm('reset');
        const data = {
          fullName: form.fullName,
          vehicle: form.vehicle,
          email: form.email,
          uid: success.user.uid,
        };
        FireDB.database()
          .ref('users/' + success.user.uid + '/')
          .set(data);

        storeData('user', data);
        navigation.navigate('UploadPhoto', data);
        console.log('register sukses : ', success);
      })
      .catch(error => {
        var errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
        });
        console.log('error: ', error);
      });
  };

  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Input
              label="Full Name"
              value={form.fullName}
              textTransform="capitalize"
              onChangeText={value => setForm('fullName', value)}
            />
            <Gap height={24} />
            <Input
              label="Kendaraan Anda"
              value={form.vehicle}
              textTransform="capitalize"
              onChangeText={value => setForm('vehicle', value)}
            />
            <Gap height={24} />
            <Input
              label="Email"
              value={form.email}
              textTransform="lowercase"
              onChangeText={value => setForm('email', value)}
            />
            <Gap height={24} />
            <Input
              label="Password"
              value={form.password}
              secureTextEntry={true}
              onChangeText={value => setForm('password', value)}
            />
            <Gap height={50} />
            <Button title="Continue" onPress={onContinue} />
          </View>
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
