//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model----------------------------------
import { DoctorType } from './index';
import { Role } from './index';
//-------------Module----------------------------------
//------------Component--------------------------------


// ok docter
export class Doctor {

   public id: Number;
   public email:String;
   public userName: String;
   public passWord: String;
   public firstName: String;
   public lastName: String;
   public gender:Boolean;
   public active: Boolean;
   public role: Role[];
   public doctorType:DoctorType;
   
   constructor(){}
    
}
