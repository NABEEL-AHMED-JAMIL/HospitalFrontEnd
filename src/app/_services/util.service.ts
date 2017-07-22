import { Injectable } from '@angular/core';
//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
//-------------Module----------------------------------
//------------Component--------------------------------


@Injectable()
export class UtilService {

    private imageUrl = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJi"+
                        "YoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxv"+
                        "YWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRb"+
                        "ExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNA"+
                        "i63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZs"+
                        "iUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhm"+
                        "KtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMI"+
                        "umIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAA"+
                        "AIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pA"+
                        "EAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4C"+
                        "EuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P"+
                        "7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAA"+
                        "AQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwA"+
                        "AAAAAAAAAAA==";

    constructor() { }
    
    public dateChange(date) {
        var myDate = new Date();
        myDate.setTime(date);
        return (myDate.getMonth() + 1) + '/' +myDate.getDate() + '/' +  myDate.getFullYear();
    }

    //  public status(item) {
    //     if(item.open) {
    //         return "Open"; 
    //     }else if(item.pending) {
    //        return "Pending";
    //     }else {
    //           return "Closed";
    //     } 
    // }
    
     public getTodayDate() {
        // var dateObj = new Date();
        // console.log(dateObj);
        // var month = dateObj.getUTCMonth() + 1; //months from 1-12
        // var day = dateObj.getUTCDate();
        // var year = dateObj.getUTCFullYear();
        // var newdate = year + "-" + month + "-" + day;
        return new Date();
  }
  
  public getCircalImage(){
        return this.imageUrl;
    }

    
}