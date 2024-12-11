import Role from '../enums/role.enum'
import { BaseEntity } from './base.entity';

class User extends BaseEntity{
    id: string;
    name: string;
    surname: string;
    tckn: string;
    birthday: string;
    password: string;
    email: string;
    role: Role

    constructor(
        id: string,
        name: string,
        surname: string,
        tckn: string,
        birthday: string,
        password: string,
        email: string,
        role: Role
    ) {
        super();
        this.id = id;
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