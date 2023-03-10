"use strict";
import {event} from "jquery";
import user = core.user;

(function(){

    /**
     * Adds a contact to local storage.
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    function AddContact(fullName:string, contactNumber:string, emailAddress:string){
        let contact = new core.Contact(fullName, contactNumber,emailAddress);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key,contact.serialize()as string);
        }
    }

    function AjaxRequest(method:string,url:string,callback:Function){
        //instantiate an XHR object
        let XHR = new XMLHttpRequest();
        //add an eventlistener to readystatechange
        XHR.addEventListener("readystatechange",() =>{
            if(XHR.readyState === 4 && XHR.status === 200) {
                if (typeof callback === "function") {
                    callback(XHR.responseText);
                } else {
                    console.error("ERROR: callback not a function");
                }
            }
        });

        //open a connection to the server
        XHR.open(method,url);

        //send the request to the server
        XHR.send();
    }


    function DisplayHomePage() {
        console.log("Home Page called!");


        //about us button
        $("#AboutUsBtn").on("click", () => {
            location.href = "/aboutus"
        });
        //Main paragraph
        $("main").append(`<p id="MainParagraph" class="mt-3">This is the main paragraph</p>`);
        //Article paragraph
        $("body").append(`<article class="container">
                         <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`);

    }
    function DisplayProductPage(){
        console.log("Product Page called!");
    }

    function DisplayServicePage(){
        console.log("Service Page called!");
    }

    function DisplayAboutUsPage(){
        console.log("About us Page called!");
    }

    /**
     * This function will validate field input based on based regular expression.
     * @param {string} input_field_id
     * @param {RegExp} regular_expression
     * @param {string} error_message
     * @constructor
     */
    function ValidateField(input_field_id:string,regular_expression:RegExp,error_message:string)
    {
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur",function (){
            let inputFieldText = $(this).val()as string;
            if(!regular_expression.test(inputFieldText)){
                $(this).trigger("focus").trigger("select")
                messageArea.addClass("alert alert-danger").text(error_message).show();

            }else{
                messageArea.removeAttr("class").hide();
                }
        });
    }

    function ContactFormValidation(){
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid first and last name."); //full name
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone number"); //contact number
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address"); //email address
    }

    function DisplayContactUsPage(){
        console.log("Contact Us Page called!");

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let SubscribeCheckbox = document.getElementById("SubscribeCheckbox")as HTMLInputElement;
        sendButton.addEventListener("click",function (event)
        {
            if(SubscribeCheckbox.checked){
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
               let contact = new core.Contact(fullName, contactNumber,emailAddress);
               if(contact.serialize()){
                   let key = contact.FullName.substring(0,1) + Date.now();
                   localStorage.setItem(key,contact.serialize()as string);
               }
            }
        });
    }
    function DisplayContactListPage(){
        console.log("Contact List Page called!");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList")as HTMLElement;
            let data = "";        //add deserialized data from local storage

            let keys = Object.keys(localStorage);   //return a string array of keys.

            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key)as string;
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.FullName}</td>
                        <td>${contact.ContactNumber}</td>
                        <td>${contact.EmailAddress}</td>
                        <td class ="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm-edit">
                             <i class= "fas fa-edit fa-sm">Edit</i>
                            </button>
                        </td>
                        <td class ="text-center">
                            <button value="${key}" class="btn btn-danger btn-sm delete">
                             <i class= "fas fa-trash-alt fa-sm">Delete</i>
                            </button>
                        </td>
                        
                  </tr>`
                index++;
            }
            contactList.innerHTML = data;
            $("#addButton").on("click ",() => {
                location.href="/edit#add"
            });
            $("button.delete").on("click", function(){
               if(confirm("Delete contact,Are you sure??")){
                   localStorage.removeItem($(this).val() as string)
               }
               location.href="/contact-list";
            });
            $("button.edit").on("click", function(){
                location.href = "/edit#" + $(this).val();
            });

        }

    }
    function DisplayEditPage(){
        console.log("Edit Page called!");

        ContactFormValidation();
        let page= location.hash.substring(1);
        console.log(page);
        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"></i>Add`);

                $("editButton").on("click",(event) =>{
                    event.preventDefault();
                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    //refresh the contact page.
                    location.href="/contact-list"

                });
                $("#cancelButton").on("click", () => {
                    location.href="/contact-list"
                });
                break;
            default:{
                //get contact information from the local storage.
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page)as string);

                //display the contact info in the edit form.
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                //when edit button is pressed update the contact.
                $("#editButton").on("click",(event) =>{
                    event.preventDefault();
                    //get any changes from the form.
                    contact.FullName = $("#fullName").val()as string;
                    contact.ContactNumber = $("#contactNumber").val()as string;
                    contact.EmailAddress = $("#emailAddress").val()as string;

                    //replace the item in the local storage
                    localStorage.setItem(page,contact.serialize()as string);

                    //return to the contact-list
                    location.href = "/contact-list";

                });
                $("#cancelButton").on("click",() =>{
                    location.href ="/contact-list"
                });

            }
            break;
        }
    }
    function DisplayLoginPage(){
        console.log("Login Page called!");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click",function(){
            let success =false;
            let newUser = new core.user();

            $.get("./dat/user.json",function(data) {

                for (const u of data.user) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;


                    if (username === u.UserName && password === u.Password) {
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize()as string);
                    messageArea.removeAttr("class").hide();
                } else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("error:Invalid credentials");
                }
            });
            $("#cancelButton").on("click",function(){
                document.forms[0].reset();
                location.href="/";
            });
        });

    }
    function DisplayRegisterPage(){
        console.log("Register Page called!");
    }

    function CheckLogin(){
        if(sessionStorage.getItem("user"))
        {
            $("#login").html(`<a id="logout" class="nav-link " href="#">
            <i class="fas fa-sign-out-alt"></i>logout</a>`)
        }
        $("#logout").on("click",function(){
            sessionStorage.clear();
            location.href="/login";
        });
    }

    function Display404Page(){
        console.log("404 page");
    }
    function ActiveLinkCallback():Function{
        switch (router.ActiveLink) {
            case "home" : return DisplayHomePage;
            case "about" : return DisplayAboutUsPage;
            case "service" : return DisplayServicePage;
            case "contact" : return DisplayContactUsPage;
            case "contact-list" : return DisplayContactListPage;
            case "product" : return DisplayProductPage;
            case "register" : return DisplayRegisterPage;
            case "login" : return DisplayLoginPage;
            case "edit" : return DisplayEditPage;
            case "404" : return Display404Page;
            default:
                console.error("Error: callback does not exist" + router.ActiveLink);
                return new Function;
        }
    }

    function capitalizeFirstCharacter(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadHeader(html_data:string){
        $.get("/views/components/header.html",function(html_data){

            $("header").html(html_data);
            document.title = capitalizeFirstCharacter(router.ActiveLink);
            $('li>a:contains(${document.title})').addClass("active");
            CheckLogin();
        });


    }
    function LoadContent(ActiveLink:HTMLElement) {

        let page = router.ActiveLink;
        let callback = ActiveLinkCallback();
        $.get(`/views/content/${page}.html`, function (html_data) {

            $("main").html(html_data);
            callback();
        });
    }

    function LoadFooter() {
        $.get("/views/components/footer.html", function (html_data) {

            $("footer").html(html_data);
        });
    }



    function Start()
    {
        console.log("Application Started");

        // @ts-ignore
        LoadHeader();

        // @ts-ignore
        LoadContent();

        LoadFooter()


    }
    window.addEventListener("load",Start)
})();

