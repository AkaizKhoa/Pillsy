import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity, Pressable, FlatList, TextInput, Modal, Alert, ScrollView, } from 'react-native';
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
            console.log(">>>>>Res:", response);
            console.log('API Response:', response.data);
            setImage(response.data.image);
            setData(response.data)
            console.log("Data:", data);
            // Add any additional logic based on the API response
          })
          .catch((error) => {
            console.error('API Error:', error.response || error);
            // Handle errors if needed
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

  useEffect(() => {
    console.log("Data2 updated:", data2);

    if (data2 !== null) {
      setData2IsSet(true)
      setDataToHold(data2)
    } else {
      return
    }
  }, [data2]);

  const confirmAction = () => {
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



        setImage(null);
      })
      .catch((error) => {
        console.error('Second API Error:', error.response || error);
        setImage(null);

        // Handle errors if needed
      });
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
    // Assume 'response' is the API response
    if (image) {
      setImage(image);
    }


  }, [image]);


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
    } finally {
      setIsLoading(false);
    }
  };




  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
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

    const handleScanImage = () => {
      if (photo) {
        uploadPhoto(photo);
      } else {
        // Hiển thị thông báo rằng chưa chụp ảnh
      }
    };




    return (
      <View style={styles.container}>


        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
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
    handleEditItem(editItem);
    setIsModalVisible(false)
  }


  const renderPillsItem = ({ item }) => (
    <View style={styles.itemRenderDataToUpdate}>
      <TouchableOpacity
        style={styles.touchData}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>{item.name}</Text>

      </TouchableOpacity>
    </View>
  );


  const handleCloseFlatlist = () => {
    setData2IsSet(false)
  }


  const handleSubmitDataScan = () => {
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
        setImage(null);

        // Handle errors if needed
      });
  }



  return (
    <AlertNotificationRoot>
      <View style={styles.container}>

        {image && (
          <View style={styles.overlayBackground}>
            <View style={styles.containerPopUp}>
              <View style={styles.confirmContainer}>
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
              <View style={{ width: "100%", alignItems: 'center', justifyContent: 'flex-end', flexDirection: "row" }}>
                <TouchableOpacity onPress={handleCloseFlatlist}>
                  <CloseIcon name='closesquare' size={45}></CloseIcon>
                </TouchableOpacity>
              </View>

              <FlatList
                contentContainerStyle={styles.listUpdateData}
                data={dataToHold}
                renderItem={renderPillsItem}
                keyExtractor={item => item.record_id.toString()}
                extraData={isRender}
              >


              </FlatList>
              <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitDataScan}>
                <Text>Submit</Text>
              </TouchableOpacity>
              <Modal
                animationType='fade'
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
              >

                <View style={styles.modalView}>
                  <View style={{ width: "100%", height: "auto", }}>
                    <Text style={{ fontSize: 28, textAlign: 'center', fontWeight: "700" }}>Pill update!</Text>
                  </View>
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


                  <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center' }}>
                    <Text style={styles.text}>Ngày quét:</Text>
                    <Text style={{ flex: 6, width: "50%", borderRadius: 10, borderColor: 'grey', borderWidth: 1, fontSize: 15, paddingLeft: 10, height: "auto", textAlign: 'center' }}
                    >{format(dateStart, 'dd-MM-yyyy')}</Text>

                  </View>

                  <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", marginVertical: 10, alignItems: 'center' }}>
                    <Text style={styles.text} >Ngày hết hạn:</Text>
                    <Text style={{ flex: 6, width: "50%", borderRadius: 10, borderColor: 'grey', borderWidth: 1, fontSize: 15, paddingLeft: 10, height: "auto", textAlign: 'center' }}>{format(dateEnd, 'dd-MM-yyyy')}</Text>
                  </View>
                  <TouchableOpacity style={{ width: 200, backgroundColor: 'orange', alignItems: 'center', padding: 10, borderRadius: 10, marginVertical: 10 }} onPress={handleDateTextClick}>
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

                  <View style={{ flexDirection: "row", justifyContent: 'center', width: "100%", alignItems: "center" }}>
                    <Text style={styles.text}>Đơn vị: </Text>
                    <TextInput
                      style={{ flex: 6, width: "50%", borderRadius: 10, borderColor: 'grey', borderWidth: 1, fontSize: 15, paddingLeft: 10, height: 50 }}
                      value={unitUpdate}
                      onChangeText={text => setUnit(text)}
                      placeholder="Đơn vị"
                    />

                  </View>
                  <TouchableOpacity
                    onPress={() => onPressSaveEdit()}
                    style={styles.touchableSave}
                  >
                    <View>
                      <Text style={{ width: "100%", padding: 10 }}>Save</Text>
                    </View>
                  </TouchableOpacity>

                </View>

              </Modal>

            </View>
          </View>
        )}





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

          <Text style={styles.instruction}>
            Please scan your prescription or medication barcode in order our AI to detect it automatically
          </Text>
        </View>


        <View style={styles.containerFrame}>
          <Camera style={styles.containerCamera} ref={cameraRef}>

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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={pickImage}  // Add this onPress handler for image selection
              >
                <View style={styles.groupIconCircle}>
                  {/* Display an icon or text for image selection */}
                  <IconImagePicker style={styles.iconImagePicker} width="60" height="60" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    </AlertNotificationRoot>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    height: "auto",
    flexDirection: "column",
    gap: 12
  },
  containerText: {
    width: "100%",
    height: "auto",
    gap: 5,
    paddingHorizontal: 40
  },
  title: {
    fontSize: 30,
    color: "#03358C",
    fontWeight: "600"
  },
  instruction: {
    fontSize: 18,
    color: "#8C94A6"

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
    // backgroundColor: '#000',
    borderRadius: 20,
    width: 80,
    alignItems: 'center',

  },
  groupButtonSelect: {
    position: "absolute",
    justifyContent: "flex-start",
    width: "100%"
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
    alignSelf: 'stretch',
    flex: 1
  },
  buttonFeature: {
    width: "100%",
  },
  shareButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#F9E8D9"


  },
  pickButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#F9E8D9"


  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#cfc"

  },
  discardButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  textFeature: {
    fontSize: 18,
    fontWeight: "500"
  },
  arrowBackContainer: {
    width: 80,
    marginLeft: 20,
    marginTop: 50
  },

  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },


  containerPopUp: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
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
    width: "80%",
    height: "80%",
    overflow: 'scroll',
    backgroundColor: "#fff",
  },
  listUpdateData: {
  },
  itemRenderDataToUpdate: {
    width: "100%",
  },
  touchData: {
    padding: 30,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  confirmContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "50%",
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
    marginLeft: 10,
    flex: 3,
  },
  textInput: {
    flex: 6,
    width: "50%",
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 15,
    paddingLeft: 10,
    height: 50
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalViewMeta: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  touchableSave: {
    backgroundColor: "orange",
    paddingHorizontal: "100",
    alignItems: 'center',
    marginTop: 20,
    width: "50%",
    borderRadius: 20
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
  }
});