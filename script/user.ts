"use strict";
namespace core {
    export class user {
        private m_displayName: string;
        private m_emailAddress: string;
        private m_userName: string;
        private m_password: string;
        constructor(displayName:string = "", emailAddress:string = "", userName:string = "", password:string = "") {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_userName = userName;
            this.m_password = password;
        }


        //getters and setters
        public get DisplayName():string {
            return this.m_displayName;
        }

        public set DisplayName(displayName:string) {
            this.m_displayName = displayName;
        }

        public get EmailAddress():string {
            return this.m_emailAddress;
        }

        public set EmailAddress(emailAddress:string) {
            this.m_emailAddress = emailAddress;
        }

        public get UserName() :string{
            return this.m_userName;
        }

        public set UserName(userName:string) {
            this.m_userName = userName;
        }

        public get Password() :string{
            return this.m_password;
        }

        public set Password(password:string) {
            this.m_password = password;
        }

        public toString():string {
            return `DisplayName: ${this.DisplayName}\n EmailAddress: ${this.EmailAddress} \n UserName: ${this.UserName}`;
        }
       public toJSON():{UserName:String,DisplayName:String,EmailAddress:String,Password:String}{
            return{
                "DisplayName" : this.m_displayName,
                "EmailAddress" : this.m_emailAddress,
                "UserName" : this.m_userName,
                "Password" : this.m_password
            }
        }

        public fromJSON(data:user){
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.UserName = data.UserName;
            this.Password = data.Password;
        }


        //Serialize utility method
        public serialize():string|null {
            if (this.DisplayName != "" && this.EmailAddress != "" && this.UserName != ""&& this.Password != "") {
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.UserName}, ${this.Password}`;
            }
            console.error("One or more of the properties of the user object are missing or invalid");
            return null;
        }

        //deserialize utility method.
        public deserialize(data:string) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.UserName = propertyArray[2];
            this.Password = propertyArray[3];
        }
    }


}
