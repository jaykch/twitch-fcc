/**
 * Created by Jay on 11/12/2016.
 */
function log(x) {
    console.log(x);
}

$("document").ready(function () {
    var userOutput = document.getElementById("users");
    userList.init(userOutput);
});

var userList = (function () {

    var users = [];

    function init(userOutput) {
        _generateUsers();
        _renderUsers(userOutput);
    };
    var _generateUsers = function () {

        var url = "";
        var imageUrl = "";

        for (var i = 0; i < apiCall.length; i++) {
            if (apiCall[i].display_name) {
                log(apiCall[i].display_name);
                url = "https://www.twitch.tv/" + apiCall[i].display_name;
                imageUrl = "https://static-cdn.jtvnw.net/jtv_user_pictures/" + apiCall[i].display_name + "-profile_image-9021dccf9399929e-300x300.jpeg";
                users.push(new user(apiCall[i].display_name, url, "offline", "offline", "active", imageUrl));

            } else if (apiCall[i].stream) {
                log(apiCall[i].stream.display_name);
                users.push(new user(apiCall[i].stream.display_name, apiCall[i].stream.url, "streaming", apiCall[i].stream.status, "active", apiCall[i].stream.logo));
            } else {
                log("Unknown User");
                users.push(new user("User Doesn't Exist", "", "", "", "Account Doesn't Exist", ""));
            }
        }
    };
    var _renderUsers = function (userOutput) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].accountStatus == "active") {

                if (users[i].onlineStatus == "offline") {
                    userOutput.innerHTML += "<li class='user-offline'>" + "<a class='user-name' href='"
                        + users[i].url + "' target='_blank'>" + users[i].name + "</a>"
                        + "<span class='online-status'>Status: " + users[i].onlineStatus + " </span>"
                        + "<span class='stream-status'>Stream Status: " + users[i].streamStatus + "</span>"
                        + "</li>";
                } else {
                    userOutput.innerHTML += "<li class='user-online'>" + "<a class='user-name' href='"
                        + users[i].url + "' target='_blank'>" + users[i].name + "</a>"
                        + "<span class='online-status'>Status: " + users[i].onlineStatus + " </span>"
                        + "<span class='stream-status'>Stream Status: " + users[i].streamStatus + "</span>"
                        + "</li>";
                }
            }
            else {
                userOutput.innerHTML += "<li>" + "<span class='user-name'>" + users[i].name + " (404)</span></li>"
            }
        }
    };

    return {
        init: init,
        users: users
    }
})();

log(userList.users);
//for reference purposes
//todo: delete later maybe

/*var config = {
 name: apiCall[0].stream.display_name,
 streamStatus: apiCall[0].stream.status,
 logo: apiCall[0].stream.logo,
 url: apiCall[0].stream.url
 };*/

//user constructor
function user(name, url, onlineStatus, streamStatus, accountStatus, logoUrl) {
    this.name = name;
    this.url = url;
    this.onlineStatus = onlineStatus;
    this.streamStatus = streamStatus;
    this.accountStatus = accountStatus;
    this.logo = logoUrl;
}