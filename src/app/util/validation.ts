export class Validation {
    dateIsValid(date:any):boolean{
        if(date){
            return new Date(date).toString() !== 'Invalid Date';
        }else{
            return false;
        }
    }
}
