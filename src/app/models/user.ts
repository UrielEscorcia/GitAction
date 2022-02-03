import { Timestamp } from 'firebase/firestore';

export enum TypeUser {
    MASTER = 'MASTER',
    ADMIN = 'ADMINISTRADOR',
}

export interface Person {
    fullname?: string;
    email?: string;
}

export class User {
    id?: string;
    username: string;
    person: Person;
    type: TypeUser;
    createdAt: Timestamp;

    constructor() {
        this.username = '';
        this.type = TypeUser.MASTER;
        this.person = {};
        this.createdAt = Timestamp.now();
    }

    fromFire(investor: User) {
        this.id = investor.id;
        this.username = investor.username;
        this.type = investor.type;
        this.person = investor.person;
        this.createdAt = investor.createdAt;
        return this;
    }

    static toFire(investor: User) {
        return {
            alias: investor.username,
            type: investor.type,
            person: investor.person,
            createdAt: investor.createdAt,
        };
    }

    static clone(investor: User) {
        return new User().fromFire(investor);
    }
}
