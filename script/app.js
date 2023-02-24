"use strict";

/**
 * User Class
 */
class User {
    /**
     * 
     * @param String firstName 
     * @param String lastName 
     * @param String username 
     * @param String email 
     * @param String password 
     */
    constructor(firstName = "", lastName = "", username = "", email = "",  password = "") {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email
        this.password = password;
    }

    toString() {
        return `First Name: ${this.firstName}\nLast Name: ${this.lastName}\nUserame: ${this.username}\nEmail: ${this.email}\nPassword: ${this.password}\n`;
    }
    toJSON(){
        return{
            "First Name": this.firstName,
            "Last Name": this.lastName,
            "Userame": this.username,
            "Email": this.email,
            "Password": this.password,
        };
    }
}


(function(){

    /**
     * Adds a contact to local storage.
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber,emailAddress);
        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key,contact.serialize());
        }
    }

    function AjaxRequest(method,url,callback){
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

    function LoadHeader(html_data){
        $("header").html(html_data);
        $('li>a:contains(${document.title})').addClass("active");
    }
    function DisplayHomePage() {
        console.log("Home Page called!");


        //about us button
        $("#AboutUsBtn").on("click", () => {
            location.href = "aboutus.html"
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
    function ValidateField(input_field_id,regular_expression,error_message)
    {
        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur",function (){
            let inputFieldText = $(this).val();
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

        let sendButton = document.getElementById("sendButton");
        let SubscribeCheckbox = document.getElementById("SubscribeCheckbox");
        sendButton.addEventListener("click",function (event)
        {
            if(SubscribeCheckbox.checked){
               let contact = new core.Contact(fullName.value, contactNumber.value,emailAddress.value);
               if(contact.serialize()){
                   let key = contact.FullName.substring(0,1) + Date.now();
                   localStorage.setItem(key,contact.serialize());
               }
            }
        });
    }
    function DisplayContactListPage(){
        console.log("Contact List Page called!");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList");
            let data = "";        //add deserialized data from local storage

            let keys = Object.keys(localStorage);   //return a string array of keys.

            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                        <td>${contact.FullName}</td>
                        <td>${contact.ContactNumber}</td>
                        <td>${contact.EmailAddress}</td>
                        <td class ="text-center">
                            <button value="${key}" class="btn btn-primary btn-sm edit">
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
                location.href="edit.html#add"
            });
            $("button.delete").on("click", function(){
               if(confirm("Delete contact,Are you sure??")){
                   localStorage.removeItem($(this).val())
               }
               location.href="contact-list.html";
            });
            $("button.edit").on("click", function(){
                location.href = "edit.html#" + $(this).val();
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

                $("#editButton").on("click",(event) =>{
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    //refresh the contact page.
                    location.href="contact-list.html"

                });
                $("#cancelButton").on("click", () => {
                    location.href="contact-list.html"
                });
                break;
            default:{
                //get contact information from the local storage.
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));

                //display the contact info in the edit form.
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                //when edit button is pressed update the contact.
                $("#editButton").on("click",(event) =>{
                    event.preventDefault();
                    //get any changes from the form.
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    //replace the item in the local storage
                    localStorage.setItem(page,contact.serialize());

                    //return to the contact-list
                    location.href = "contact-list.html";

                });
                $("#cancelButton").on("click",() =>{
                    location.href ="contact-list.html"
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

            if(password.value.length < 6){
                alert('Enter a reasonable password');
                return;
            }
            if(username.value.length < 3){
                alert('Enter a reasonable username');
                return;
            }

            // Add the login user before the login button
            $("#login").before(`<li class="nav-item ml-3">
            <a class="nav-link "  href="#"><i class="fa-solid fa-user"></i> ${username.value}</a>
            </li>
            <li id="logout" class="nav-item">
            <a class="nav-link "  href="logout.html"><i class="fas fa-sign-out-alt"></i>logout</a>
            </li>`);

            // Remove the login link
            $("#login").remove();
            
            // Clear the form
            $("#loginForm").trigger('reset');
            
        });

    }
    function DisplayRegisterPage(){
        console.log("Register Page called!");
        // Add div to display error message
        $("#registerForm").prepend('<div id="ErrorMessage" style="display:none"></div>');

        // Bind chnage  event to name inputs
        $("#firstName, #lastName").on('change', function(){
            if($(this).val().trim().length < 2){
                $("#ErrorMessage").show();
                $("#ErrorMessage").html('characters length should be at least 2 ');
            }
            else{
                $("#ErrorMessage").hide();
            }
        });

        // Bind change  event to Email inputs
        $("#email").on('change', function(){
            if($(this).val().trim().length < 8 || !$(this).val().includes('@')){
                $("#ErrorMessage").show();
                $("#ErrorMessage").html('Please enter a valid Email address');
            }
            else{
                $("#ErrorMessage").hide();
            }
        });

        // Bind change  event to Password inputs
        $("#password").on('change', function(){
            if($(this).val().trim().length < 6){
                $("#ErrorMessage").show();
                $("#ErrorMessage").html('Minimum Password length should be 6 characters');
            }
            else{
                $("#ErrorMessage").hide();
            }
        });

        // Bind change  event to Confirm Password inputs
        $("#confirmPassword").on('change', function(){
            if($(this).val().trim().length < 6 || password.value != confirmPassword.value){
                $("#ErrorMessage").show();
                $("#ErrorMessage").html('Password not matched');
            }
            else{
                $("#ErrorMessage").hide();
            }
        });

        // On Registration form submit
        $("#registerForm").on('submit', function(event){
            event.preventDefault();

            let formErrors = [];
            if(firstName.value.trim().length < 2){
                formErrors.push("first name should be atleast two characters");
            }
            if(lastName.value.trim().length < 2){
                formErrors.push("last name should be atleast two characters");
            }
            if(email.value.trim().length < 8 || !email.value.includes('@')){
                formErrors.push("Invalide Email address");
            }
            if(password.value.trim().length < 6){
                formErrors.push("Password length should be at least 6 charactes");
            }
            else if(password.value.trim() != confirmPassword.value.trim() ){
                formErrors.push("Password not match");
            }
            // If there is an error
            if(formErrors.length > 0){
                $("#ErrorMessage").show();
                $("#ErrorMessage").html(formErrors.join('<br>'));
                return; // End submission
            }
            else{
                // Hide the error form
                $("#ErrorMessage").hide();
            }

            let user = new User(firstName.value.trim(), lastName.value.trim(), "", email.value.trim(), password.value.trim());

            // Show the user
            console.log(user.toString());

            // Clear the form
            $("#registerForm").trigger('reset');

            
        });


    }

    function CheckLogin(){
        if(sessionStorage.getItem("user"))
        {
            $("#login").html(`<a id="logout" class="nav-link " href="#">
            <i class="fas fa-sign-out-alt"></i>logout</a>`)
        }
        $("#logout").on("click",function(){
            sessionStorage.clear();
            location.href="login.html";
        });
    }




    function Start()
    {
        console.log("Application Started");
        AjaxRequest("GET","header.html",LoadHeader);
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Product":
                DisplayProductPage();
                break;
            case "Service":
                DisplayServicePage();
                break;
            case "About us":
                DisplayAboutUsPage();
                break;
            case "contact-us":
                DisplayContactUsPage();
                break;
            case "Contact-list":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
        }

    }
    window.addEventListener("load",Start)
})();

