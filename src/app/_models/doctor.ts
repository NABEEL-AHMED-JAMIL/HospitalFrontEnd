//-------------Model----------------------------------
import { DoctorType } from './index';
import { Role } from './index';


export class Doctor {

   public id: Number;
   public email:String;
   public username: String;
   public password: String;
   public firstname: String;
   public lastname: String;
   public gender:Boolean;
   public active: Boolean;
   public role: Role[];
   public doctorType:DoctorType;
   
   constructor(){}
    
}
