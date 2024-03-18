import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity, Pressable, FlatList, TextInput, Modal, Alert, ScrollView, Animated, ImageBackground } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import IconCircle1 from '../assets/icon/Ellipse7.svg'
import IconCircle2 from '../assets/icon/Ellipse8.svg'
import IconShare from 'react-native-vector-icons/MaterialCommunityIcons'
import IconSave from 'react-native-vector-icons/MaterialCommunityIcons'
import IconDiscard from 'react-native-vector-icons/AntDesign'
import ArrowBackLeft from "../assets/icon/arrow_back_left.svg";
import IconImagePicker from "../assets/icon/icon-image-picker.svg"
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingIndicator from '../context/LoadingIndicator ';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import DatePicker from "react-native-modern-datepicker"
import moment from 'moment';
import CheckBox from 'react-native-check-box';
import { format } from 'date-fns';
import CloseIcon from "react-native-vector-icons/AntDesign"
import WarningIcon from "react-native-vector-icons/AntDesign"

import EditIcon from "react-native-vector-icons/Feather"
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';


import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
export default function Scan() {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { userToken } = useContext(AuthContext);

  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false);

  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [data2IsSet, setData2IsSet] = useState(false)
  const [dataToSaveDB, setDataToSaveDB] = useState(null)


  const [recordId, setRecordId] = useState('')
  const [pillName, setPillName] = useState('');
  const [dosagePerDay, setDosagePerDay] = useState('');
  const [quantityPerDose, setQuantityPerDose] = useState('');
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dateStart, setDateStart] = useState(new Date())
  const [morning, setMorning] = useState(false)
  const [afternoon, setAfternoon] = useState(false)
  const [evening, setEvening] = useState(false)
  const [unitUpdate, setUnitUpdate] = useState('')



  const [dataToHold, setDataToHold] = useState(null)
  const [isRender, setIsRender] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [editItem, setEditItem] = useState();
  const [displayEndDate, setDisplayEndDate] = useState(format(dateEnd, 'dd-MM-yyyy'));

  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
  const uploadImageEndpoint = `${BASE_URL}/api/v1/prescription-management/prescriptions/upload-ocr-image`;
  
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      // console.log('====================================');
      // console.log("Result: ", result.assets[0].uri);
      // console.log('====================================');
      if (!result.canceled) {
        setIsLoading(true);

        // Create a FormData object to append the selected image file
        const formData = new FormData();
        formData.append('file', {
          uri: result.assets[0].uri,
          type: 'image/jpeg', // Adjust the type based on the selected image type
          name: 'image.jpg', // You can set a custom name for the file
        });

        // Add your authorization token to the headers
        const headers = {
          'Authorization': 'Bearer ' + userToken,
          'Content-Type': 'multipart/form-data', // Set content type to 'multipart/form-data'
        };

        // Append the 'uri' as a query parameter to the endpoint
        const uriQueryParam = `?uri=${encodeURIComponent(result.assets[0].uri)}`;
        const uploadImageURL = `${uploadImageEndpoint}${uriQueryParam}`;

        // console.log('====================================');
        // console.log(uploadImageURL);
        // console.log('====================================');
        console.log('====================================');
        console.log(formData);
        console.log('====================================');
        // Send the POST request to the API

        axios.post(uploadImageURL, formData, { headers })
          .then((response) => {
            // Handle the response from the API
            // console.log(">>>>>Res:", response);
            // console.log('API Response:', response.data);
            console.log("Bat dau setImage: ", response.data.image);
            setImage(response.data.image);
            setData(response.data)
            // console.log("Data:", data);
            // Add any additional logic based on the API response
          })
          .catch((error) => {
            console.error('API Error:', error.response || error);
            // Handle errors if needed
            setIsLoading(false);
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: 'Fail!',
              textBody: 'Some incidents happened! Please try again',

            })

          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error('ImagePicker Error:', error);
      // Handle errors if needed
    }
  };
  // useEffect(() => {
  //   if (image) {
  //     // setImage(image);
  //     console.log(" 3 Image cập nhật: ", image);
  //   }


  // }, [image]);
  useEffect(() => {
    console.log("Data2 updated:", data2);

    if (data2 !== null) {
      setData2IsSet(true)
      setDataToHold(data2)
    } else {
      return
    }
  }, [data2]);

  const neonLight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(neonLight, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true
        }),
        Animated.timing(neonLight, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true
        })
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);
  const borderColorInterpolation = neonLight.interpolate({
    inputRange: [0, 1, 1],
    outputRange: ['#5C11FF', '#cbb7f7', '#490dce']
  });

  const confirmAction = () => {
    setImage(null)
    setIsLoading(true)

    try {
      const secondApiEndpoint = `${BASE_URL}/api/v1/prescription-management/prescriptions/return-predict-info`;

      const requestData = {
        status: data.status,
        user_Id: data.user_Id,
        prescription_Id: data.prescription_Id,
        data: data.data,
        image: image,  // Use the image from state
        error: data.error
      };

      const headers = {
        'Authorization': 'Bearer ' + userToken,
        'Content-Type': 'application/json', // Set content type to 'multipart/form-data'
      };

      axios.post(secondApiEndpoint, requestData, { headers })
        .then((secondApiResponse) => {
          // Handle the response from the second API
          console.log("Data trả về", secondApiResponse);
          // console.log("Data cần set vào remind: ", secondApiResponse.data.Data.medication_records);
          setData2(secondApiResponse.data.prescriptionCreateDto.data.medication_records);
          setDataToSaveDB(secondApiResponse.data)
          // console.log('====================================');
          // console.log("Data2", data2);
          // console.log('====================================');
        })
        .catch((error) => {
          console.error('Second API Error:', error.response || error);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Fail!',
            textBody: 'Some incidents happened! Please try again',
          })
        })
        .finally(() => {
          setIsLoading(false); // Moved into finally block
        });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Fail!',
        textBody: 'Some incidents happened! Please try again',

      })
      setIsLoading(false)

    }
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");

    })();
  }, []);

  useEffect(() => {


    validateForm();
  }, [pillName, dosagePerDay, quantityPerDose, unitUpdate]);

  const validateForm = () => {
    let errors = {};

    // Validate name field 
    if (!pillName) {
      errors.pillName = '*PillName is required.';
    }
    if (!dosagePerDay) {
      errors.dosagePerDay = '*DosagePerDay is required.';
    } else if (dosagePerDay === '0') {
      errors.dosagePerDay = '* DosagePerDay cannot be 0.';
    }
    if (!quantityPerDose) {
      errors.quantityPerDose = '*QuantityPerDose is required.';
    } else if (quantityPerDose === '0') {
      errors.quantityPerDose = '* DosagePerDay cannot be 0.';
    }
    if (!unitUpdate) {
      errors.unitUpdate = '*Unit is required.';
    } else if (!isNaN(unitUpdate)) {
      errors.unitUpdate = 'Please enter the unit of the medication.';
    }


    setErrors(errors);
    console.log("So loi co dc: ", Object.keys(errors).length);

    setIsFormValid(Object.keys(errors).length === 0);
  }

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }



  const uploadPhoto = async (photoData) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('file', {
        uri: photoData.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      const headers = {
        'Authorization': 'Bearer ' + userToken,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(uploadImageEndpoint, formData, { headers });
      console.log(">>>>>Res:", response);
      console.log('API Response:', response.data);
      setImage(response.data.image);
      setData(response.data);
    } catch (error) {
      console.error('API Error:', error.response || error);
      setIsLoading(false);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Fail!',
        textBody: 'Some incidents happened! Please try again',

      })

    } finally {
      setIsLoading(false);
      setPhoto(null)

    }
  };




  let takePic = async () => {
    let options = {
        exif: true,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    // let isAndroid = Platform.OS === 'android';
    // let rotateValue = isAndroid ?  0 : 0; 

    let manipulatedImage = await manipulateAsync(
        newPhoto.uri,
        [{ rotate: 0 }],
        { format: 'jpeg' }
    );

    let resizedImage = await manipulateAsync(
        manipulatedImage.uri,
        [{ resize: { width: newPhoto.width, height: newPhoto.height } }]
    );

    setPhoto(resizedImage);
};

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });


    };

    const handleScanImage = async () => {
      if (photo) {
        try {

          uploadPhoto(photo);
        } catch (error) {
          console.error('Error manipulating image:', error);
        }
      } else {
      }
    };





    return (
   <AlertNotificationRoot>
       <SafeAreaView style={{ flex: 1, justifyContent: 'center', }}>

{isLoading ? (<ImageBackground source={require("../assets/edit_background_10.jpg")} style={{ flex: 1 }} resizeMode="cover">

  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20, }}>
    <View >
      <Text style={{ fontSize: 30, fontWeight: "700", color: "#fff", }}>P I L L S Y</Text>
    </View>
    <Image source={require("../assets/loading/giphy.gif")} />
    <Text style={{ fontSize: 20, fontWeight: "600" }}>Chờ trong giây lát nhé....</Text>
    <View style={{ padding: 10, borderWidth: 1, borderColor: "#000", backgroundColor: "#B6FFFA", borderRadius: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#211951" }}>
        Bạn có biết:
      </Text>
      <Text style={{ fontStyle: "italic", fontSize: 15, fontWeight: "500", }}>
        "Giấc ngủ vàng là sợi dây liên kết trọn vẹn sức khỏe và cơ thể bạn."

      </Text>
    </View>
  </View>

</ImageBackground>

) : (<View style={{ flex: 1, justifyContent: 'center' }}>
  <Animated.View style={{
    width: "100", height: "78%", borderWidth: 1, borderRadius: 20, padding: 1, margin: 10, backgroundColor: '#171717',
    shadowColor: '#5C11FF',
    shadowOpacity: 1, shadowRadius: 7, borderColor: borderColorInterpolation
  }}>
    <Image style={{
      width: "100%", height: "100%", resizeMode: 'stretch', borderRadius: 20,



    }} source={{ uri: photo.uri }} />
  </Animated.View>
  <View style={{}}>
    <View style={{ flexDirection: 'column', width: "100%", padding: 20, gap: 10, }}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={styles.buttonFeature}>
          <TouchableOpacity
            onPress={sharePic} style={styles.shareButton} >
            <Text style={styles.textFeature}>Share</Text>

            <IconShare style={{ fontSize: 25 }} name='inbox-arrow-up'></IconShare>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonFeature}>
          <TouchableOpacity
            onPress={handleScanImage} style={styles.pickButton} >
            <Text style={styles.textFeature}>ScanImage</Text>

            <IconShare style={{ fontSize: 25 }} name='inbox-arrow-up'></IconShare>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={styles.buttonFeature}>

          {hasMediaLibraryPermission ? <TouchableOpacity
            onPress={savePhoto} style={styles.saveButton} >
            <Text style={styles.textFeature}>Save</Text>

            <IconSave style={{ fontSize: 25, }} name='arrow-down-bold-box-outline'></IconSave>
          </TouchableOpacity> : undefined}
        </View>
        <View style={styles.buttonFeature}>
          <TouchableOpacity
            onPress={() => setPhoto(undefined)} style={styles.discardButton}>
            <Text style={styles.textFeature}>Discard</Text>

            <IconDiscard style={{ fontSize: 22, }} name='closesquare'></IconDiscard>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
</View>)}

</SafeAreaView>
   </AlertNotificationRoot>
    );
  }

  const handleDateTextClick = () => {
    setShowDatePicker(true);
  };

  function handleChangeDate(newDate) {
    const selectedDate = moment(newDate, 'YYYY/MM/DD');
    if (selectedDate.isBefore(dateStart)) {
      Alert.alert(
        'Error',
        'Please select a valid date.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    } else {
      console.log('====================================');
      console.log("Ngày được chọn:", selectedDate);
      console.log('====================================');
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      console.log('====================================');
      console.log("Ngày được format:", formattedDate);
      console.log('====================================');

      setDateEnd(formattedDate);

      setShowDatePicker(false);
    }


  }















  const onPressItem = (item) => {
    console.log('====================================');
    console.log("Item: ", item);
    console.log('====================================');
    setIsModalVisible(true)
    setPillName(item.name)
    setDosagePerDay(item.dosage_per_day)
    setQuantityPerDose(item.quantity_per_dose)
    setDateEnd(item.end_date)
    setDateStart(item.start_date)
    setMorning(item.frequency_morning)
    setAfternoon(item.frequency_afternoon)
    setEvening(item.frequency_evening)
    setUnitUpdate(item.unit)
    setEditItem(item.record_id)
  }

  const handleEditItem = (editItem) => {
    console.log('====================================');
    console.log(editItem);
    console.log('====================================');
    const newData = dataToHold.map(item => {
      if (item.record_id == editItem) {
        item.name = pillName;
        item.dosage_per_day = dosagePerDay
        item.quantity_per_dose = quantityPerDose
        item.end_date = dateEnd
        item.frequency_morning = (morning == true ? 1 : 0)
        item.frequency_afternoon = (afternoon == true ? 1 : 0)
        item.frequency_evening = (evening == true ? 1 : 0),
          item.unit = unitUpdate

        return item
      }
      return item
    })
    setDataToHold(newData || []);
    setIsRender(!isRender)
    console.log('====================================');
    console.log("data de gui di reminder: ", dataToHold);
    console.log('====================================');
  }



  const onPressSaveEdit = () => {
    validateForm()
    if (isFormValid) {
      handleEditItem(editItem);
      setIsModalVisible(false)
    } else {

    }

  }


  const renderPillsItem = ({ item }) => (
    <View style={styles.itemRenderDataToUpdate}>
      <TouchableOpacity
        style={styles.touchData}
        onPress={() => onPressItem(item)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "#211951", fontSize: 15, fontWeight: "500" }}>{item.name}</Text>
          <EditIcon name='edit-2' size={15}></EditIcon>
        </View>
      </TouchableOpacity>
    </View>
  );


  const handleCloseFlatlist = () => {
    setData2IsSet(false)
  }


  const handleSubmitDataScan = () => {
    setIsLoading(true)
    const thirdApiEndpoint = `${BASE_URL}/api/v1/prescription-management/prescriptions/upload-predict-info`;

    const requestData = {
      prescriptionCreateDto: {
        status: dataToSaveDB.prescriptionCreateDto.status,
        data: {
          medication_records_id: dataToSaveDB.prescriptionCreateDto.data.medication_records_id,
          medication_records: dataToHold,
          meta_data: dataToSaveDB.prescriptionCreateDto.data.meta_data
        },
        error: ""
      },
      prescription: dataToSaveDB.prescription
    };

    console.log("request third to submit is like this: ", requestData);

    const headers = {
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json', // Set content type to 'multipart/form-data'
    };

    axios.post(thirdApiEndpoint, requestData, { headers })
      .then((thirdApiResponse) => {
        console.log("Data trả về", thirdApiResponse);
        setIsLoading(false)

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Scan is done! You can ready to use reminder.',
          button: 'Auto Remind',
          onPressButton: (() => {
            navigation.navigate("ReminderNotifications", {
              remindData: dataToHold
            })
          })
        })
        setData(null)
        setDataToHold(null)
        setDataToSaveDB(null)
        setIsModalVisible(false)
        setData2IsSet(false)
      })
      .catch((error) => {
        console.error('Third API Error:', error.response || error);
        setIsLoading(false)
        // Handle errors if needed
      });
  }



  return (
    <AlertNotificationRoot>

    <SafeAreaView style={{ flex: 1,}}>
    {isLoading ? (<ImageBackground source={require("../assets/edit_background_9.jpg")} style={{ flex: 1 }} resizeMode="cover">

<View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20, }}>
  <View>
    <Text style={{ fontSize: 30, fontWeight: "700" }}>P I L L S Y</Text>
  </View>
  <Image source={require("../assets/loading/giphy1.gif")} />
  <Text style={{ fontSize: 20, fontWeight: "600" }}>Chờ trong giây lát nhé....</Text>
  <View style={{ padding: 10, borderWidth: 1, borderColor: "#000", backgroundColor: "#B6FFFA", borderRadius: 10 }}>
    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#211951" }}>
      Bạn có biết:
    </Text>
    <Text style={{ fontStyle: "italic", fontSize: 15, fontWeight: "500", }}>
      "Thuốc có thể tạm thời giúp bạn bớt đau, nhưng thuốc không thể thay thế cho vận động. Ngược lại, vận động hầu như thay thế cho mọi loại thuốc."

    </Text>
  </View>
</View>

</ImageBackground>) : (
  <View style={styles.container}>
  {image && (
    <View style={styles.overlayBackground}>
      <View style={styles.containerPopUp}>
        <View style={styles.confirmContainer}>
  
          <View style={{ width: "100%", alignItems: 'center', justifyContent: 'flex-end', flexDirection: "row", backgroundColor: "#72FFFF", borderTopLeftRadius: 10, borderTopRightRadius: 10,  }}>
            <View style={{ width: "50%", flexDirection: "row", backgroundColor: "#2B4865",  borderRadius: 5, flex: 1, justifyContent:"center", marginHorizontal: 10 }}>
              <Text style={{ color: '#fff', fontWeight: "700", fontSize: 20, paddingHorizontal: 5 }}>Pillsy Scan!</Text>
              {/* <Image source={require('../assets/icon.png')} style={{ width: 30, height: 30, borderRadius: 10, paddingHorizontal: 5 }}></Image> */}
            </View>
            <View style={{flex: 0}}>
              <TouchableOpacity onPress={() => setImage(null)}>
                <CloseIcon color={"#000"} name='closesquare' size={45}></CloseIcon>
              </TouchableOpacity>
            </View>
          </View>
  
  
  
          <Image source={{ uri: `data:image/jpg;base64,` + image }} style={styles.confirmImage} />
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              confirmAction();
            }}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )}



  {data2IsSet && (
    <View style={styles.overlayBackgroundTwo}>
      <View style={styles.containerPopUpTwo}>
        <View style={{ width: "100%", alignItems: 'center', justifyContent: 'flex-end', flexDirection: "row", backgroundColor: "#83C0C1" }}>
          <TouchableOpacity style={{ marginHorizontal: 5, marginVertical: 5 }} onPress={handleCloseFlatlist}>
            <CloseIcon name='closesquare' size={45}></CloseIcon>
          </TouchableOpacity>
        </View>

     <View style={{borderWidth:2, borderColor: "#FF1E1E"}}>
     <View style={{ width: "100%", justifyContent: "space-around", paddingHorizontal: 20, flexDirection: "row", alignItems: 'center', backgroundColor: "",}}>

<Text style={{ width: "100%", fontWeight: "bold", fontSize: 20, color: "#FF004D" }}>*Lưu ý: </Text>
<WarningIcon name='warning' size={30} style={{paddingTop: 5}}></WarningIcon>
</View>
<View style={{ width: "100%", alignItems: 'flex-start', paddingHorizontal: 10 }}>

<Text style={{ width: "100%", fontWeight: "500", fontSize: 15 }}>Xác nhận lại thông tin thuốc của bạn:</Text>
</View>
     </View>
        <ImageBackground source={require('../assets/edit_background_7.jpg')} style={{ flex: 1 }} resizeMode='cover'>
          <FlatList
            contentContainerStyle={styles.listUpdateData}
            data={dataToHold}
            renderItem={renderPillsItem}
            keyExtractor={item => item.record_id.toString()}
            extraData={isRender}
          >

          </FlatList>
          <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitDataScan}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Submit</Text>
          </TouchableOpacity>
        </ImageBackground>
        <Modal
          animationType='fade'
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          style={{}}
        >
          <Image source={require('../assets/edit_background_6.jpg')} style={{ position: "absolute", width: "100%", height: "100%", }}></Image>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.modalView}>
              <View style={{
                width: "50%", height: "auto", flexDirection: "row", justifyContent: 'center', backgroundColor: "#FB88B4", borderRadius: 20, alignItems: 'center', ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                  },
                  android: {
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                  },
                }),
              }}>
                <Image source={require('../assets/pill_edit.png')} style={{ width: 30, height: 30, }}></Image>
                <Text style={{ fontSize: 28, textAlign: 'center', fontWeight: "700", marginHorizontal: 5, }}>Pill update!</Text>

              </View>
              <Text style={styles.error}>{errors.pillName}</Text>
              <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center' }}>
                <Text style={styles.text}>Tên thuốc: </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setPillName(text)}
                  defaultValue={pillName}
                  editable={true}
                  multiline={false}
                  maxLength={200}
                >
                </TextInput>
              </View>

              <Text style={styles.error}>{errors.dosagePerDay}</Text>
              <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center' }}>

                <Text style={styles.text}> Số cử thuốc: </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setDosagePerDay(text)}
                  keyboardType='numeric'
                  defaultValue={dosagePerDay.toString()}
                  editable={true}
                  multiline={false}
                  maxLength={200}
                >
                </TextInput>

              </View>

              <Text style={styles.error}>{errors.quantityPerDose}</Text>
              <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center' }}>

                <Text style={styles.text}> Số viên thuốc trong 1 cử thuốc: </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setQuantityPerDose(text)}
                  keyboardType='numeric'
                  defaultValue={quantityPerDose.toString()}
                  editable={true}
                  multiline={false}
                  maxLength={200}
                >
                </TextInput>

              </View>


              <View style={{
                flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center',
              }}>
                <Text style={styles.text}>Ngày quét:</Text>
                <View style={{ width: "50%", flex: 6, backgroundColor: "#FF8080", borderRadius: 10 }}>
                  <Text style={{ borderRadius: 10, fontSize: 15, paddingLeft: 10, height: "auto", textAlign: 'center', fontWeight: "bold" }}>{format(dateStart, 'dd-MM-yyyy')}</Text>
                </View>

              </View>

              <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center', }}>
                <Text style={styles.text} >Ngày hết hạn:</Text>
                <View style={{ width: "50%", flex: 6, backgroundColor: "#CDFADB", borderRadius: 10 }}>
                  <Text style={{ borderRadius: 10, fontSize: 15, paddingLeft: 10, height: "auto", textAlign: 'center', fontWeight: "bold" }}>{format(dateEnd, 'dd-MM-yyyy')}</Text>
                </View>
              </View>
              <TouchableOpacity style={{
                width: 200, backgroundColor: '#15F5BA', alignItems: 'center', padding: 10, borderRadius: 10, marginVertical: 10,

                ...Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                  },
                  android: {
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                  },
                })
              }} onPress={handleDateTextClick}>
                <Text style>Chọn ngày hết hạn khác</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <View style={styles.overlayBackgroundTwo}>

                  <DatePicker
                    mode="calendar"
                    selectedDate={dateEnd}
                    onDateChange={handleChangeDate}
                    style={styles.modalDate}
                    placeholder="Ngày hết hạn"
                    current={dateEnd}
                  />
                </View>
              )}

              <View style={{ flexDirection: "row" }}>
                <CheckBox
                  style={{ flex: 1, padding: 10 }}

                  onClick={() => {
                    setMorning(!morning);
                  }}
                  isChecked={morning == 1 ? true : false}
                  leftText={"Sáng"}
                  placeholder="Sáng"
                />


                <CheckBox
                  style={{ flex: 1, padding: 10 }}

                  onClick={() => {
                    setAfternoon(!afternoon);
                  }}
                  isChecked={afternoon == 1 ? true : false}
                  leftText={"Chiều"}
                  placeholder="Chiều"
                />

                <CheckBox
                  style={{ flex: 1, padding: 10 }}

                  onClick={() => {
                    setEvening(!evening);
                  }}
                  isChecked={evening == 1 ? true : false}
                  leftText={"Tối"}
                  placeholder="Tối"
                />
              </View>

              <Text style={styles.error}>{errors.unitUpdate}</Text>
              <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center' }}>

                <Text style={styles.text}>Đơn vị: </Text>
                <TextInput
                  style={styles.textInput}
                  value={unitUpdate}
                  onChangeText={text => setUnitUpdate(text)}
                  placeholder="Đơn vị"
                />

              </View>
              <TouchableOpacity
                onPress={() => onPressSaveEdit()}
                style={styles.touchableSave}
              >
                <View>
                  <Text style={{ width: "100%", padding: 10, fontSize: 20, fontWeight: "bold" }}>Save</Text>
                </View>
              </TouchableOpacity>

            </View>
          </ScrollView>

        </Modal>

      </View>
    </View>
  )}


<View style={{ flex: 1, flexDirection: "column", justifyContent: "center", gap: 15}}>
<View style={{marginTop: 30}}>
  <View style={styles.arrowBackContainer}>
    <Pressable style={({ pressed }) => pressed && styles.pressedItem}
      onPress={() => {
        navigation.navigate("MainScreen")

      }}>
      <ArrowBackLeft />
    </Pressable>
  </View>
  <View style={styles.containerText}>
    <Text style={styles.title}>
      Scan prescription
    </Text>

   <View style={styles.boxInstruction}>
   <Text style={styles.instruction}>
      Please scan your prescription or medication barcode in order our AI to detect it automatically
    </Text>
   </View>
  </View>
  </View>


  <View style={styles.containerFrame}>
    <Camera style={styles.containerCamera} ref={cameraRef} pictureOrientation="portrait">

      <StatusBar style="auto" />
    </Camera>
  </View>
  <View style={styles.buttonGroup}>
    <View style={styles.buttonContainer} >
      {/* <Button style={styles.button} title='' onPress={takePic}></Button> */}
      <TouchableOpacity
        style={styles.button}
        onPress={takePic}>
        <View style={styles.groupIconCircle}>
          <IconCircle1 style={styles.iconCircle}>
          </IconCircle1>
          <IconCircle2 style={styles.iconCircle2} />
        </View>

      </TouchableOpacity>
    </View>
    <View style={styles.groupButtonSelect}>
      <View style={styles.buttonContainerSelect}>
        <TouchableOpacity
          style={{}}
          onPress={pickImage}  // Add this onPress handler for image selection
        >
          <View style={{}}>
            {/* Display an icon or text for image selection */}
            <IconImagePicker style={{}} width="60" height="60" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</View>



  {selectedImage && (
    <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
  )}
</View>
)}
    </SafeAreaView>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  
  },
  containerText: {
    width: "100%",
    height: "auto",
    gap: 5,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 30,
    color: "#03358C",
    fontWeight: "600"
  },
  boxInstruction:{
    alignItems: "center"
  },
  instruction: {
    fontSize: 18,
    color: "#8C94A6",

  },
  containerFrame: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    marginHorizontal: 42,
    borderRadius: 20,
  },
  containerCamera: {
    width: 289,
    height: 432,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    borderRadius: 20,
    width: 80,
    alignItems: 'center',

  },
  groupButtonSelect: {
    padding: 8, borderRadius: 50, right: 100
  },
  buttonContainerSelect: {

    alignItems: 'center',

  },
  iconImagePicker: {
    justifyContent: 'center',
    alignItems: "center",
    marginLeft: 100,
    marginTop: 10
  },
  button: {
    // backgroundColor: "blue",
    // opacity: 0.5,
    borderRadius: 20,
    alignItems: 'center',
    width: "100%",
    zIndex: 10,
    position: "absolute"

  },
  groupIconCircleImage: {
  },
  buttonSelectImage: {
    // backgroundColor: "blue",
    // opacity: 0.5,
    borderRadius: 20,
    width: "100%",
    backgroundColor: "blue",
    zIndex: 100, position: "absolute"

  },
  buttonGroup: {
    width: "100%",
    alignItems: 'center',
   
  },
  groupIconCircle: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconCircle: {
  },
  iconCircle2: {
    position: "absolute"

  },

  preview: {
    width: "100%",
    height: "85%"
  },
  buttonFeature: {
    flex: 1,
  },
  shareButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#F9E8D9",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,


  },
  pickButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#96EFFF",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,


  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#cfc",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,

  },
  discardButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,

  },
  textFeature: {
    fontSize: 18,
    fontWeight: "500"
  },
  arrowBackContainer: {
    width: 80,
    marginLeft: 20,
    marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
  },

  confirmButton: {
    backgroundColor: "#15F5BA",
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },


  containerPopUp: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
      },
    }),
  },
  overlayBackgroundTwo: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "100%",
    height: "100%",
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',

  },
  containerPopUpTwo: {
    position: "absolute",
    width: "90%",
    height: "80%",
    overflow: 'scroll',
    backgroundColor: "#fff",
    borderRadius: 20,

    ...Platform.select({
      ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
      },
      android: {
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
      },
  }),
  },
  listUpdateData: {
  },
  itemRenderDataToUpdate: {
    width: "100%",
  },
  touchData: {
    padding: 30,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#176B87"
  },
  confirmContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "50%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },


  overlayBackgroundThree: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "100%",
    height: "100%",
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',

  },
  containerPopUpThree: {
    position: "absolute",
    width: "80%",
    height: "80%",
    overflow: 'scroll',
    backgroundColor: "#fff",
  },

  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: "100%",
    height: "100%",
    zIndex: 100,

  },
  confirmImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },



  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 3,
    paddingLeft: 10,
  },
  textInput: {
    flex: 6,
    width: "50%",
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    borderColor: '#CED4DA',
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
    height: 50
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalViewMeta: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  touchableSave: {
    backgroundColor: "#5FBDFF",
    paddingHorizontal: "100",
    alignItems: 'center',
    marginTop: 20,
    width: "50%",
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
      },
    }),
  },
  modalDate: {
    position: "absolute",
    zIndex: 1
  },
  selectedGender: {
    flex: 6,
    width: "50%",
    borderRadius: 10,
    borderColor: 'grey',
    fontSize: 15,
    height: 50
  },
  //error
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: "600"
  },
});