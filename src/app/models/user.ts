import { Timestamp } from 'firebase/firestore';
import {
    required,
    minLength,
    email,
    propObject,
    prop,
    notEmpty,
} from '@rxweb/reactive-form-validators';


export enum TypeUser {
    MASTER = 'MASTER',
    ADMIN = 'ADMINISTRADOR',
}

export class Person {

    @minLength({
        value: 3,
        message: 'El nombre debe tener al menos 3 caracteres.',
    })
    @notEmpty({ message: 'El nombre es requerido.' })
    fullname?: string;

    @required({ message: 'El email es requerido.' })
    @email({ message: 'El email no es válido.' })
    email?: string;

    constructor(person?: Person) {
        this.fullname = person?.fullname ?? '';
        this.email = person?.email ?? '';
    }

    static toFire(person: Person) {
        return {
            fullname: person.fullname,
            email: person.email,
        };
    }
}

export class User {
    @prop()
    id?: string;

    @required({ message: 'El nombre de usuario es requerido.' })
    username: string;

    @propObject(Person)
    person: Person;

    @required({ message: 'El tipo de usuario es requerido.' })
    type: TypeUser;

    @prop()
    createdAt: Timestamp;

    constructor() {
        this.username = '';
        this.type = TypeUser.MASTER;
        this.person = new Person();
        this.createdAt = Timestamp.now();
    }

    fromFire(investor: User) {
        this.id = investor.id;
        this.username = investor.username;
        this.type = investor.type;
        this.person = new Person(investor.person);
        this.createdAt = investor.createdAt;
        return this;
    }

    static toFire(investor: User) {
        return {
            username: investor.username,
            type: investor.type,
            person: Person.toFire(investor.person),
            createdAt: investor.createdAt,
        };
    }

    static clone(investor: User) {
        return new User().fromFire(investor);
    }
}


