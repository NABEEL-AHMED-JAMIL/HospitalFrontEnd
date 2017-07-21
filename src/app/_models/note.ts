import { DoctorType , Doctor } from './index';


export class Note {
    
    constructor(
        public id : Number,
        public description:String,
        public noteDate: Date ,
        public doctor: Doctor,
        public doctorType:DoctorType
   ){}   

}