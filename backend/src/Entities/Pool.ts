export interface Pool {
    id: number;
    name: string;
    type: PoolType;
    status: boolean;
}

export enum PoolType {
    PoolBlueCarpet = 0,
    PoolGreenCarpet = 1,
    Snooker9P = 2,
}
