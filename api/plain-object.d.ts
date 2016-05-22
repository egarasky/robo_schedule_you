export interface IPlainObject {
    [index: string] : number | boolean | string | IPlainObject | IPlainObject[];
}