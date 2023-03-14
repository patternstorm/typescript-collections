import { isPresent } from "ts-is-present"

declare global {
    interface String {
        equals(b: string): boolean
    }

    interface Number {
        equals(b: number): boolean
    }

    interface Boolean {
        equals(b: boolean): boolean
    }

    interface Array<T> {
        equals<T>(x: Array<T>): boolean
    }

    interface Object {
        equals(x: Object): boolean
    }
}

export function equal<A, B>(x: A, y: A): boolean {
    //console.log(`typeof(${x})=${typeof x} typeof(${y})=${typeof y}`)
    if (typeof x !== typeof y) return false
    if (typeof x["equals"] !== "function") throw new Error(`Object ${JSON.stringify(x)} does not contain an equals method`)
    if (typeof y["equals"] !== "function") throw new Error(`Object ${JSON.stringify(y)} does not contain an equals method`)
    return x["equals"](y)
}

String.prototype.equals = function(this: string, b: string) {
    return this === b
}

Number.prototype.equals = function(this: number, b: number) {
    return this === b
}

Boolean.prototype.equals = function(this: boolean, b: boolean) {
    return this === b
}

Array.prototype.equals = function<T>(this: Array<T>, b: Array<T>) {
    const count: number = this.length
    if (count != b.length) return false
    let areEqual: boolean = true
    for(let i = 0; i < count && areEqual; i++) {
        areEqual = equal(this[i], b[i])
    }
    return areEqual
}

export {}