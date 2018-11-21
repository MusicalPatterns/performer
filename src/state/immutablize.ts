// tslint:disable:no-type-definitions-outside-types-modules

import { Time } from '@musical-patterns/utilities'
import { Map } from 'immutable'
import { Scene } from 'three'
import { Vrb } from 'vrb'
import { Thread } from '../types'
import { Maybe } from '../utilities'

type AllowedValue =
    boolean |
    Time |
    Thread[] |
    Maybe<Worker> |
    Maybe<Scene> |
    Maybe<Vrb>

interface StateIndexSignature {
    [ index: string ]: AllowedValue,
}

type MapTypeAllowedData<T> = StateIndexSignature & {
    [K in keyof T]: AllowedValue
}

interface TypedMap<T extends MapTypeAllowedData<T>> extends Map<string, AllowedValue> {
    get<K extends keyof T>(key: K, notSetValue?: T[K]): T[K]

    set<K extends keyof T>(key: K, value: T[K]): this

    toJS(): T
}

const immutablize: <T extends MapTypeAllowedData<T>>(data: T) => TypedMap<T> =
    // tslint:disable-next-line:no-any no-unsafe-any
    <T extends MapTypeAllowedData<T>>(data: T): TypedMap<T> => Map(data) as any

export {
    immutablize,
    StateIndexSignature,
    TypedMap,
}
