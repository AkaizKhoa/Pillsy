import React, { useState, useEffect } from 'react';
import { Text, View, Button, Platform, Alert, TextInput, FlatList,
   SafeAreaView, TouchableOpacity, Keyboard, StyleSheet, Pressable, Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";


export default function ReminderNotifications({route}) {
  const navigation = useNavigation();
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState('');
  const [reminders, setReminders] = useState([]);

  const { remindData } = route.params || {}; 

  useEffect(() => {
    // Khởi động dữ liệu từ AsyncStorage khi component mount
    loadReminders();
    registerForPushNotificationsAsync();
    const notificationHandler = {
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    };
    Notifications.setNotificationHandler(notificationHandler);

    // Lưu trữ dữ liệu vào AsyncStorage khi component unmount
    return () => {
      saveReminders(reminders);
    };
  }, []);


  useEffect(() => {
    // Nếu remindData có dữ liệu
    if (remindData) {
      // Duyệt qua mỗi phần tử trong remindData để tạo nhắc nhở và lưu vào state và AsyncStorage
      remindData.forEach(item => {
        const date = new Date(item.date);
        handleAddReminder(date, item.name); // Gọi hàm handleAddReminder để thêm nhắc nhở
        scheduleNotificationAsync(date, item.name); // Gọi hàm scheduleNotificationAsync để đặt lịch nhắc nhở
      });
    }
  }, [remindData]);

  const loadReminders = async () => {
    try {
      const remindersData = await AsyncStorage.getItem('reminders');
      if (remindersData !== null) {
        setReminders(JSON.parse(remindersData));
        console.log('====================================');
        console.log("load: ", remindersData);
        console.log('====================================');
      }
    } catch (error) {
      console.error('Failed to load reminders:', error);
    }
  };

  const saveReminders = async (remindersData) => {
    try {
      await AsyncStorage.setItem('reminders', JSON.stringify(remindersData));
    } catch (error) {
      console.error('Failed to save reminders:', error);
    }
  };



  const handleNotification = notification => {
    console.log(notification);
  };

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  const handleDatePicked = date => {
    const newDate = new Date(date);
    newDate.setSeconds(0);

    setSelectedDate(newDate);
    handleAddReminder(newDate);
    hideDateTimePicker();
  };

  const scheduleNotificationAsync = async (date, note) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Pillsy',
          body: `Nhắc nhở: ${date.toLocaleString()}${note ? ': ' + note : ''}`,
          sound: 'default',
        },
        trigger: { date },
      });
      Alert.alert('Notification scheduled successfully!');
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      Alert.alert('Failed to schedule notification. Please try again later.');
    }
  };

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Permission denied', 'Please allow notification permissions to receive reminders.');
        }
      }
    } catch (error) {
      console.error('Failed to get notification permissions:', error);
      Alert.alert('Failed to get notification permissions. Please try again later.');
    }
  };


  const handleAddReminder = (date) => {
    const newReminder = { date: date, note: note };
    setReminders(prevReminders => {
      const updatedReminders = [...prevReminders, newReminder];
      saveReminders(updatedReminders);
      return updatedReminders;
    });
    setNote('');
  };

  const handleDeleteReminder = async (index) => {
    try {
      const updatedReminders = [...reminders];
      const deletedReminder = updatedReminders.splice(index, 1)[0]; // Lấy ra mục muốn xóa
      setReminders(updatedReminders); // Cập nhật state reminders

      // Lấy danh sách reminders từ AsyncStorage
      const remindersData = await AsyncStorage.getItem('reminders');
      let remindersList = remindersData ? JSON.parse(remindersData) : [];

      // Lọc ra mục cần xóa và cập nhật lại danh sách reminders trước khi lưu vào AsyncStorage
      remindersList = remindersList.filter(item => item.date !== deletedReminder.date || item.note !== deletedReminder.note);
      await AsyncStorage.setItem('reminders', JSON.stringify(remindersList));

      Alert.alert('Reminder deleted successfully!');
    } catch (error) {
      console.error('Failed to delete reminder from AsyncStorage:', error);
    }
  };


  return (
    <SafeAreaView >
    <View style={{marginTop: 50}}>
    <View style={styles.arrowBackContainer}>
        <Pressable style={({ pressed }) => pressed && styles.pressedItem}
          onPress={() => {
            navigation.navigate("MainScreen")

          }}>
          <ArrowBackLeft />
        </Pressable>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.upperTitle} >Reminders and Scheduling</Text>
      </View>
      <View style={styles.containerContext}>
        <Text style={styles.upperContext} >Type your prescription to remind</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          style={{height: 40,
            width: "90%",
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 10,
            padding: 10, // Tăng khoảng cách từ nội dung đến viền
            borderRadius: 10, // Bo tròn viền
            fontSize: 16,
          marginBottom: 20 }}
          onChangeText={text => setNote(text)}
          value={note}
          placeholder="Enter a note"
        />
      <View style={{flexDirection: "column-reverse", alignItems: 'center'}}>
      <TouchableOpacity
        onPress={showDateTimePicker}>
         <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: "#CDFADB", borderRadius: 10, }}>
         <Text style={{fontWeight: "700"}}>Set up your remind! </Text>
         </View>
        </TouchableOpacity>
        <Image source={require('../assets/icon/icons8-notification.gif')} style={{marginBottom: 10}} />
      </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ height: "100%" }}
          data={reminders}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'column', backgroundColor: "#EE99C2", width: 300, height: 100, borderRadius: 20, padding: 10, marginVertical: 10,   }}>
              <Text>{`Time: ${format(item.date, 'dd-MM-yyyy HH:mm')}`}</Text>
              <Text>{`Note: ${item.note}`}</Text>
              <View style={{flexDirection:"row", justifyContent: "flex-end"}}>
              <TouchableOpacity onPress={() => handleDeleteReminder(index)} style={{ width: 60, height: 40, backgroundColor: "#000", justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ color: '#fff' }}>Delete</Text>
              </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="handled" // Đảm bảo việc chạm vào FlatList sẽ ẩn bàn phím
        />

        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="datetime"
          onConfirm={date => {
            const newDate = new Date(date);
            newDate.setSeconds(0);
            handleDatePicked(newDate);
            scheduleNotificationAsync(newDate, note);
            Keyboard.dismiss(); // Ẩn bàn phím
          }}
          onCancel={() => {
            hideDateTimePicker();
            Keyboard.dismiss(); // Ẩn bàn phím
          }}
          onHide={() => Keyboard.dismiss()} // Ẩn bàn phím khi DateTimePickerModal bị ẩn
          display={Platform.OS === "ios" ? "calendar" : "default"}
          modalStyleIOS={{}}
          pickerStyleIOS={{ alignItems: 'center', paddingVertical: 20 }}

        />

      </View>
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#f1f4f8"
  },
  arrowBackContainer: {
    width: 80,
    marginLeft: 20,
  },
  containerTitle: {
    paddingHorizontal: 35,
  },
  upperTitle: {
    fontSize: 30,
    color: "#03358C",
    fontWeight: "700",
    textAlign: "left"
  },
  containerContext: {
    paddingHorizontal: 35,
    marginVertical: 10
  },
  upperContext: {
    fontSize: 20,
    color: "#03358C",
    fontWeight: "400",
    textAlign: "center"
  },
})