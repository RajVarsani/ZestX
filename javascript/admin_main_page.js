const apiURL = "https://whispering-ridge-40670.herokuapp.com";
let token = localStorage.getItem("jwt");

let ongoingEventContainer = document.getElementById(
    "container_common_background"
);
let eventListArray = document.getElementsByClassName(
    "primary_event_list_admin_page"
);

let adminMainPage = document.getElementById("admin_main_page_container");
let preloader = document.getElementById("admin_preloader_container");
let adminAddUserPage = document.getElementById("admin_add_user_page_container");
let internalUserContainer = document.getElementById("internal_user_list");
let internalUsersListLoader = document.getElementById("internal_users_list_loader")
let externalUserContainer = document.getElementById("external_user_list");
let externalUsersListLoader = document.getElementById("external_users_list_loader")
let addUserBtnFromMainPage = document.getElementById("secondh2");
let event_description_datails_sub_container = document.getElementById("event_description_datails_sub_container");
let logoutBtn;

let backBtnFromAddUserPage;
let addUserBtnFromAddUserPage;
let exUsername;
let deleteBtn;
let exEmail;
let exMobile;
let event_id;
let externalUsersEventClickRequestStack = 1;
let internalUsersEventClickRequestStack = 1;
let current_displaying_event_index = 0;
let ongoingEvents;
let lastToastTimestamp = Date.now();
let isFirstTime = true;


async function setup() {

    try {
        const res1 = await fetch(`${apiURL}/fest/ongoingevents`, {
            method: "GET",
        });
        if (res1.status == 500) {
            show_toast(0, "Internal server error please re-try!");
        } else {
            const data1 = await res1.json();
            ongoingEvents = data1.data;
            event_id = ongoingEvents[0].fest_id;
            setOngoingEvents(ongoingEvents);
            setEventDetails(ongoingEvents[0]);
            getInternalUserDetails(ongoingEvents[0].user_id);
            getExternalUserDetails(ongoingEvents[0].external_user_id);
            checkAndDisplayContainer(eventListArray[current_displaying_event_index].getElementsByClassName("festival_list_overlay")[0])

            // let temp_index_for_event_click_listeners = 0;
            let temp_size_index_for_event_click_listeners = eventListArray.length;
            for (let i = 0; i < temp_size_index_for_event_click_listeners; i++) {

                let eventInstance = eventListArray[i]
                eventInstance.addEventListener("click", () => {
                    checkAndDisplayContainer(internalUsersListLoader)
                    checkAndDisplayContainer(externalUsersListLoader)
                    externalUsersEventClickRequestStack++;
                    internalUsersEventClickRequestStack++;
                    if (current_displaying_event_index != i) {

                        checkAndCloseContainer(eventListArray[current_displaying_event_index].getElementsByClassName("festival_list_overlay")[0])
                        checkAndDisplayContainer(eventInstance.getElementsByClassName("festival_list_overlay")[0])
                        current_displaying_event_index = i
                    }
                    event_id = eventInstance.id;


                    eventInstance.classList.add("active_event");
                    checkAndCloseContainer(internalUserContainer);
                    checkAndCloseContainer(externalUserContainer);
                    const event = ongoingEvents.find(
                        (item) => item.fest_id == eventInstance.id
                    );
                    setEventDetails(event);
                    getInternalUserDetails(event.user_id);
                    getExternalUserDetails(event.external_user_id);

                });

            }
        }

        backBtnFromAddUserPage = document.getElementById("back_btn_from_add_user_page");
        addUserBtnFromAddUserPage = document.getElementById("Add_user_button");

        addUserBtnFromAddUserPage.addEventListener("click", async () => {
            exUsername = document.getElementById("name").value;
            exEmail = document.getElementById("email").value;
            exMobile = document.getElementById("phone_number").value;

            if (exUsername && (exEmail || exMobile)) {
                displayPreloder();
                const res2 = await fetch(`${apiURL}/fest/adduser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                    body: JSON.stringify({ event_id, username: exUsername, email: exEmail, mobile: exMobile }),
                });
                if (res2.status == 400) {
                    show_toast(2, "You have not access to admin panel!");
                    displayAdminAddUserPage();
                } else if (res2.status == 500) {
                    show_toast(0, "Internal server error please re-try!");
                    displayAdminAddUserPage();
                } else {
                    const res3 = await fetch(`${apiURL}/fest/ongoingevents`, {
                        method: "GET",
                    })
                    if (res3.status == 500) {
                        show_toast(0, "Internal server error please re-try!");
                    } else {
                        const data2 = await res3.json();
                        ongoingEvents = data2.data;

                        const event = ongoingEvents.find(
                            (item) => item.fest_id == event_id
                        );
                        getInternalUserDetails(event.user_id);
                        getExternalUserDetails(event.external_user_id);
                        show_toast(1, "User added successfully!");
                        displayAdminMainpage();
                    }
                }
            } else if (exUsername.length == 0) {
                show_toast(2, "Please fill name!");
            } else {
                show_toast(2, "Please fill atleast one of email and phone number!");
            }
            document.getElementById("name").value = null
            document.getElementById("email").value = null
            document.getElementById("phone_number").value = null
        })

        backBtnFromAddUserPage.addEventListener("click", () => {
            displayAdminMainpage();
        })

    } catch (err) {
        show_toast(0, "Internal server error please re-try!");
        console.log(err);
    }
}

setup();

addUserBtnFromMainPage.addEventListener("click", () => {
    displayAdminAddUserPage();
});


setTimeout(function () {

    logoutBtn = document.getElementById("logout_button");

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("jwt");
        location.href = "/";
    });

}, 100);


function setOngoingEvents(array) {
    ongoingEventContainer.innerHTML = "";

    let current_ongoing_festivals_list_length = array.length;
    array.forEach(function (item, i) {
        const { fest_id, fest_name, start_date, end_date } = item;

        var sDate = new Date(parseInt(start_date));
        var eDate = new Date(parseInt(end_date));
        let startDate =
            sDate.getDate() +
            "-" +
            (sDate.getMonth() + 1) +
            "-" +
            sDate.getFullYear();
        let endDate =
            eDate.getDate() +
            "-" +
            (eDate.getMonth() + 1) +
            "-" +
            eDate.getFullYear();

        const event = document.createElement("div");
        event.classList.add("inner_list");
        event.classList.add("primary_event_list_admin_page");
        event.id = `${fest_id}`;

        const insideHtml = `<h3 class="innerList_h3">${fest_name}</h3>
    <h4 class="innerList_h4">${startDate} - ${endDate}</h4>
    <div class="festival_list_overlay"></div>
    `;

        event.innerHTML = insideHtml;

        ongoingEventContainer.appendChild(event);

        if (i == current_ongoing_festivals_list_length - 1) {
            eventListArray[i].style.borderBottom = "none";

        }


    });
}

function setEventDetails(data) {
    let rules = document.getElementById("RulesContentinnerList");
    let description = document.getElementById("DescriptionContentinnerList");
    let prizes = document.getElementById("PrizesContentinnerList");
    let venue = document.getElementById("VenueContentinnerList");

    rules.innerHTML = `${data.rules}`;
    description.innerHTML = `${data.description}`;
    prizes.innerHTML = `${data.prize}`;
    venue.innerHTML = `${data.venue}`;
}

async function getInternalUserDetails(array1) {
    try {
        if (array1 != null && array1.length != 0) {
            const res1 = await fetch(`${apiURL}/user/userdetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
                body: JSON.stringify({ ids: array1.toString() }),
            });
            if (res1.status == 400) {
                show_toast(2, "You have not access to admin panel!");
            } else if (res1.status == 500) {
                show_toast(0, "Internal server error please re-try!");
            } else {

                const data1 = await res1.json();
                setInternalUserDetails(data1.data, array1);


                internalUsersEventClickRequestStack--
                // console.log("min ", internalUsersEventClickRequestStack);

                if (internalUsersEventClickRequestStack == 0) {
                    checkAndCloseContainer(internalUsersListLoader)
                    checkAndDisplayContainer(internalUserContainer);
                }
            }
        } else {
            internalUserContainer.innerHTML = "";

            internalUsersEventClickRequestStack--
            // console.log("min ", internalUsersEventClickRequestStack);

            if (internalUsersEventClickRequestStack == 0) {
                checkAndCloseContainer(internalUsersListLoader)
                checkAndDisplayContainer(internalUserContainer);
            }
        }
    } catch (err) {

        internalUsersEventClickRequestStack--
        // console.log("min ", internalUsersEventClickRequestStack);

        show_toast(0, "Internal server error please re-try!");
        console.log(err);
    }
}
async function getExternalUserDetails(array2) {
    try {
        if (array2 != null && array2.length != 0) {
            const res2 = await fetch(`${apiURL}/user/exuserdetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token,
                },
                body: JSON.stringify({ ids: array2.toString() }),
            });
            if (res2.status == 400) {
                show_toast(2, "You have not access to admin panel!");
            } else if (res2.status == 500) {
                show_toast(0, "Internal server error please re-try!");
            } else {

                const data2 = await res2.json();
                setExternalUserDetails(data2.data, array2);

                externalUsersEventClickRequestStack--
                // console.log("ext", externalUsersEventClickRequestStack);

                if (isFirstTime) {
                    setTimeout(function () {
                        displayAdminMainpage();
                    }, 100);
                    isFirstTime = false;
                } else {

                    if (externalUsersEventClickRequestStack == 0) {
                        checkAndCloseContainer(externalUsersListLoader)
                        checkAndDisplayContainer(externalUserContainer);
                    }
                }
            }

        } else {
            externalUserContainer.innerHTML = "";


            externalUsersEventClickRequestStack--
            // console.log("ext", externalUsersEventClickRequestStack);


            if (isFirstTime) {
                setTimeout(function () {
                    displayAdminMainpage();
                }, 100);
                isFirstTime = false;
            } else {
                if (externalUsersEventClickRequestStack == 0) {
                    checkAndCloseContainer(externalUsersListLoader)
                    checkAndDisplayContainer(externalUserContainer);
                }
            }
        }
    } catch (err) {

        externalUsersEventClickRequestStack--
        // console.log("ext", externalUsersEventClickRequestStack);


        show_toast(0, "Internal server error please re-try!");
        console.log(err);
    }
}

function setInternalUserDetails(data, array1) {
    internalUserContainer.innerHTML = "";

    for (let item of data) {
        const { user_name, email, mobile } = item;

        const user = document.createElement("div");
        user.classList.add("inner_list_content");
        user.classList.add("registered_internal_user");

        const insideHtml = `<div class="inner_list">
    <div class="inner_list_content internal_user_list_element">
        <h3 class="innerList_h3" id="user_name">${user_name}</h3>
        <h4 class="innerList_h4" id="user_details">${email} || ${mobile}</h4>
    </div>
    <img class="internal_user_delete_button" src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
</div>
    `;

        user.innerHTML = insideHtml;

        internalUserContainer.appendChild(user);
    };

    document.getElementsByClassName("registered_internal_user")[data.length - 1].getElementsByClassName("inner_list")[0].style.borderBottom = "none"

    let internalUserDeleteBtnList = document.getElementsByClassName("internal_user_delete_button");
    let internalUserDeleteBtnListLength = internalUserDeleteBtnList.length;

    for (let i = 0; i < internalUserDeleteBtnListLength; i++) {
        internalUserDeleteBtnList[i].addEventListener("click", async () => {
            displayPreloder();
            try {
                const res = await fetch(`${apiURL}/fest/removeuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                    body: JSON.stringify({ eventId: event_id, userId: array1[i] }),
                });
                if (res.status == 400) {
                    show_toast(2, "You have not access to admin panel!");
                    displayAdminMainpage();
                } else if (res.status == 500) {
                    show_toast(0, "Internal server error please re-try!");
                    displayAdminMainpage();
                } else {
                    if (i > -1) {
                        array1.splice(i, 1);
                    }
                    getInternalUserDetails(array1);
                    show_toast(1, "User removed successfully!");
                    displayAdminMainpage();
                }
            } catch (err) {
                show_toast(0, "Internal server error please re-try!");
                console.log(err);
            }
        });
    }

}

function setExternalUserDetails(data, array2) {
    externalUserContainer.innerHTML = "";

    for (let item of data) {
        const { username, email, mobile } = item;

        const user = document.createElement("div");
        user.classList.add("inner_list_content");
        user.classList.add("registered_external_user");
        let insideHtml;

        if (email && mobile) {
            insideHtml = `<div class="inner_list">
        <div class="inner_list_content external_user_list_element">
            <h3 class="innerList_h3" id="user_name">${username}</h3>
            <h4 class="innerList_h4" id="user_details">${email} || ${mobile}</h4>
        </div>
        <img class="external_user_delete_button" src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
    </div>
        `;
        } else {
            insideHtml = `<div class="inner_list">
        <div class="inner_list_content">
            <h3 class="innerList_h3" id="user_name">${username}</h3>
            <h4 class="innerList_h4" id="user_details">${email} ${mobile}</h4>
        </div>
        <img class="external_user_delete_button" src="../assets/home_page/Admin_page/delete_user_btn.svg" alt="">
    </div>
        `;
        }

        user.innerHTML = insideHtml;

        externalUserContainer.appendChild(user);
    }
    document.getElementsByClassName("registered_external_user")[data.length - 1].getElementsByClassName("inner_list")[0].style.borderBottom = "none"

    let externalUserDeleteBtnList = document.getElementsByClassName("external_user_delete_button");
    let externalUserDeleteBtnListLength = externalUserDeleteBtnList.length;

    for (let i = 0; i < externalUserDeleteBtnListLength; i++) {
        externalUserDeleteBtnList[i].addEventListener("click", async () => {
            displayPreloder();
            try {
                const res = await fetch(`${apiURL}/fest/removeexuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token,
                    },
                    body: JSON.stringify({ eventId: event_id, userId: array2[i] }),
                });
                if (res.status == 400) {
                    show_toast(2, "You have not access to admin panel!");
                    displayAdminMainpage();
                } else if (res.status == 500) {
                    show_toast(0, "Internal server error please re-try!");
                    displayAdminMainpage();
                } else {
                    if (i > -1) {
                        array2.splice(i, 1);
                    }
                    getExternalUserDetails(array2)
                    show_toast(1, "User removed successfully!");
                    displayAdminMainpage();
                }
            } catch (err) {
                show_toast(0, "Internal server error please re-try!");
                console.log(err);
            }
        });
    }
}

function displayAdminMainpage() {
    checkAndCloseContainer(preloader);
    checkAndDisplayContainer(adminMainPage);
    checkAndCloseContainer(adminAddUserPage);
}

function displayPreloder() {
    checkAndDisplayContainer(preloader);
    checkAndCloseContainer(adminMainPage);
    checkAndCloseContainer(adminAddUserPage);
}

function displayAdminAddUserPage() {
    checkAndDisplayContainer(adminAddUserPage);
    checkAndCloseContainer(adminMainPage);
    checkAndCloseContainer(preloader);
}

function checkAndCloseContainer(container) {
    if (container.classList.contains("display_to_block")) {
        container.classList.remove("display_to_block");
    }
    container.classList.add("display_to_none");

    if (container.style.display != "none") {
        container.classList.add("display_to_none");

        setTimeout(function () {
            container.style.display = "none";
            container.style.opacity = 0;
        }, 200);
    }
}

function checkAndDisplayContainer(container) {
    container.style.display = "block";
    container.style.opacity = 1;
    if (container.classList.contains("display_to_none")) {
        container.classList.remove("display_to_none");
    }
    container.classList.add("display_to_block");
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