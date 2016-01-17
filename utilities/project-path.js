var projectPathFn = function(projectRoot){
    return function(path){
        return projectRoot + path;
    };
};
var projectPath = projectPathFn(__dirname);
console.log('project path executed');
module.exports = projectPathFn;