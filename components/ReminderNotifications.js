import React, { useState, useEffect, useMemo, useFocusEffect } from 'react';
import {
  Text, View, Button, Platform, Alert, TextInput, FlatList,
  SafeAreaView, TouchableOpacity, Keyboard, StyleSheet, Pressable, Image, ImageBackground
} from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import CalendarIcon from "react-native-vector-icons/Fontisto"
import TimerIcon from "react-native-vector-icons/MaterialCommunityIcons"

export default function ReminderNotifications({ route }) {
  const navigation = useNavigation();
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState('');
  const [isNoteFilled, setIsNoteFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  const [reminders, setReminders] = useState([]);

  const memoizedRemindData = useMemo(() => remindData, []);

  const { remindData } = route.params || []; 
  // const remindData = [
  //   {
  //     dosage_per_day: 1,
  //     end_date: "2024-03-09T00:00:00",
  //     frequency_afternoon: 0,
  //     frequency_evening: 1,
  //     frequency_morning: 1,
  //     name: "Cetirizine Hightamine",
  //     quantity_per_dose: 1,
  //     record_id: "e8d62787-7553-438f-b51c-b1d948de0c53",
  //     start_date: "2024-03-08T00:00:00",
  //     total_quantity: 40,
  //     unit: "viên",
  //   },
  //   {
  //     dosage_per_day: 1,
  //     end_date: "2024-03-10T00:00:00",
  //     frequency_afternoon: 0,
  //     frequency_evening: 0,
  //     frequency_morning: 1,
  //     name: "Cetimed An",
  //     quantity_per_dose: 1,
  //     record_id: "8c4bc3d6-bb8f-4b47-9f65-9c396a95bef2",
  //     start_date: "2024-03-08T00:00:00",
  //     total_quantity: 20,
  //     unit: "viên",
  //   },
  //   {
  //     dosage_per_day: 1,
  //     end_date: "2024-03-14T00:00:00",
  //     frequency_afternoon: 0,
  //     frequency_evening: 0,
  //     frequency_morning: 1,
  //     name: "Viên folic Kêm",
  //     quantity_per_dose: 1,
  //     record_id: "67795dfc-58c7-4d89-89e3-aff7d182420c",
  //     start_date: "2024-03-08T00:00:00",
  //     total_quantity: 20,
  //     unit: "viên",
  //   },]






  useEffect(() => {
    
    loadReminders()

    // Khởi động dữ liệu từ AsyncStorage khi component mount
    registerForPushNotificationsAsync();
    const notificationHandler = {
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    };
    Notifications.setNotificationHandler(notificationHandler);

  }, []);

  useEffect(() => {
    setIsNoteFilled(!!note.trim());
  }, [note]);

  useEffect(() => {
    if (remindData && Array.isArray(remindData)) {
      remindData.forEach(item => {
        const startDate = new Date(item.start_date);
        const endDate = new Date(item.end_date);

        // Lặp qua từng ngày từ startDate đến endDate
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
          // Kiểm tra xem ngày hiện tại có nằm trong khoảng từ start_date đến end_date không
          if (date) {
            // Kiểm tra các frequency để set thời gian cho reminder
            if (item.frequency_morning === 1) {
              const morningDate = new Date(date);
              morningDate.setHours(8, 0, 0, 0);
              handleAddReminder(morningDate, item.name);
              scheduleNotificationAsync(morningDate, item.name);

            }
            if (item.frequency_afternoon === 1) {
              const afternoonDate = new Date(date);
              afternoonDate.setHours(13, 0, 0, 0);
              handleAddReminder(afternoonDate, item.name);
              scheduleNotificationAsync(afternoonDate, item.name);

            }
            if (item.frequency_evening === 1) {
              const eveningDate = new Date(date);
              eveningDate.setHours(18, 0, 0, 0);
              handleAddReminder(eveningDate, item.name);
              scheduleNotificationAsync(eveningDate, item.name);


            }
            if (item.frequency_morning === 0 && item.frequency_afternoon === 0 && item.frequency_evening === 0) {
              const morningDate = new Date(date);
              morningDate.setHours(8, 0, 0, 0);
              handleAddReminder(morningDate, item.name);
              scheduleNotificationAsync(morningDate, item.name);

            }
          }
        }
      });


    } else {

      return
    }

  }, [memoizedRemindData]);

  const loadReminders = async () => {
    setIsLoading(true)

    try {
      const remindersData = await AsyncStorage.getItem('reminders');
      if (remindersData !== null) {
        setReminders(JSON.parse(remindersData));

      }
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load reminders:', error);
      setIsLoading(false)

    }
  };

  const saveReminders = async (remindersData) => {
    try {
      await AsyncStorage.setItem('reminders', JSON.stringify(remindersData));
    } catch (error) {
      console.error('Failed to save reminders:', error);
    }
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
    handleAddReminderNote(newDate);
    hideDateTimePicker();
  };

  const scheduleNotificationAsync = async (date, note) => {
    try {
      const futureDate = new Date(date.getTime() + 60000); // Add 1 minute to current time
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Pillsy',
          body: `Nhắc nhở: ${note}`,
          sound: 'default',
        },
        trigger: { date: futureDate },
      });
      // Notification scheduled for a future time
    } catch (error) {
      // Handle errors
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


  const handleAddReminder = (date, name) => {
    const newReminder = { date: date, note: name };

    setReminders(prevReminders => {
      const updatedReminders = [...prevReminders, newReminder];
      saveReminders(updatedReminders);
      return updatedReminders;
    });
    setNote('');
  };


  const handleAddReminderNote = (date) => {
    const newReminder = { date: date, note: note };

    setReminders(prevReminders => {
      const updatedReminders = [...prevReminders, newReminder];
      saveReminders(updatedReminders);
      return updatedReminders;
    });
    setNote('');
  };

  const handleDeleteReminder = async (accId, time, index) => {
    try {
      // console.log('====================================');
      // console.log("data click vào ngày: ", format(accId.date, 'dd-MM-yyyy HH:mm'), index);
      // console.log("data click vào time: ", format(accId.date, 'HH:mm'), index);
      // console.log("data click vào tên: ", accId.note, index);
      // console.log('====================================');

      const updatedReminders = [...reminders];

      const indexToDelete = updatedReminders.findIndex(reminder => {
        return (
          format(accId.date, 'dd-MM-yyyy') === format(reminder.date, 'dd-MM-yyyy') &&
          format(accId.date, 'HH:mm') === format(reminder.date, 'HH:mm') &&
          accId.note === reminder.note
        );
      });

      if (indexToDelete !== -1) {
        updatedReminders.splice(indexToDelete, 1);
        setReminders(updatedReminders);

        const remindersData = await AsyncStorage.getItem('reminders');
        let remindersList = remindersData ? JSON.parse(remindersData) : [];

        remindersList = remindersList.filter(item => (
          format(accId.date, 'dd-MM-yyyy') !== format(item.date, 'dd-MM-yyyy') ||
          format(accId.date, 'HH:mm') !== format(item.date, 'HH:mm') ||
          accId.note !== item.note
        ));

        await AsyncStorage.setItem('reminders', JSON.stringify(remindersList));
      } else {
        console.log('Selected reminder does not match any reminder in the list.');
      }

      setReminders([...updatedReminders]);
    } catch (error) {
      console.error('Failed to delete reminder from AsyncStorage:', error);
    }
  };
  const confirmDeleteReminder = (reminder, time, index) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this reminder?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => handleDeleteReminder(reminder, time, index),
        },
      ],
      { cancelable: false }
    );
  };


  const handleClearAllReminders = async () => {
    try {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to clear all reminders?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Clear All',
            onPress: async () => {
              setReminders([]);
  
              await Notifications.cancelAllScheduledNotificationsAsync();
  
              await AsyncStorage.removeItem('reminders');
  
              Alert.alert('All reminders cleared successfully!');
            }
          }
        ]
      );
    } catch (error) {
      console.error('Failed to clear all reminders:', error);
      Alert.alert('Failed to clear all reminders. Please try again later.');
    }
  };

  const groupRemindersByDate = () => {
    const groupedReminders = reminders.reduce((acc, reminder) => {
      const date = format(reminder.date, 'dd-MM-yyyy HH:mm');
      const time = format(reminder.date, 'HH:mm');
      const dateTime = `${date} ${time}`;

      if (!acc[dateTime]) {
        acc[dateTime] = [];
      }
      acc[dateTime].push(reminder);
      return acc;
    }, {});

    // console.log("reminders: ", reminders);

    return Object.entries(groupedReminders).map(([dateTime, reminders]) => {
      const [date, time] = dateTime.split(' ');
      return {
        date,
        time,
        reminders,
      };
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>
      {isLoading ? (
        <ImageBackground source={require("../assets/edit_background_8.jpg")} style={{ flex: 1 }} resizeMode="cover">

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20, }}>
          <View >
            <Text style={{ fontSize: 30, fontWeight: "700", color: "#fff", }}>P I L L S Y</Text>
          </View>
          <Image source={require("../assets/loading/giphy2.gif")} />
          <Text style={{ fontSize: 20, fontWeight: "600" }}>Chờ trong giây lát nhé....</Text>
          <View style={{ padding: 10, borderWidth: 1, borderColor: "#000", backgroundColor: "#B6FFFA", borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#211951" }}>
              Bạn có biết:
            </Text>
            <Text style={{ fontStyle: "italic", fontSize: 15, fontWeight: "500", }}>
             "Bạn có thể quên nhiều thứ nhưng không được phép quên rèn luyện sức khỏe. Bởi sức khỏe là điều tiên quyết giúp bạn có một cuộc sống hạnh phúc trọn vẹn."

            </Text>
          </View>
        </View>

      </ImageBackground>


      ) : (
       <View style={{flex: 1}}>
         <View style={{ flex: 0 , paddingVertical: 10}}>
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
            <View >
              <Image source={require('../assets/icon/icons8-notification.gif')} style={{ width: 30, height: 30, }} />
            </View>
          </View>
          <View style={styles.containerContext}>
            <Text style={styles.upperContext} >Type your prescription to remind</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', }}>
            <TextInput
              style={{
                height: 40,
                width: "90%",
                borderColor: 'gray',
                borderWidth: 1,
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                fontSize: 16,
                marginBottom: 20,



              }}
              onChangeText={text => setNote(text)}
              value={note}
              placeholder="Enter a note"
            />
            <View style={{ flexDirection: "column-reverse", alignItems: 'center' }}>

              <TouchableOpacity
                onPress={() => {
                  if (isNoteFilled) {
                    setIsNoteFilled(true);
                    setNote(note);
                    showDateTimePicker();
                  }
                }}>
                <View style={{
                  flexDirection: "row", alignItems: 'center', justifyContent: 'center', width: 200, height: 40, backgroundColor: "#CDFADB", borderRadius: 10,
                  ...Platform.select({
                    ios: {
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.8,
                    },
                 
                  }),
                  borderColor: '#64CCC5',
                  borderWidth: 1

                }}>
                  <Text style={{ fontWeight: "700" }}>Set up your remind! </Text>
                </View>
              </TouchableOpacity>

            </View>

            {groupRemindersByDate().length > 1 ? (
              <TouchableOpacity style={{ marginTop: 10, }} onPress={handleClearAllReminders}>
                <View style={{ alignItems: 'center', width: 200., paddingVertical: 10, backgroundColor: "#D61355", borderRadius: 10 }}>
                  <Text style={{ width: "100%", textAlign: 'center', height: "auto", flexDirection: "column", fontWeight: "bold", color: '#fff' }}>Clear All</Text>
                </View>
              </TouchableOpacity>
            ) : ("")}

           


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
        <View style={{ flex: 1, alignItems: "center",  }} >
           <FlatList
              showsVerticalScrollIndicator={false}  
              contentContainerStyle={styles.listDataReminder}
              data={groupRemindersByDate()}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 20,  }}>
                  <View style={{ flexDirection: "row",   }}>
                    <View style={{ backgroundColor: "#15F5BA", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 5, flexDirection: 'row', alignItems:'center' }}>
                      <CalendarIcon name='date' size={20}></CalendarIcon>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10 }}>{item.date}</Text>

                    </View>
                    <View style={{ backgroundColor: "#96EFFF", borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 5, flexDirection: 'row', alignItems:'center' }}>
                      <TimerIcon name='timer' size={20}></TimerIcon>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10 }}>{item.time}</Text>  

                    </View>
                  </View>
                  {item.reminders.map((reminder, index) => (
                    <View key={index} style={{ flexDirection: 'column', backgroundColor: "#BEFFF7", width: 350, borderRadius: 20, padding: 10, marginTop: 10, borderWidth: 2, borderColor: "#5FBDFF" }}>

                      <Text>{`Note: ${reminder.note}`}</Text>
                      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity onPress={() => confirmDeleteReminder(reminder, item.time, index)} style={{ width: 60, height: 40, backgroundColor: "#D61355", justifyContent: 'center', alignItems: 'center', borderRadius: 10, }}>
                          <Text style={{ color: '#fff', fontWeight: "bold" }}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              keyboardShouldPersistTaps="handled"
            />
        </View>
       </View>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    gap: 10,
    backgroundColor: "#f1f4f8"
  },
  arrowBackContainer: {
    width: 80,
    marginLeft: 20,
  },
  containerTitle: {
    paddingHorizontal: 35,
    flexDirection: 'row'
  },
  upperTitle: {
    fontSize: 30,
    color: "#03358C",
    fontWeight: "700",
    textAlign: "left"
  },
  containerContext: {
    marginVertical: 10
  },
  upperContext: {
    fontSize: 20,
    color: "#03358C",
    fontWeight: "400",
    textAlign: "center"
  },
  listDataReminder: {
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    borderColor: '#96EFFF',
    width: "100%"
  }
})