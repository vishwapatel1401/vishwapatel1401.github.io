"use strict";

namespace core {

    export  class Router{
        //public properties
        private m_activeLink: string ;
        private m_routingTable: string[];
        /***
         *
         * @returns {string}
         * @constructor
         */
        public get ActiveLink():string{
            return this.m_activeLink;
        }

        /***
         *
         * @param link
         * @constructor
         */
        public set ActiveLink(link:string){
            this.m_activeLink = link;
        }
        //constructor
        constructor() {
            this.m_activeLink = "";
            this.m_routingTable=[];
        }
        //public methods
        public Add(route:string):void{

        }
        public AddTable(routerTable:string[]):void{
            this.m_routingTable = routerTable;
        }
        // @ts-ignore
        public Find(route:string):number{
            this.m_routingTable.indexOf(route);
        }
        public Remove(route:string):boolean{
            if(this.Find(route)>-1){
                this.m_routingTable.splice(this.Find(route),1)
                return true;
            }
            return false;
        }
        //public override methods
        public toString():string{
            return this.m_routingTable.toString();
        }
    }


}
let router :core.Router= new core.Router();

router.AddTable(
    [
        "/",
        "/home",
        "/about",
        "/services",
        "/contact",
        "/contact-list",
        "/products",
        "/register",
        "/login",
        "/edit"
    ]
);

let route:string = location.pathname;


// @ts-ignore
route.ActiveLink = (router.Find(route)>-1)
                    ?(route === "/") ? "home" : route.substring(1)
                    :("404");