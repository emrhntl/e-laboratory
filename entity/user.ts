import Role from '../enums/role.enum'

class User {
    constructor(
        id:string,
        name:string,
        surname:string,
        tckn:string,
        birthday:string,
        password:string,
        email:string,
        role:Role
    ){}
}

export default User;