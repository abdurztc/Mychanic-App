/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
  showSuccess,
} from '../../assets/utils';
import {ChatItem, Header, InputChat} from '../../components';
import {FireDB} from '../../config';
import NotifService from '../../NotifService';

const Chatting = ({navigation, route}) => {
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = (token) => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = (notif) => {
    Alert.alert(notif.title, notif.message);
  };

  const notif = new NotifService(onRegister, onNotif);

  const handlePerm = (perms) => {
    Alert.alert('Permissions', JSON.stringify(perms));
  };
  const dataMechanic = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataLocal();
    const chatusernmechanicByID = `${user.uid}_${dataMechanic.data.uid}`;
    const urlFirebase = `chatting/${chatusernmechanicByID}/allChat/`;
    FireDB.database()
      .ref(urlFirebase)
      .on('value', snapshot => {
        // console.log('data chat: ', snapshot.val());
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];
            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });
            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          // console.log('hasil looping array : ', allDataChat);
          setChatData(allDataChat);
        }
      });
  }, [dataMechanic.data.uid, user.uid]);
  const getDataLocal = () => {
    getData('user').then(res => {
      // console.log('user yang lagi login: ', res);
      setUser(res);
    });
  };
  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const chatusernmechanicByID = `${user.uid}_${dataMechanic.data.uid}`;

    const urlFirebase = `chatting/${chatusernmechanicByID}/allChat/${setDateChat(
      today,
    )}`;
    const urlMessagesUser = `messages/${user.uid}/${chatusernmechanicByID}`;
    const urlMessagesMechanic = `messages/${dataMechanic.data.uid}/${chatusernmechanicByID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataMechanic.data.uid,
    };
    const dataHistoryChatForMechanic = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      // uidPartner: dataMechanic.data.uid,
      uidPartner: user.uid,
    };
    // console.log('data untuk dikirim: ', data);
    setChatContent('');
    FireDB.database()
      .ref(urlFirebase)
      .push(data)
      .then(res => {
        setChatContent('');
        FireDB.database()
          .ref(urlMessagesUser)
          .set(dataHistoryChatForUser);

        FireDB.database()
          .ref(urlMessagesMechanic)
          .set(dataHistoryChatForMechanic);
        showSuccess('Terima kasih kami akan segera membalas Pesan Anda');
      })
      .catch(err => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataMechanic.data.fullName}
        desc={dataMechanic.data.category}
        photo={{uri: dataMechanic.data.photo}}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : {uri: dataMechanic.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>

      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={chatSend}
        onPress={() => {
          notif.localNotif();
        }}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.cardLight,
    flex: 1,
  },
  content: {flex: 1},
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
