import React from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import { List, ListItem } from "react-native-elements";

import { createClient } from "contentful/dist/contentful.browser.min";
import firebase from "firebase";
import config from "./config";

import { Ionicons } from "@expo/vector-icons";

const {
  CONTENTFUL_SPACE,
  CONTENTFUL_ACCESS_TOKEN,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_API_KEY,
  FIREBASE_DATABASE_URL
} = config;

const client = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_ACCESS_TOKEN
});
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL
};

// Initialise once due to hot module reloading
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const signIn = async () => {
  const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
    "326891754486282",
    {
      permissions: ["public_profile"]
    }
  );
  if (type === "success") {
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    try {
      firebase.auth().signInWithCredential(credential);
    } catch (e) {
      console.log(e);
    }
  }
};

const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    console.log(e);
  }
};

const saveEvent = async (userId, eventId) => {
  firebase
    .database()
    .ref(`savedEvents/${userId}`)
    .push(eventId);
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: { items: [] },
      savedEvents: {}
    };
  }

  async componentDidMount() {
    const events = await client.getEntries();

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      events
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          displayName: user.displayName,
          profilePictureUrl: user.photoURL,
          signedIn: true,
          userId: user.uid
        });

        firebase
          .database()
          .ref(`savedEvents/${user.uid}`)
          .on("value", snapshot => {
            this.setState({ savedEvents: snapshot.val() || {} });
          });
      } else {
        this.setState({
          displayName: "",
          profilePictureUrl: "",
          userId: "",
          signedIn: false,
          savedEvents: {}
        });
      }
    });
  }

  async unsaveEvent(userId, eventId) {
    const recordId = Object.keys(this.state.savedEvents).find(
      key => this.state.savedEvents[key] === eventId
    );
    firebase
      .database()
      .ref(`savedEvents/${userId}/${recordId}`)
      .remove();
  }

  isFavourited(eventId) {
    return Object.values(this.state.savedEvents).includes(eventId);
  }

  render() {
    const { signedIn, displayName, profilePictureUrl, userId } = this.state;
    return (
      <View style={styles.container}>
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
        <View style={styles.header}>
          {signedIn && (
            <View style={styles.profile}>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: profilePictureUrl }}
              />
              <Text style={styles.displayName}>{displayName}</Text>
            </View>
          )}
          <Button
            style={{ height: 40 }}
            onPress={() => (signedIn ? signOut() : signIn())}
            title={signedIn ? "Sign Out" : "Sign In"}
          />
        </View>
        <List>
          <FlatList
            data={this.state.events.items}
            keyExtractor={item => item.sys.id}
            extraData={this.state.savedEvents}
            renderItem={({ item: event }) => (
              <ListItem
                switchButton
                hideChevron
                onSwitch={() =>
                  this.isFavourited(event.sys.id)
                    ? this.unsaveEvent(userId, event.sys.id)
                    : saveEvent(userId, event.sys.id)
                }
                title={event.fields.name}
                key={event.sys.id}
                style={styles.eventItem}
                switched={this.isFavourited(event.sys.id)}
              />
            )}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 60,
    alignItems: "center"
  },
  profile: {
    flexDirection: "row",
    alignItems: "center"
  },
  displayName: {
    paddingLeft: 10
  },
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
