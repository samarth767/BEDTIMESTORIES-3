import * as firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyDM29yReD5vxBpsGpp_CLKO9zouu5bfbWA",
  authDomain: "story-hub-6f058.firebaseapp.com",
  databaseURL: "https://story-hub-6f058.firebaseio.com",
  projectId: "story-hub-6f058",
  storageBucket: "story-hub-6f058.appspot.com",
  messagingSenderId: "956799851595",
  appId: "1:956799851595:web:8372a86441604102dc41ce"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();