const Rebase = require('re-base');
const Base = Rebase.createClass({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "plantodo-e062f.firebaseapp.com",
  databaseURL: "https://plantodo-e062f.firebaseio.com",
  storageBucket: "plantodo-e062f.appspot.com",
  messagingSenderId: "1055864067864"
})

export default Base;
