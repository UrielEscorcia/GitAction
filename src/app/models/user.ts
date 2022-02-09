import { Timestamp } from 'firebase/firestore'
import {
    required,
    minLength,
    email,
    propObject,
    prop,
    notEmpty,
    numeric,
    NumericValueType,
    maxNumber,
} from '@rxweb/reactive-form-validators'

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
    fullname?: string

    @required({ message: 'El email es requerido.' })
    @email({ message: 'El email no es válido.' })
    email?: string

    constructor(person?: Person) {
        this.fullname = person?.fullname ?? ''
        this.email = person?.email ?? ''
    }

    static toFire(person: Person) {
        return {
            fullname: person.fullname,
            email: person.email,
        }
    }
}

export class User {
    @prop()
    id?: string

    @required({ message: 'El nombre de usuario es requerido.' })
    username: string

    @propObject(Person)
    person: Person

    @required({ message: 'El tipo de usuario es requerido.' })
    type: TypeUser

    @numeric({
        acceptValue: NumericValueType.PositiveNumber,
        allowDecimal: true,
    })
    @maxNumber({
        value: 100000,
        message: 'El monto no puede ser mayor a 100000',
    })
    amount: number

    @prop()
    createdAt: Timestamp

    constructor() {
        this.username = ''
        this.type = TypeUser.MASTER
        this.person = new Person()
        this.amount = 0
        this.createdAt = Timestamp.now()
    }

    fromFire(investor: User) {
        this.id = investor.id
        this.username = investor.username
        this.type = investor.type
        this.person = new Person(investor.person)
        this.amount = investor.amount
        this.createdAt = investor.createdAt
        return this
    }

    static toFire(investor: User) {
        return {
            username: investor.username,
            type: investor.type,
            person: Person.toFire(investor.person),
            amount: investor.amount,
            createdAt: investor.createdAt,
        }
    }

    static clone(investor: User) {
        return new User().fromFire(investor)
    }
}
