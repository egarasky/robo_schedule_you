import {IEmployeeProperties} from "domain.employee";
export const BOB_BELCHER = {
    id: "E1",
    firstName: "Bob",
    lastName: "Belcher",
    roles: [
        {
            id: "R1",
            name: "cook"
        }
    ]
};
export const LINDA_BELCHER = {
    id: "E2",
    firstName: "Linda",
    lastName: "Belcher",
    roles: [
        {
            id: "R1",
            name: "cook"
        },
        {
            id: "R3",
            name: "host"
        }
    ]
};
export const LOUISE_BELCHER = {
    id: "E3",
    firstName: "Louise",
    lastName: "Belcher",
    roles: [
        {
            id: "R2",
            name: "waiter"
        },
        {
            id: "R4",
            name: "dish washer"
        },
        {
            id: "R3",
            name: "host"
        }
    ]
};
export const GENE_BELCHER = {
    id: "E4",
    firstName: "Gene",
    lastName: "Belcher",
    roles: [
        {
            id: "R2",
            name: "waiter"
        },
        {
            id: "R4",
            name: "dish washer"
        },
        {
            id: "R3",
            name: "host"
        }
    ]
};
const TINA_BELCHER = {
    id: "E5",
    firstName: "Tina",
    lastName: "Belcher",
    roles: [
        {
            id: "R1",
            name: "cook"
        },
        {
            id: "R2",
            name: "waiter"
        },
        {
            id: "R4",
            name: "dish washer"
        }
    ]
};
export var employees:Array<IEmployeeProperties> = [
    BOB_BELCHER,
    LINDA_BELCHER,
    LOUISE_BELCHER,
    GENE_BELCHER,
    TINA_BELCHER
];