/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../assets/utils';
import {Header, List} from '../../components';
import {FireDB} from '../../config';

const ChooseMechanic = ({navigation, route}) => {
  const [listMechanic, setListMechanic] = useState([]);
  const itemCategory = route.params;
  useEffect(() => {
    callMechanicByCategory(itemCategory.category);
  }, [itemCategory.category]);

  const callMechanicByCategory = category => {
    FireDB.database()
      .ref('mechanics/')
      .orderByChild('category')
      .equalTo(category)
      .once('value')
      .then(res => {
        console.log('data list mekanik : ', res.val());
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(item => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          console.log('parse list mekanik: ', data);
          setListMechanic(data);
        }
      });
  };

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={`Pilih ${itemCategory.category}`}
        onPress={() => navigation.goBack()}
      />
      {listMechanic.map(mechanic => {
        return (
          <List
            key={mechanic.id}
            type="next"
            profile={{uri: mechanic.data.photo}}
            name={mechanic.data.fullName}
            desc={mechanic.data.experience}
            onPress={() => navigation.navigate('MechanicProfile', mechanic)}
          />
        );
      })}
    </View>
  );
};

export default ChooseMechanic;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cardLight,
    flex: 1,
  },
});
