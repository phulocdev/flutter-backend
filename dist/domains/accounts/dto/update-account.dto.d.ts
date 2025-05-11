import { CreateAccountDto } from './create-account.dto';
declare const UpdateAccountDto_base: import("@nestjs/mapped-types").MappedType<Omit<Partial<CreateAccountDto>, "email">>;
export declare class UpdateAccountDto extends UpdateAccountDto_base {
    isGuest?: boolean;
}
export {};
