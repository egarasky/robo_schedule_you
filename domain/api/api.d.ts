declare module "domain.api" {
    export interface IRole {
        id: string,
        name: string
    }

    export interface ITime {
        hour: number,
        minute: number
    }

    export interface IAvailabilitySchedule {
        id: string
    }
}