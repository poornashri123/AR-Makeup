import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import filter1 from "../components/filter1";
import filter2 from "../components/filter2";
import filter3 from "../components/filter3";

import filter from "../components.filter"

 

    this.onFacesDetected = this.onFacesDetected.bind(this);
  

  async componentDidMount(){
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  }

  onFacesDetected({ faces }){
    this.setState({ faces: faces });
  }

  render()
    var { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }
  
   
  

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.upperContainer}>
          <Image
            source={require("../assets/appIcon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Look Me....</Text>
        </View>
        <View style={styles.middleContainer}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map(face => (
            <Filter
              key={`face-id-${face.faceID}`}
              face={face}
              source={filters[this.state.current_filter].src}
              width={filters[this.state.current_filter].width}
              height={filters[this.state.current_filter].height}
              left={filters[this.state.current_filter].left}
              right={filters[this.state.current_filter].right}
              top={filters[this.state.current_filter].top}
            />
          ))}
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.lowerTopContainer}>
            <ScrollView
              contentContainerStyle={styles.categories}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Object.keys(data).map(category => (
                <TouchableOpacity
                  key={`category-button-${category}`}
                  style={[
                    styles.category,
                    {
                      backgroundColor:
                        this.state.selected === category ? "#FFA384" : "#E7F2F8"
                    }
                  ]}
                  onPress={() =>
                    this.setState({
                      selected: category,
                      current_filter: data[category][0].id
                    })
                  }
                >
                  <Text>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.lowerBottomContainer}>
            <ScrollView
              contentContainerStyle={styles.filters}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {data[this.state.selected].map(filter_data => {
                return (
                  <TouchableOpacity
                    key={`filter-button-${filter_data.id}`}
                    style={[
                      styles.filterButton,
                      {
                        borderColor:
                          this.state.current_filter === filter_data.id
                            ? "#FFA384"
                            : "#FFFF"
                      }
                    ]}
                    onPress={() =>
                      this.setState({
                        current_filter: `${filter_data.id}`
                      })
                    }
                  >
                    <Image
                      source={filter_data.src}
                      style={styles.filterImage}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F2F8"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  upperContainer: {
    flex: 0.13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E7F2F8",
    flexDirection: "row"
  },
  appIcon: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    borderWidth: 2,
    borderColor: "#FFA384",
    marginRight: RFValue(10)
  },
  appName: {
    color: "#FFA384",
    fontSize: RFValue(25),
    fontWeight: "800",
    fontStyle: "italic"
  },
  middleContainer: { flex: 0.67 },
  lowerContainer: {
    flex: 0.2,
    backgroundColor: "#E7F2F8"
  },
  lowerTopContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  categories: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  category: {
    width: RFValue(80),
    height: "70%",
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: RFValue(5),
    borderWidth: 2
  },
  lowerBottomContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFE7BC"
  },
  filters: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  filterButton: {
    height: RFValue(70),
    width: RFValue(70),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(35),
    backgroundColor: "#E7F2F8",
    borderWidth: 5,
    marginRight: RFValue(20),
    marginBottom: RFValue(10)
  },
  filterImage: {
    height: "60%",
    width: "60%",
    alignSelf: "center",
    resizeMode: "contain"
  }
});
