import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const config = {
    apiKey: "AIzaSyCm1foQ2Zq3EZzD1Wr6duIOjGiYL93RFE4",
    authDomain: "slack-12f0a.firebaseapp.com",
    projectId: "slack-12f0a",
    storageBucket: "slack-12f0a.appspot.com",
    messagingSenderId: "544137027644",
    appId: "1:544137027644:web:7880ae6382268978c5e339"
  }

  const firebaseApp = firebase.initializeApp(config)
  const db = firebase.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {firebaseApp,db,provider,auth}