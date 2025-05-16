import { Role } from 'core/constants/enum';
export declare class CreateAccountDto {
    email: string;
    password: string;
    fullName: string;
    address?: string;
    isActive?: boolean;
    phoneNumber?: string;
    avatarUrl?: string;
    role?: Role;
}
