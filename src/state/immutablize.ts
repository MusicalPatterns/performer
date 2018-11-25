// tslint:disable:no-type-definitions-outside-types-modules

import { Maybe, Time } from '@musical-patterns/utilities'
import { Map } from 'immutable'
import { Scene } from 'three'
import { Vrb } from 'vrb'
import { Thread } from '../types'

type AllowedValue =
    boolean |
    Time |
    Thread[] |
    Maybe<Worker> |
    Maybe<Scene> |
    Maybe<Vrb>

interface StateIndexSignature<V> {
    [ index: string ]: V,
}

type MapTypeAllowedData<T, V> = StateIndexSignature<V> & {
    [K in keyof T]: V
}

interface TypedMap<V, T extends MapTypeAllowedData<T, V>> extends Map<string, V> {
    get<K extends keyof T>(key: K, notSetValue?: T[K]): T[K]

    set<K extends keyof T>(key: K, value: T[K]): this

    toJS(): T
}

const immutablize: <V, T extends MapTypeAllowedData<T, V>>(data: T) => TypedMap<V, T> =
    // tslint:disable-next-line:no-any no-unsafe-any
    <V, T extends MapTypeAllowedData<T, V>>(data: T): TypedMap<V, T> => Map(data) as any

export {
    immutablize,
    StateIndexSignature,
    TypedMap,
    AllowedValue,
}
