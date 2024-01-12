import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import IconCircle1 from '../assets/icon/Ellipse7.svg'
import IconCircle2 from '../assets/icon/Ellipse8.svg'
import IconShare from 'react-native-vector-icons/MaterialCommunityIcons'
import IconSave from 'react-native-vector-icons/MaterialCommunityIcons'
import IconDiscard from 'react-native-vector-icons/AntDesign'



export default function Scan() {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

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

            <IconSave style={{ fontSize: 25,  }} name='arrow-down-bold-box-outline'></IconSave>
          </TouchableOpacity> : undefined}
        </View>
        <View style={styles.buttonFeature}>
          <TouchableOpacity
            onPress={() => setPhoto(undefined)} style={styles.discardButton}>
            <Text style={styles.textFeature}>Discard</Text>

            <IconDiscard style={{ fontSize: 22,  }} name='closesquare'></IconDiscard>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    height: "auto",
    flexDirection: "column",
    justifyContent: "space-evenly"

  },
  containerText: {
    width: "100%",
    height: "auto",
    gap: 5,
    paddingHorizontal: 30
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
  },
  containerCamera: {
    width: 300,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    // backgroundColor: '#000',
    borderRadius: 20,
    width: 80,

  },
  button: {
    // backgroundColor: "blue",
    // opacity: 0.5,
    borderRadius: 20,

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
  buttonFeature:{
    width: "100%",
  },
  shareButton: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor:"#F9E8D9"

    
  },
  saveButton: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#cfc"

  },
  discardButton: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    paddingVertical: 15,
  },
  textFeature:{
    fontSize: 18,
    fontWeight: "500"
  }
});