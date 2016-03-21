"use strict";
exports.COOK_ROLE = {
    id: "R1",
    name: "cook"
};
exports.HOST_ROLE = {
    id: "R3",
    name: "host"
};
exports.WAITER_ROLE = {
    id: "R2",
    name: "waiter"
};
exports.DISH_WASHER_ROLE = {
    id: "R4",
    name: "dish washer"
};
exports.BOB_BELCHER = {
    id: "E1",
    firstName: "Bob",
    lastName: "Belcher",
    roles: [
        exports.COOK_ROLE
    ]
};
exports.LINDA_BELCHER = {
    id: "E2",
    firstName: "Linda",
    lastName: "Belcher",
    roles: [
        exports.COOK_ROLE,
        exports.HOST_ROLE
    ]
};
exports.LOUISE_BELCHER = {
    id: "E3",
    firstName: "Louise",
    lastName: "Belcher",
    roles: [
        exports.WAITER_ROLE,
        exports.DISH_WASHER_ROLE,
        exports.HOST_ROLE
    ]
};
exports.GENE_BELCHER = {
    id: "E4",
    firstName: "Gene",
    lastName: "Belcher",
    roles: [
        exports.WAITER_ROLE,
        exports.DISH_WASHER_ROLE,
        exports.HOST_ROLE
    ]
};
var TINA_BELCHER = {
    id: "E5",
    firstName: "Tina",
    lastName: "Belcher",
    roles: [
        exports.COOK_ROLE,
        exports.WAITER_ROLE,
        exports.DISH_WASHER_ROLE
    ]
};
exports.employees = [
    exports.BOB_BELCHER,
    exports.LINDA_BELCHER,
    exports.LOUISE_BELCHER,
    exports.GENE_BELCHER,
    TINA_BELCHER
];
//# sourceMappingURL=employees-stub.js.map