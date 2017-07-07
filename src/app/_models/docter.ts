//----------------Service------------------------------
//-------------Routing---------------------------------
//-------------Model----------------------------------
import { DocterType } from './index';
import { Role } from './index';
//-------------Module----------------------------------
//------------Component--------------------------------


export class Docter {

   public id: Number;
   public userName: String;
   public password: String;
   public gender:Boolean;
   public active: Boolean;
   public firstName: String;
   public lastName: String;
   public role: Role[];
   public docterType:DocterType;
   
   constructor(){}
    
}
