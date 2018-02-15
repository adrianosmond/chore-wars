import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDbbw8FphkN-k6gsLjVTJRnPSnZUGWw_L0',
  authDomain: 'chore-wars-ba2a9.firebaseapp.com',
  databaseURL: 'https://chore-wars-ba2a9.firebaseio.com',
  projectId: 'chore-wars-ba2a9',
  storageBucket: 'chore-wars-ba2a9.appspot.com',
  messagingSenderId: '344287360518',
};

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();

export { auth, database };
