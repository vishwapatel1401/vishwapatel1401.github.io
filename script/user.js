"use strict";
(function (core) {
    class user {
        constructor(displayName = "", emailAddress = "", userName = "", password = "") {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.UserName = userName;
            this.Password = password;
        }


        //getters and setters
        get DisplayName() {
            return this.m_displayName;
        }

        set DisplayName(displayName) {
            this.m_displayName = displayName;
        }

        get EmailAddress() {
            return this.m_emailAddress;
        }

        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }

        get UserName() {
            return this.m_userName;
        }

        set UserName(userName) {
            this.m_userName = userName;
        }

        get Password() {
            return this.m_password;
        }

        set Password(password) {
            this.m_password = password;
        }

        toString() {
            return `DisplayName: ${this.DisplayName}\n EmailAddress: ${this.EmailAddress} \n UserName: ${this.UserName}`;
        }
        toJSON(){
            return{
                "DisplayName" : this.DisplayName,
                "EmailAddress" : this.EmailAddress,
                "UserName" : this.UserName,
                "Password" : this.Password
            }
        }

        fromJSON(data){
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.UserName = data.UserName;
            this.Password = data.Password;
        }


        //Serialize utility method
        serialize() {
            if (this.DisplayName != "" && this.EmailAddress != "" && this.UserName != ""&& this.Password != "") {
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.UserName}, ${this.Password}`;
            }
            console.error("One or more of the properties of the user object are missing or invalid");
            return null;
        }

        //deserialize utility method.
        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.UserName = propertyArray[2];
            this.Password = propertyArray[3];
        }
    }
    core.User = user;

})
(core || (core = {}));
