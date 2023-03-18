"use strict";
/**
 * Name:Vishwa Patel, Hifza Hameed
 * Student id: 100851337, 100833037
 * File:authguard.ts
 * Date: 16th March, 2023
 */
((function()
{
    let protected_routes: string[] = [
        "contact-list",
        "task-list"
    ];


    if(protected_routes.indexOf(router.ActiveLink) > -1)
    {
        // check if user is logged in
        if(!sessionStorage.getItem("user"))
        {
            // if not...redirect them back to the login page
            location.href = "/login";
        }
    }
   
}))();