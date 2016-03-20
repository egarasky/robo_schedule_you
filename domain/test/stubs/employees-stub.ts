import {IEmployeeProperties} from "domain.employee";


export const COOK_ROLE = {
    id: "R1",
    name: "cook"
};

export const HOST_ROLE = {
    id: "R3",
    name: "host"
};

export const WAITER_ROLE = {
    id: "R2",
    name: "waiter"
};
export const DISH_WASHER_ROLE = {
    id: "R4",
    name: "dish washer"
};

export const BOB_BELCHER:IEmployeeProperties = {
    id: "E1",
    firstName: "Bob",
    lastName: "Belcher",
    roles: [
        COOK_ROLE
    ]
};

export const LINDA_BELCHER:IEmployeeProperties = {
    id: "E2",
    firstName: "Linda",
    lastName: "Belcher",
    roles: [
        COOK_ROLE,
        HOST_ROLE
    ]
};

export const LOUISE_BELCHER:IEmployeeProperties = {
    id: "E3",
    firstName: "Louise",
    lastName: "Belcher",
    roles: [
        WAITER_ROLE,
        DISH_WASHER_ROLE,
        HOST_ROLE
    ]
};
export const GENE_BELCHER:IEmployeeProperties = {
    id: "E4",
    firstName: "Gene",
    lastName: "Belcher",
    roles: [
        WAITER_ROLE,
        DISH_WASHER_ROLE,
        HOST_ROLE
    ]
};
const TINA_BELCHER:IEmployeeProperties = {
    id: "E5",
    firstName: "Tina",
    lastName: "Belcher",
    roles: [
        COOK_ROLE,
        WAITER_ROLE,
        DISH_WASHER_ROLE
    ]
};
export var employees:Array<IEmployeeProperties> = [
    BOB_BELCHER,
    LINDA_BELCHER,
    LOUISE_BELCHER,
    GENE_BELCHER,
    TINA_BELCHER
];