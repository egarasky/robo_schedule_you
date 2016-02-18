var different;
(function (different) {
    var AClass = (function () {
        function AClass(name) {
            this.name = name;
        }
        return AClass;
    })();
    different.AClass = AClass;
})(different || (different = {}));
//# sourceMappingURL=typescript-test.js.map