let signUpToggle = document.getElementById("signup");
let signInToggle = document.getElementById("signin");
let signincontainer = document.getElementById("signincontainer");
let signupcontainer = document.getElementById("signupcontainer");
let signUpSuccessContainer = document.getElementById("sign-up-msg-container-sign-in-up-page");
let signupBtn = document.getElementById("signupButton");
let signinBtn = document.getElementById("signinButton");
let forgotPasswordBtn = document.getElementById("forgot_password");
let preloader = document.getElementById("preloader_container");
let bg1 = document.getElementById("bg1");
let bg2 = document.getElementById("bg2");
let bg3 = document.getElementById("bg3");
let bg4 = document.getElementById("bg4");
let text = window.location.hash.substring(1);
let userData;
let lastToastTimestamp = Date.now();
const apiURL = "https://zestx.centralindia.cloudapp.azure.com";

setTimeout(() => {
  redirect(0, setUpSignInSignUpPage)
}, 200);

function setUpSignInSignUpPage() {

  signinBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("signinemail").value;
    const password = document.getElementById("signinpassword").value;

    if (!(email && password)) {
      return show_toast(2, "Please fill all the details properly!");
    }

    if (!validateEmail(email)) {
      return show_toast(2, "Please Enter a valid email!");
    }

    preloader.style.display = "block";

    try {
      const signinRes = await fetch(`${apiURL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const signinData = await signinRes.json();

      if (signinRes.status == 400) {
        show_toast(2, "User does not exists, Please sign up!");
        preloader.style.display = "none";
      } else if (signinRes.status == 404) {
        show_toast(2, "Please Enter a valid email!");
        preloader.style.display = "none";
      } else if (signinRes.status == 444) {
        show_toast(2, "PLease Enter valid password!");
        preloader.style.display = "none";
      } else if (signinRes.status == 500) {
        show_toast(0, "Internal server error please re-try!");
        preloader.style.display = "none";
      } else {

        const { token } = signinData;

        localStorage.setItem("jwt", token);
        const userDataRes = await fetch(`${apiURL}/user/getdetails`, {
          method: "GET",
          headers: {
            authorization: token,
          },
        });

        const userDetails = await userDataRes.json();
        userData = userDetails.data;

        if (userData.is_admin)
          window.location.href = "./admin.html";
        else window.location.href = "./homepage.html";

      }
    } catch (error) {
      show_toast(0, "Internal server error please re-try!");
      preloader.style.display = "none";
    }
  });

  signupBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("signupemail").value;
    const user_name = document.getElementById("name").value;
    const password = document.getElementById("signuppassword").value;
    const mobile = document.getElementById("mobile").value;
    const confirmPassword = document.getElementById("confirm").value;


    if (!(email && password && user_name && mobile)) {
      return show_toast(2, "Please fill all the details properly!");
    }

    if (!validateEmail(email)) {
      return show_toast(2, "Please Enter a valid email!");
    }

    if (mobile.length != 10) {
      return show_toast(2, "Mobile no. should be of 10 length!");
    }

    if (password != confirmPassword) {
      return show_toast(2, "Passwords not matched with confirm password!");
    }

    let passwordValidator = passValidator(password);

    if (!passwordValidator[0]) {
      return show_toast(2, `${passwordValidator[1]}`);
    }

    preloader.style.display = "block";

    const signupRes = await fetch(`${apiURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name, email, password, mobile }),
    });

    const signupData = await signupRes.json();

    if (signupRes.status == 400) {
      show_toast(2, "User already exists, Please sign in!");
      preloader.style.display = "none";
    } else if (signupRes.status == 404) {
      show_toast(2, "Please Enter a valid email!");
      preloader.style.display = "none";
    }
    else if (signupRes.status == 444) {
      show_toast(2, `${signupData.error}`);
      preloader.style.display = "none";
    } else if (signupRes.status == 500) {
      show_toast(0, "Internal server error please re-try!");
      preloader.style.display = "none";
    } else {
      const token = signupData.data;
      localStorage.setItem("jwt", token);
      console.log("hehe");
      // window.location.href = "/home";
      signUpSuccessContainer.style.display = "flex"
    }
  });

  forgotPasswordBtn.addEventListener("click", async () => {
    preloader.style.display = "block";

    const email = document.getElementById("signinemail").value;

    if (!validateEmail(email)) {
      return show_toast(2, "Please Enter a valid email!");
    }

    const forgotPassRes = await fetch(`${apiURL}/auth/forgotpasswordsignin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (forgotPassRes.status == 400) {
      preloader.style.display = "none";
      show_toast(2, "Please enter registered email-id!");
    } else if (forgotPassRes.status == 404) {
      show_toast(2, "Please Enter a valid email!");
      preloader.style.display = "none";
    } else if (forgotPassRes.status == 500) {
      preloader.style.display = "none";
      show_toast(0, "Error occured re-try!");
      console.log(err);
    } else {
      preloader.style.display = "none";
      show_toast(1, "Link to reset password has been sent to your email-id!");
    }
  })

  if (text == "signin") {
    signincontainer.classList.toggle("display-class");
    signincontainer.classList.toggle("opacity-class");
    signupcontainer.classList.toggle("opacity-class");
    signupcontainer.classList.toggle("display-class");
    bg1.classList.toggle("opacity-class");
    bg2.classList.toggle("opacity-class");
    bg3.classList.toggle("opacity-class");
    bg4.classList.toggle("opacity-class");
    bg1.classList.toggle("display-class");
    bg2.classList.toggle("display-class");
    bg3.classList.toggle("display-class");
    bg4.classList.toggle("display-class");
  }

  signInToggle.addEventListener("click", () => {
    signupcontainer.classList.toggle("opacity-class");
    signincontainer.classList.toggle("opacity-class");
    signupcontainer.classList.toggle("display-class");
    signincontainer.classList.toggle("display-class");
    bg1.classList.toggle("opacity-class");
    bg2.classList.toggle("opacity-class");
    bg3.classList.toggle("opacity-class");
    bg4.classList.toggle("opacity-class");
    bg1.classList.toggle("display-class");
    bg2.classList.toggle("display-class");
    bg3.classList.toggle("display-class");
    bg4.classList.toggle("display-class");
  });
  signUpToggle.addEventListener("click", () => {
    signupcontainer.classList.toggle("opacity-class");
    signincontainer.classList.toggle("opacity-class");
    signupcontainer.classList.toggle("display-class");
    signincontainer.classList.toggle("display-class");
    bg1.classList.toggle("opacity-class");
    bg2.classList.toggle("opacity-class");
    bg3.classList.toggle("opacity-class");
    bg4.classList.toggle("opacity-class");
    bg1.classList.toggle("display-class");
    bg2.classList.toggle("display-class");
    bg3.classList.toggle("display-class");
    bg4.classList.toggle("display-class");
  });



  preloader.style.display = "none";

  AOS.init({
    easing: 'ease-in-out',
    once: true,
    duration: 600,
  });
}

var redirect = function (redirectWithoutTokenChk, setUpFun) {

  const token = localStorage.getItem("jwt");
  if (token && token != null) {

    fetch(`https://zestx.centralindia.cloudapp.azure.com/user/getdetails`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let isAdmin = data.data.is_admin;
        switch (redirectWithoutTokenChk) {
          case 0:
            redirectToHomeOrAdminPageAccToToken(isAdmin);
            break;
          case 1:
            redirectToHomePageAccToToken(isAdmin, setUpFun);
            break;
          case 2:
            redirectToAdminPageAccToToken(isAdmin, setUpFun);
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });


  } else {
    if (redirectWithoutTokenChk > 0) {
      window.location.href = "./signupsignin.html#signin";
    }
    else {
      setUpFun()

    }
  }
}

function redirectToHomeOrAdminPageAccToToken(isAdmin) {
  if (isAdmin)
    window.location.href = "./admin.html";
  else window.location.href = "./homepage.html";
}

function redirectToHomePageAccToToken(isAdmin, setUpFun) {
  if (!isAdmin)
    window.location.href = "./homepage.html";
  else
    setUpFun()
}

function redirectToAdminPageAccToToken(isAdmin, setUpFun) {
  if (isAdmin)
    window.location.href = "./admin.html";
  else
    setUpFun()
}

function show_toast(isSuccess, message) {

  if (Date.now() - lastToastTimestamp > 5000) {
    let toastAlertMessage = document.getElementById("toastAlertMessage");
    let toastImage = document.getElementById("toastImage");
    let toastFrontMessage = document.getElementById("toastFrontMessage");
    let toastDescriptionMessage = document.getElementById("toastDescriptionMessage");
    let msgLength = message.length + 7;

    document.getElementById("toastAlertMessage").style.setProperty("--foo", `${msgLength}ch`);

    if (isSuccess == 1) {
      toastImage.src = "../assets/_general/success_tick.svg"
      toastFrontMessage.style.backgroundColor = "green"
    }
    else if (isSuccess == 0) {
      toastImage.src = "../assets/_general/error_cross.svg"
      toastFrontMessage.style.backgroundColor = "red"
    }
    else {
      toastImage.src = "../assets/_general/neutral_exclamation.svg"
      toastFrontMessage.style.backgroundColor = "black"
    }
    toastDescriptionMessage.innerText = " ";
    setTimeout(function () {
      toastDescriptionMessage.innerText = message;
    }, 600);
    setTimeout(function () {
      toastDescriptionMessage.innerText = " ";
    }, 4200);
    toastAlertMessage.className = "toastPopUp";
    setTimeout(function () {
      toastAlertMessage.className = toastAlertMessage.className.replace("toastPopUp", "");
    }, 5000);
    lastToastTimestamp = Date.now();
  } else {
    setTimeout(function () {
      show_toast(isSuccess, message);
    }, 5500 - (Date.now() - lastToastTimestamp))
  }
}

// mail-verifier
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// password validator
let regularExpression = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

function passValidator(password) {
  let boolValue = false;
  let message;

  if (password.length < 6) {
    message = 'Password should be minimum of 6 length!';
    return [boolValue, message];
  }

  if (password.length > 20) {
    message = 'Password should be maximum of 20 length!';
    return [boolValue, message];
  }

  if (password.search(/[A-Z]/) < 0) {
    message = 'Password should contain atleast 1 uppercase letter!';
    return [boolValue, message];
  }

  if (password.search(/[a-z]/) < 0) {
    message = 'Password should contain atleast 1 lowercase letter!';
    return [boolValue, message];
  }

  if (password.search(/[0-9]/) < 0) {
    message = 'Password should contain atleast 1 digit!';
    return [boolValue, message];
  }

  if (password.search(' ') != -1) {
    message = 'Password should not contain any spaces!';
    return [boolValue, message];
  }

  if (!regularExpression.test(password)) {
    message = 'Password should contain atleast 1 special character!';
    return [boolValue, message];
  }

  return [true, "Success"];

}
