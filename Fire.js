import firebase from "firebase";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCr_3KPv4yvUwMTRe_q6-M7CDioBB4Whis",
        authDomain: "chat-clone-f0e75.firebaseapp.com",
        databaseURL: "https://chat-clone-f0e75.firebaseio.com",
        projectId: "chat-clone-f0e75",
        storageBucket: "chat-clone-f0e75.appspot.com",
        messagingSenderId: "41898547143",
        appId: "1:41898547143:web:ed3568256e4969d40fabe2",
        measurementId: "G-YTJF30MFZ1",
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously(isEnabled);
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };
    });

    this.db.push(message);
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
