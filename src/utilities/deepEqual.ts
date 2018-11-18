// tslint:disable:no-any no-unsafe-any

const deepEqualArray: (a: any, b: any) => boolean =
    (a: any, b: any): boolean =>
        a instanceof Array && b.every((el: any, index: number): boolean => deepEqual(el, a[ index ]))

const deepEqualObject: (a: any, b: any) => boolean =
    (a: any, b: any): boolean => {
        let equal: boolean = false

        if (a instanceof Array) {
            equal = false
        }
        else if (typeof a === 'object') {
            equal = Object.entries(b)
                .every(([ key, value ]: [ string, any ]): boolean =>
                    deepEqual(value, a[ key ]))
        }
        else {
            equal = false
        }

        return equal
    }

const deepEqual: (a: any, b: any) => boolean =
    (a: any, b: any): boolean => {
        let equal: boolean = false

        if (a === b) {
            equal = true
        }
        else if (a instanceof Array) {
            equal = deepEqualArray(b, a)
        }
        else if (typeof a === 'object') {
            equal = deepEqualObject(b, a)
        }

        return equal
    }

export {
    deepEqual,
}
