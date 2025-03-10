import { User } from "./User";

export type Client = {
    id: string;
    name: string;
    companyValue: number;
    salary: number;
    user: User
    isSelect: boolean;
};