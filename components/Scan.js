import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity, Pressable } from 'react-native';
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


export default function Scan() {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { userToken } = useContext(AuthContext);

  const [imageBase64, setImageBase64] = useState(null);
  const [data, setData] = useState(null);

  const navigation = useNavigation();
  const uploadImageEndpoint = `${BASE_URL}/api/v1/prescription-management/prescriptions/upload-ocr-image`;
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      console.log('====================================');
      console.log("Result: ", result.assets[0].uri);
      console.log('====================================');
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

        console.log('====================================');
        console.log(uploadImageURL);
        console.log('====================================');
        console.log('====================================');
        console.log(formData);
        console.log('====================================');
        // Send the POST request to the API

        axios.post(uploadImageURL, formData, { headers })
          .then((response) => {
            // Handle the response from the API
            console.log('API Response:', response.data);
            setImageBase64(response.data.imageBase64);
            setData(response.data)
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
  const confirmAction = () => {
    const secondApiEndpoint = `${BASE_URL}/api/v1/prescription-management/prescriptions/upload-predict-info`;
    
    const requestData = {
      status: data.status,
      user_Id: data.user_Id,
      prescription_Id: data.prescription_Id,
      data: data.data,
      imageBase64: imageBase64,  // Use the imageBase64 from state
      error: data.error
    };
  
    const headers = {
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json', // Set content type to 'multipart/form-data'
    };
  
    axios.post(secondApiEndpoint, requestData, { headers })
      .then((secondApiResponse) => {
        // Handle the response from the second API
        console.log('Second API Response:', secondApiResponse.data);
        setImageBase64(null);
      })
      .catch((error) => {
        console.error('Second API Error:', error.response || error);
        setImageBase64(null);

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
    if (imageBase64) {
      setImageBase64(imageBase64);
    }

    console.log('====================================');
    console.log(imageBase64);
    console.log('====================================');
  }, [imageBase64]);


  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

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

  return (
    <View style={styles.container}>
      
      {imageBase64 &&  (
      <View style={styles.overlayBackground}>
        <View style={styles.containerPopUp}>
        <View style={styles.confirmContainer}>
        <Image source={{ uri: `data:image/jpg;base64,` + imageBase64 }} style={styles.confirmImage} />
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


  containerPopUp:{
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    overflow:'scroll'
  },

  confirmContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "50%",
  },

  overlayBackground:{
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
});