import "../src/index"
import { Equals } from "../src/Equals"
import {Set} from "../src/Set"

test("Mapped sets of strings", async() => {
    const set: Set<string> = await Set.Mapped.new(["jhahjadd", "sajkasd", "jhahjadd"])
    expect(set.size).toBe(2)
    expect(set.elements).toStrictEqual(["jhahjadd", "sajkasd"])
    expect(await set.contains("ghhgasdghasd")).toBe(false)
    expect(await set.contains("jhahjadd")).toBe(true)
    expect(await set.contains("sajkasd")).toBe(true)
})

test("Mapped sets of numbers", async() => {
    const set: Set<number> = await Set.Mapped.new([1, 3, 2, 1])
    expect(set.size).toBe(3)
    expect(set.elements).toStrictEqual([1, 3, 2])
    expect(await set.contains(4)).toBe(false)
    expect(await set.contains(1)).toBe(true)
    expect(await set.contains(3)).toBe(true)
    expect(await set.contains(2)).toBe(true)
})

test("Mapped sets of booleans", async() => {
    const set: Set<boolean> = await Set.Mapped.new([true, false, true])
    expect(set.size).toBe(2)
    expect(set.elements).toStrictEqual([true, false])
    expect(await set.contains(true)).toBe(true)
    expect(await set.contains(false)).toBe(true)
})

test("Mapped sets of arrays", async() => {
    const set: Set<number[]> = await Set.Mapped.new([[1, 3, 2, 1], [1,2], [3,1], [1,2]])
    expect(set.size).toBe(3)
    expect(set.elements).toStrictEqual([[1, 3, 2, 1], [1,2], [3,1]])
    expect(await set.contains([])).toBe(false)
    expect(await set.contains([1, 3, 2, 1])).toBe(true)
    expect(await set.contains([1,2])).toBe(true)
    expect(await set.contains([3,1])).toBe(true)
})

test("Mapped sets of custom types", async() => {
    class Foo implements Equals<Foo> {
        x: number[]

        constructor(x: number[]) {
            this.x = x
        }
        equals(b: Foo): boolean {
            return this.x.equals(b.x)
        }

        hash(): string {
            return this.x.hash()
        }
    }
    const foo1: Foo = new Foo([1,2])
    const foo2: Foo = new Foo([1,2])
    const foo3: Foo = new Foo([2,1])
    const set: Set<Foo> = await Set.Mapped.new([foo1, foo2, foo1, foo3])
    expect(set.size).toBe(2)
    expect(set.elements).toStrictEqual([foo1, foo3])
    expect(await set.contains(new Foo([]))).toBe(false)
    expect(await set.contains(foo1)).toBe(true)
    expect(await set.contains(foo2)).toBe(true)
    expect(await set.contains(foo3)).toBe(true)
})