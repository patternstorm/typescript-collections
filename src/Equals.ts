
//TODO implement hash and then implement the Map collection always checking that equal hashes => equal objects)


declare global {
    interface String extends Equals<String> {
        equals(b: string): boolean
        hash(): string
    }

    interface Number extends Equals<Number> {
        equals(b: number): boolean
        hash(): string
    }

    interface Boolean extends Equals<Boolean> {
        equals(b: boolean): boolean
        hash(): string
    }

    interface Array<T> extends Equals<Array<T>> {
        equals<T>(x: Array<NonNullable<T>>): boolean
        hash<T>(): string
    }
}

export interface Equals<T> {
    equals(x: T): boolean
    hash(): string
}

type NonNullable<T> = T extends null | undefined ? never : T
function equal<A, B>(x: NonNullable<A>, y: NonNullable<A>): boolean {
    //console.log(`typeof(${x})=${typeof x} typeof(${y})=${typeof y}`)
    if (typeof x["equals"] !== "function") throw new Error(`Object ${JSON.stringify(x)} does not contain an equals method`)
    if (typeof y["equals"] !== "function") throw new Error(`Object ${JSON.stringify(y)} does not contain an equals method`)
    if (typeof x["hash"] !== "function") throw new Error(`Object ${JSON.stringify(x)} does not contain a hash method`)
    if (typeof y["hash"] !== "function") throw new Error(`Object ${JSON.stringify(y)} does not contain a hash method`)
    let areObjectsEqual: boolean = false
    if (typeof x !== typeof y) areObjectsEqual = false
    else areObjectsEqual = x["equals"](y)
    const areHashesEqual: boolean = x["hash"]() === y["hash"]()
    if (areObjectsEqual !== areHashesEqual) throw new Error(`x=${JSON.stringify(x)}, y=${JSON.stringify(x)}: x.equals(y)=${areObjectsEqual} while hash(x) === hash(y) is ${areHashesEqual}`)
    if (y["equals"](x) !== areObjectsEqual) throw new Error(`x=${JSON.stringify(x)}, y=${JSON.stringify(x)}: x.equals(y) != y.equals(x)`)
    return areObjectsEqual
}

String.prototype.equals = function(this: string, b: string) {
    return this === b
}

String.prototype.hash = function(this: string) {
    return this
}

Number.prototype.equals = function(this: number, b: number) {
    return this === b
}

Number.prototype.hash = function(this: number) {
    return this.toString()
}

Boolean.prototype.equals = function(this: boolean, b: boolean) {
    return this === b
}

Boolean.prototype.hash = function(this: boolean) {
    return this.toString()
}

Array.prototype.equals = function<T>(this: Array<NonNullable<T>>, b: Array<NonNullable<T>>) {
    const count: number = this.length
    if (count != b.length) return false
    let areEqual: boolean = true
    for(let i = 0; i < count && areEqual; i++) {
        areEqual = equal(this[i], b[i])
    }
    return areEqual
}

Array.prototype.hash = function<T>(this: Array<NonNullable<T>>) {
    return this.reduce((x, y) => x + y, "")
}

export {}