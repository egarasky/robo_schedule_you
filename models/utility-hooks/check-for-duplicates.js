
/**
 * Returns function that iterates through document array keeping track of what propertyName values have been seen
 * and passes an error to the given callback if a propertyName value is seen more than once
 */
function getNoDuplicatesFn(documentArrayName, propertyName){
    return function noDuplicates(next) {
        var seenProperties = {};
        var duplicateProperties = {};
        if(!this[documentArrayName]){
            next();
            return;
        }
        this[documentArrayName].forEach(function (doc) {
            if (seenProperties[doc[propertyName]]) {
                if (duplicateProperties[doc[propertyName]]) {//if already defined then there are multiple duplicates
                    duplicateProperties[doc[propertyName]].push(doc);
                } else {
                    duplicateProperties[doc[propertyName]] = [doc, seenProperties[doc[propertyName]]];
                }
            } else {
                seenProperties[doc[propertyName]] = doc;
            }
        });
        if (Object.keys(duplicateProperties).length > 0) {
            var error = new Error('Duplicate ' + propertyName);
            Object.keys(duplicateProperties).forEach(function (propertyWithDuplicates) {
                error[propertyWithDuplicates] = duplicateProperties[propertyWithDuplicates];
            });
            next(error);
        } else {
            next();
        }
    }
}

module.exports = getNoDuplicatesFn;