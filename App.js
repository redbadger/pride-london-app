import React from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";
import { createClient } from "contentful/dist/contentful.browser.min";
import firebase from "firebase";
import config from "./config";

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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: { items: [] }
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

        const savedEventsRef = firebase
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

  render() {
    const { signedIn, displayName, profilePictureUrl } = this.state;
    return (
      <View style={styles.container}>
        <View>
          {signedIn && (
            <View>
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: profilePictureUrl }}
              />
              <Text>Hello {displayName}</Text>
            </View>
          )}
          <Button
            onPress={() => (signedIn ? signOut() : signIn())}
            title={signedIn ? "Sign Out" : "Sign In"}
          />
        </View>
        <FlatList
          data={this.state.events.items}
          keyExtractor={item => item.sys.id}
          renderItem={({ item: event }) => (
            <View key={event.sys.id}>
              <Text>{event.fields.name}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
  }
});
