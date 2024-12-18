import { RoleEnum } from '@/enums/role.enum'; '../enums/role.enum'
import { BaseEntity } from './base.entity';
class User extends BaseEntity{
    name: string;
    surname: string;
    tckn: string;
    birthday: string;
    password: string;
    email: string;
    role: RoleEnum

    constructor(
        id: string,
        name: string,
        surname: string,
        tckn: string,
        birthday: string,
        password: string,
        email: string,
        role: RoleEnum
    ) {
        super(id);
        this.name = name;
        this.surname = surname;
        this.tckn = tckn;
        this.birthday = birthday;
        this.password = password;
        this.email = email;
        this.role = role

     }
}

export default User;