//managerSchema.methods.addSchedule = function (startDate, endDate) {
//    // var shiftScheduleCopy = deleteId(JSON.parse(JSON.stringify(this.TemplateSchedule)));
//
//    var shiftScheduleCopy = copySchedule(this.templateSchedule);
//    console.log(shiftScheduleCopy);
//    var nSchedule = {
//        templateSchedule: shiftScheduleCopy,
//        startDate: new Date(startDate),
//        endDate: new Date(endDate)
//    };
//    this.schedules.push(nSchedule);
//    this.markModified('schedules');
//
//};
//
//function copySchedule(shiftSchedule) {
//    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//    var nSchedule = createShiftSchedule();
//    days.forEach(function (day) {
//        nSchedule[day] = shiftSchedule[day];
//        nSchedule[day].forEach(function (shift) {
//            shift._id = new mongoose.Types.ObjectId();
//            shift.employees = [];
//        });
//    });
//    nSchedule._id = new mongoose.Types.ObjectId();
//    return nSchedule;
//}
