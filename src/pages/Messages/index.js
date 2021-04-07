/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts, getData} from '../../assets/utils';
import {List} from '../../components';
import {FireDB} from '../../config';

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataLocal();
    const urlHistory = `messages/${user.uid}/`;
    const rootDB = FireDB.database().ref();
    const messagesDB = rootDB.child(urlHistory);

    messagesDB.on('value', async snapshot => {
      // console.log('data history : ', snapshot.val());
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = await Object.keys(oldData).map(async key => {
          //joint
          const urlUidMechanic = `mechanics/${oldData[key].uidPartner}`;
          const detailMechanic = await rootDB
            .child(urlUidMechanic)
            .once('value');
          // console.log('detail mechanic: ', detailMechanic.val());
          data.push({
            id: key,
            detailMechanic: detailMechanic.val(),
            ...oldData[key],
          });
        });
        await Promise.all(promises);
        // console.log('new data history : ', data);
        setHistoryChat(data);
      }
    });
  }, [user.uid]);
  const getDataLocal = () => {
    getData('user').then(res => {
      // console.log('user yang lagi login: ', res);
      setUser(res);
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Chat History</Text>
        {historyChat.map((chat) => {
          const dataMechanic = {
            id: chat.detailMechanic.uid,
            data: chat.detailMechanic,
          };
          return (
            <List
              key={chat.id}
              profile={{uri: chat.detailMechanic.photo}}
              name={chat.detailMechanic.fullName}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting', dataMechanic)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.cardLight,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
