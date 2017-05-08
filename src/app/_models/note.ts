import { DocterType , Docter } from './index';

export class Note {
    
    constructor(
  
    public id : Number,
    public description:String,
    public noteDate: Date ,
    public docter: Docter,
    public docterType:DocterType
 
   ){}   

   
    
}