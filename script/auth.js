
async function signUp(e) {
  e.preventDefault();
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  showLoader();
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
    console.log(result);
    hideLoader();
  } catch (err) {
    console.log(err);
    hideLoader();
    // .toast({html: err.msg})
  }
  email.value = "";
  password.value ="";
}

async function logIn(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");
    showLoader();
    try {
        const result = await firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
        console.log(result);
        hideLoader();
        document.querySelector("#lower-section").classList.add("lower-section");
    } catch (err) {
        // document.querySelector("#lower-section").classList.remove("lower-section");
        console.log(err);
        hideLoader();
    }
    email.value = "";
    password.value ="";
}

function logout(){
    firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("logout SuccessFully");
    }
});




