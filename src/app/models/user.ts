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
    requiredTrue,
    digit,
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

    @digit({ message: 'El teléfono debe ser un número.' })
    @minLength({
        value: 10,
        message: 'El teléfono debe tener al menos 10 caracteres.',
    })
    phone: string

    constructor(person?: Person) {
        this.fullname = person?.fullname ?? ''
        this.email = person?.email ?? ''
        this.phone = person?.phone ?? ''
    }

    static toFire(person: Person) {
        return {
            fullname: person.fullname,
            email: person.email,
            phone: person.phone,
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

    @requiredTrue({ message: 'El usuario debe estar online.' })
    online: boolean

    @prop()
    createdAt: Timestamp

    constructor() {
        this.username = ''
        this.type = TypeUser.MASTER
        this.person = new Person()
        this.amount = 0
        this.online = false
        this.createdAt = Timestamp.now()
    }

    fromFire(investor: User) {
        this.id = investor.id
        this.username = investor.username
        this.type = investor.type
        this.person = new Person(investor.person)
        this.amount = investor.amount
        this.online = investor.online
        this.createdAt = investor.createdAt
        return this
    }

    static toFire(investor: User) {
        return {
            username: investor.username,
            type: investor.type,
            person: Person.toFire(investor.person),
            amount: investor.amount,
            online: investor.online,
            createdAt: investor.createdAt,
        }
    }

    static clone(investor: User) {
        return new User().fromFire(investor)
    }
}
