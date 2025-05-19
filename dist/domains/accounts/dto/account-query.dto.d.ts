import { Role } from 'core/constants/enum';
export declare class AccountQueryDto {
    sort?: string;
    email?: string;
    fullName?: string;
    phoneNumber?: string;
    isActive?: number;
    address?: string;
    role?: Role;
}
