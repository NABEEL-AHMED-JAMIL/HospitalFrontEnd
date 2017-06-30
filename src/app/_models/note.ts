//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model-----------------------------------
import { DocterType , Docter } from './index';
//-------------Module----------------------------------
//------------Component--------------------------------


export class Note {
    
    constructor(
        public id : Number,
        public description:String,
        public noteDate: Date ,
        public docter: Docter,
        public docterType:DocterType
   ){}   

}