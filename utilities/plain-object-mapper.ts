import {IPlainObject} from "../api/plain-object";
var sprintf = require('sprintf-js').sprintf;
var validNonObjectPropertyTypes = ['boolean', 'number', 'string'];

function isPlainObject(object:any):boolean {

    if (!(object instanceof Object)) {//not array or object(null, undefined, NaN are all not objects)
        return false;
    }

    if (Array.isArray(object)) {
        return object.every((element) => {
            return isPlainObject(element);
        });
    } else {
        var keys = Object.keys(object);
        //keys must be string and properties values must be number, string, IPlainObject or PlainObject[]
        return keys.every((key)=> {
                return typeof key === 'string';
            }) && keys.every((key) => {
                var property = object[key];
                var propertyType:string = typeof property;
                return !isNaN(property)//check not a number since typeof NaN == 'number'
                    && (validNonObjectPropertyTypes.indexOf(propertyType) !== -1 || isPlainObject(property));
            });
    }
}

/**
 * Changes moment date object to string representation and deletes null, undefined, and NaN property values in the
 * process of converting the provided object into a PlainObject or PlainObject[]
 * @param obj
 * @returns IPlainObject | IPLainObject[]
 */
function toPlainObject(obj:any):IPlainObject | IPlainObject[] | number | boolean | string {
    if(obj == null || !(obj instanceof Object)){
        return obj;
    }

    if(Array.isArray(obj)){
        return obj.map((element)=>{
           toPlainObject(element);
        });
    } else {
        var keys = Object.keys(obj);
        var nonStringKeys = keys.filter((key)=>{
            return typeof key !== 'string';
        });

        if(nonStringKeys.length){
            throw new Error(sprintf('non string keys on object %s', nonStringKeys.map((key)=>JSON.stringify(key))));
        }

        var clonedPlainObject:IPlainObject = {};
        return keys.reduce((currentPlainObject:IPlainObject, key:string):IPlainObject => {
            var property = obj[key];
            if(property === undefined || isNaN(property) || property === null){
                return currentPlainObject; //don't add property
            }

            if(property instanceof Object){//object or array, or simple type(string, boolean, number)
                currentPlainObject[key] = toPlainObject(property);
                return currentPlainObject;
            }
        }, clonedPlainObject);
    }
}



export var plainObjectMapper = {
    isPlainObject: isPlainObject,
    toPlainObject: toPlainObject
};