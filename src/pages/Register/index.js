/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../assets/utils';
import { Button, Gap, Header, Input } from '../../components';

const Register = () => {
  return (
    <View style={styles.page}>
      <Header />
      <View style={styles.content}>
        <Input label="Full Name" />
        <Gap height={24} />
        <Input label="Profesi" />
        <Gap height={24} />
        <Input label="Email" />
        <Gap height={24} />
        <Input label="Password" />
        <Gap height={50} />
        <Button title="Continue" />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  content: {
    padding: 40,
    paddingTop: 0,
  },
  page:{
      backgroundColor: colors.white,
      flex: 1
  }
});
