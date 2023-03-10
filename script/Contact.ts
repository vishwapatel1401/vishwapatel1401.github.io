"use strict";


namespace core {
    export class Contact{
        private m_fullName: string;
        private m_contactNumber: string;
        private m_emailAddress: string;
    constructor(fullName:string = "", contactNumber:string = "" , emailAddress:string = "") {
        this.m_fullName = fullName;
        this.m_contactNumber = contactNumber;
        this.m_emailAddress = emailAddress;
    }
        //getters and setters
        // @ts-ignore
        public get FullName():string{
            return this.m_fullName;
        }
        // @ts-ignore
        public get ContactNumber():string{
            return this.m_contactNumber;
        }
        // @ts-ignore
        public get EmailAddress() :string{
            return this.m_emailAddress;
        }
        // @ts-ignore
        public set FullName(fullName:string){
            this.m_fullName = fullName;
        }
        // @ts-ignore
        public set ContactNumber(contactNumber:string){
            this.m_contactNumber= contactNumber;
        }
        // @ts-ignore
        public set EmailAddress(emailAddress:string){
            this.m_emailAddress = emailAddress;
        }
        public toString():string{
            return `FullName: ${this.FullName}\n Contact number: ${this.ContactNumber} \n Email address: ${this.EmailAddress}`;
        }

        //Serialize utility method
    public serialize():string|null{
        if(this.FullName != "" && this.ContactNumber != "" && this.EmailAddress !=""){
            return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
        }
        console.error("One or more of the properties of the contact object are missing or invalid");
        return null;
    }
    //deserialize utility method.
    public deserialize(data:string):void{
        let propertyArray = data.split(",");
        this.m_fullName = propertyArray[0];
        this.m_contactNumber = propertyArray[1];
        this.m_emailAddress = propertyArray[2];
    }




}


}
