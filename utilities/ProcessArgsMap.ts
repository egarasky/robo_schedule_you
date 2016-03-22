var _:UnderscoreStatic = require('underscore');
export class ProcessArgsMap {

    constructor() {
        throw new Error('do not construct a ProcessArgsMap. for static use only');
    }

    public static get(key:string):string {
        var processMap = {};
        process.argv.forEach((arg:string)=> {
            const split = arg.split('=');
            if (split[0] && split.length > 1) {
                processMap[split[0]] = split[1];
            }
        });
        return processMap[key];
    }
}