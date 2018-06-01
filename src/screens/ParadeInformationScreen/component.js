// @flow

import React, { PureComponent } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import Text from "../../components/Text";
import Header from "../../components/Header";
import ImageHeader from "../../components/ImageHeader";
import ContentPadding from "../../components/ContentPadding";
import LayoutColumn from "../../components/LayoutColumn";
import text from "../../constants/text";
import ParadeNavigator from "../ParadeNavigator";

import trafalgarImg from "../../../assets/images/trafalgarSquare.jpg";
import cabaretImg from "../../../assets/images/cabaret.jpg";
import divaImg from "../../../assets/images/womensStage2018.jpg";
import familyImg from "../../../assets/images/familyArea.jpg";
import communityImg from "../../../assets/images/community.jpg";

import { whiteColor } from "../../constants/colors";

const mapImage = {
  trafalgar: trafalgarImg,
  cabaret: cabaretImg,
  diva: divaImg,
  family: familyImg,
  community: communityImg
};

export type Props = {};

class ParadeInformationScreen extends PureComponent<Props> {
  // const tx = text.paradeInformationScreen;
  render() {
    return (
      <MapView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: Dimensions.get("window").height - 70
        }}
        initialRegion={{
          latitude: 51.525493,
          longitude: -0.0822173,
          latitudeDelta: 0.0052,
          longitudeDelta: 0.0041
        }}
      >
        <Polyline
          coordinates={[
            { latitude: 51.5260317, longitude: -0.084559 },
            { latitude: 51.5254107, longitude: -0.083363 },
            { latitude: 51.5256209, longitude: -0.0818449 }
          ]}
          strokeWidth={8}
          strokeColor={"purple"}
          lineJoin={"bevel"}
        />
      </MapView>
      // <View style={styles.container}>
      //   <Header title={tx.headerTitle} testID="page-heading-parade" />
      //   <ScrollView>
      //     <View style={styles.scrollPage}>
      //       <LayoutColumn spacing={24}>
      //         <ContentPadding>
      //           <Text type="uber" color="lightNavyBlueColor">
      //             {tx.pageHeading}
      //           </Text>
      //           <Text type="h2" color="lightNavyBlueColor">
      //             {tx.pageSubheading}
      //           </Text>
      //           <Text style={styles.pageDescription}>{tx.pageDescription}</Text>
      //         </ContentPadding>
      //         {tx.stages.map(stage => (
      //           <View key={stage.stageHeading}>
      //             <ImageHeader
      //               image={mapImage[stage.stageImage]}
      //               title={stage.stageHeading}
      //               subtitle={stage.stageSubheading}
      //             />
      //             <ContentPadding>
      //               <Text style={styles.stageDescription}>
      //                 {stage.stageDescription}
      //               </Text>
      //             </ContentPadding>
      //           </View>
      //         ))}
      //       </LayoutColumn>
      //     </View>
      //   </ScrollView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor
  },
  scrollPage: {
    paddingTop: 24,
    marginBottom: 12,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center"
  },
  pageDescription: {
    paddingTop: 12
  },
  stageDescription: {
    paddingTop: 12
  }
});

export default ParadeInformationScreen;
