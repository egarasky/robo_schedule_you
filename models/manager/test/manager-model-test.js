describe.skip('manager-model', function(){
    var managerData = require(projectPath('/models/manager/test/manager-stub'));
    it('should create a new user', function(done){
       User.save(managerData.createManagerData, function(err, user){
           expect(err).to.be.false;
           done();
       });
   });
});