import { Equals } from "./Equals"
import {isPresent} from "ts-is-present"

export interface Set<T extends Equals<T>> {
    add(elem: T): Promise<void>
    get size(): number
    contains(elem: T): Promise<boolean>
    get elements(): T[]
}

export namespace Set {

    export async function create<T extends Equals<T>>(elems: T[], S: new() => Set<T>): Promise<Set<T>> {
        const set: Set<T> = new S()
        await Promise.all(elems.map(async elem => {
            set.add(elem)
        }))
        return set
    }

    export class Mapped<T extends Equals<T>> implements Set<T> {
        private elems: Map<string, T> = new Map()

        static async new<T extends Equals<T>>(elems:T[]): Promise<Mapped<T>> {
            return await Set.create(elems, Mapped<T>) as Mapped<T>
        }

        private get(elem: T): T | undefined {
            const existingElem: T | undefined = this.elems.get(elem.hash())
            if (isPresent(existingElem)) {
                if (!existingElem.equals(elem))
                    throw new Error(`objects ${JSON.stringify(elem)} and ${JSON.stringify(existingElem)} have the same hash but are not equal`)
            }
            return existingElem
        }
        async add(elem: T): Promise<void> {
            const existingElem: T | undefined = this.get(elem)
            if (!isPresent(existingElem)) this.elems.set(elem.hash(), elem)
        }

        get size(): number {
            return this.elems.size
        }

        get elements(): T[] {
            return Array.from(this.elems.values())
        }

        async contains(elem: T): Promise<boolean> {
            const existingElem: T | undefined = this.get(elem)
            return isPresent(existingElem)
        }
    }

}