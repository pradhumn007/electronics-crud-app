const signupBtn = document.querySelector("#signup-modal");
const loginBtn = document.querySelector("#login-modal");
const modal1 = document.querySelector(".modal-1");
const modal2 = document.querySelector(".modal-2");
const modal1Close = document.querySelector(".signupModal");
const modal2Close = document.querySelector(".loginModal");
const login = document.getElementById("logInClose");
const signup = document.getElementById("signUpClose");

signupBtn.addEventListener("click", () => {
  modal1.classList.add("bgActive");
});

modal1Close.addEventListener("click", () => {
  modal1.classList.remove("bgActive");
});

signup.addEventListener("click", () => {
  modal1.classList.remove("bgActive");
});

loginBtn.addEventListener("click", () => {
  modal2.classList.add("bgActive");
});

modal2Close.addEventListener("click", () => {
    console.log("error");
  modal2.classList.remove("bgActive");
});

login.addEventListener("click", () => {
    console.log("error");
  modal2.classList.remove("bgActive");
});
