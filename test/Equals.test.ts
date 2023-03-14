import { equal } from "../src/index"


test("String equality", async() => {
    expect(equal("ahjhjashdhsad", "bsdbadbnasdbn")).toBe(false)
    expect(equal("ahjhjashdhsad","ahjhjashdhsad")).toBe(true)
    expect(equal("ahjhjashdhsad", undefined)).toBe(false)
    expect(equal("ahjhjashdhsad", null)).toBe(false)
})

test("Number equality", async() => {
    expect(equal(0.2378432784328,0.2378432784329)).toBe(false)
    expect(equal(0.2378432784328, 0.2378432784328)).toBe(true)
    expect(equal(0.2378432784328, undefined)).toBe(false)
    expect(equal(0.2378432784328, null)).toBe(false)
})

test("Boolean equality", async() => {
    expect(equal(true,false)).toBe(false)
    expect(equal(true, true)).toBe(true)
    expect(equal(false, false)).toBe(true)
    expect(equal(false, null)).toBe(false)
    expect(equal(true, undefined)).toBe(false)
})

test("Array equality", async() => {
    expect(equal([true],[false])).toBe(false)
    expect(equal([true], [true])).toBe(true)
    expect(equal([1, 3], [1, 3, 3])).toBe(false)
    expect(equal(["jhaDHJ","NSDJKD","KJSFKSDF"],["jhaDHJ","NSDJKD","KJSFKSDF"])).toBe(true)
    expect(equal(["jhaDHJ","KJSFKSDF", "NSDJKD"],["jhaDHJ","NSDJKD","KJSFKSDF"])).toBe(false)
})


test("Custom type equality", async() => {
    class Foo {
        x: number[]
        y: string[]

        constructor(x:  number[], y: string[]) {
            this.x = x
            this.y = y
        }

        equals(b: Foo) {
            return equal(this.x, b.x) && equal(this.y, b.y)
        }
    }

    const foo1: Foo = new Foo([1,2,3], ["fgas","gfas", "fsd"])
    const foo2: Foo = new Foo([1,2,3], ["fgas","gfas", "fsd"])
    const foo3: Foo = new Foo([1,2], ["fgas","gfas", "fsd"])
    const foo4: Foo = new Foo([1,2,3], [])

    expect(equal(foo1, foo1)).toBe(true)
    expect(equal(foo2, foo2)).toBe(true)
    expect(equal(foo3, foo3)).toBe(true)
    expect(equal(foo4, foo4)).toBe(true)
    expect(equal(foo1, foo2)).toBe(true)
    expect(equal(foo1, foo3)).toBe(false)
    expect(equal(foo1, foo4)).toBe(false)
    expect(equal(foo2, foo3)).toBe(false)
    expect(equal(foo2, foo4)).toBe(false)
    expect(equal(foo3, foo4)).toBe(false)
})

test("Throw exception if the type does not contain an equals method", async() => {
    expect(() => {equal({a: 1}, {a: 3})}).toThrow()
})

