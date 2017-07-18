//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { DoctorType , Doctor } from './index';
//-------------Module----------------------------------
//------------Component--------------------------------


export class Note {
    
    constructor(
        public id : Number,
        public description:String,
        public noteDate: Date ,
        public doctor: Doctor,
        public doctorType:DoctorType
   ){}   

}