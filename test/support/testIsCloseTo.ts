// tslint:disable:no-any

const determineIfClose: (rawNumberOne: number, rawNumberTwo: number) => boolean =
    (rawNumberOne: number, rawNumberTwo: number): boolean => {
        const precision: number = 2

        const pow: number = Math.pow(10, precision + 1)
        const delta: number = Math.abs(rawNumberOne - rawNumberTwo)
        const maxDelta: number = Math.pow(10, -precision) / 2

        return Math.round(delta * pow) / pow <= maxDelta
    }

const maybeFail: (isClose: boolean, rawNumberOne: number, rawNumberTwo: number, negative?: boolean) => void =
    (isClose: boolean, rawNumberOne: number, rawNumberTwo: number, negative: boolean = false): void => {
        if (!negative && !isClose) {
            fail(`expected ${rawNumberOne} to be close to ${rawNumberTwo}`)
        }
        else if (negative && isClose) {
            fail(`expected ${rawNumberOne} not to be close to ${rawNumberTwo}`)
        }
    }

const testIsCloseTo: <T>(numberOne: T, numberTwo: T, negative?: boolean) => boolean =
    <T>(numberOne: T, numberTwo: T, negative?: boolean): boolean => {
        const rawNumberOne: number = numberOne as any
        const rawNumberTwo: number = numberTwo as any

        const isClose: boolean = determineIfClose(rawNumberOne, rawNumberTwo)

        maybeFail(isClose, rawNumberOne, rawNumberTwo, negative)

        return negative ? !isClose : isClose
    }

export {
    testIsCloseTo,
}
