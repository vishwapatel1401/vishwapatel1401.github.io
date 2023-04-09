"use strict";

namespace core{
    export class User{
        private m_displayName : string;
        private m_emailAddress : string;
        private m_username : string;
        private m_password : string;

        constructor(displayName : string = "", emailAddress: string  = "", username: string  = "",
                    password: string  = "") {
            //It's a call to the setter that's why its in that case.
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;

        }

        public set DisplayName(displayName : string){
            this.m_displayName = displayName;
        }

        public get DisplayName() : string{
            return this.m_displayName;
        }

        public set Username(username : string){
            this.m_username = username;
        }

        public get Username() : string{
            return this.m_username;
        }

        public set EmailAddress(emailAddress : string){
            this.m_emailAddress = emailAddress;
        }

       public get EmailAddress() : string{
            return this.m_emailAddress;
        }

        public set Password(password : string){
            this.m_password = password;
        }

        public get Password() : string{
            return this.m_password;
        }

        public toString() : string{
            return `Display Name: ${this.DisplayName}\n EmailAddress: ${this.EmailAddress}\n
             Username: ${this.Username}`;
        }

        public toJSON() : { Username: string; "EmailAddress ": string; "DisplayName ": string }{
            return {
                "DisplayName ": this.m_displayName,
                "EmailAddress ": this.m_emailAddress,
                "Username": this.m_username
            }
        }

        public fromJSON (data : User){
            this.m_displayName = data.DisplayName;
            this.m_emailAddress = data.EmailAddress;
            this.m_username = data.Username;
            this.m_password = data.Password;
        }

       public serialize():string | null{
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
            }
            console.error("One or more of the attributes is empty or missing");
            return null;

        }

       public  deserialize(data : string) : void{

            let propertyArray = data.split(",")
            this.DisplayName = propertyArray[0],
            this.EmailAddress = propertyArray[1],
            this.Username = propertyArray[2],
            this.Password = propertyArray[3]
        }
    }

}

