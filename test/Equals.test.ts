import "../src"
import { Equals } from "../src"



test("String equality", async() => {
    expect("ahjhjashdhsad".equals("bsdbadbnasdbn")).toBe(false)
    expect("ahjhjashdhsad".equals("ahjhjashdhsad")).toBe(true)
})

test("Number equality", async() => {
    expect(0.2378432784328.equals(0.2378432784329)).toBe(false)
    expect(0.2378432784328.equals(0.2378432784328)).toBe(true)
})

test("Boolean equality", async() => {
    expect(true.equals(false)).toBe(false)
    expect(true.equals(true)).toBe(true)
    expect(false.equals(false)).toBe(true)
})

test("Array equality", async() => {
    expect([true].equals([false])).toBe(false)
    expect([true].equals([true])).toBe(true)
    expect([1, 3].equals([1, 3, 3])).toBe(false)
    expect(["jhaDHJ","NSDJKD","KJSFKSDF"].equals(["jhaDHJ","NSDJKD","KJSFKSDF"])).toBe(true)
    expect(["jhaDHJ","KJSFKSDF", "NSDJKD"].equals(["jhaDHJ","NSDJKD","KJSFKSDF"])).toBe(false)
})


test("Custom type equality", async() => {
    class Foo implements Equals<Foo> {
        x: number[]
        y: string[]

        constructor(x:  number[], y: string[]) {
            this.x = x
            this.y = y
        }

        hash(): string {
            return `${this.x.hash()}${this.y.hash()}`
        }

        equals(b: Foo) {
            return this.x.equals(b.x) && this.y.equals(b.y)
        }
    }

    const foo1: Foo = new Foo([1,2,3], ["fgas","gfas", "fsd"])
    const foo2: Foo = new Foo([1,2,3], ["fgas","gfas", "fsd"])
    const foo3: Foo = new Foo([1,2], ["fgas","gfas", "fsd"])
    const foo4: Foo = new Foo([1,2,3], [])

    expect(foo1.equals(foo1)).toBe(true)
    expect(foo2.equals(foo2)).toBe(true)
    expect(foo3.equals(foo3)).toBe(true)
    expect(foo4.equals(foo4)).toBe(true)
    expect(foo1.equals(foo2)).toBe(true)
    expect(foo1.equals(foo3)).toBe(false)
    expect(foo1.equals(foo4)).toBe(false)
    expect(foo2.equals(foo3)).toBe(false)
    expect(foo2.equals(foo4)).toBe(false)
    expect(foo3.equals(foo4)).toBe(false)
})

test("Custom subtype equality", async() => {
    class Foo implements Equals<Foo> {
        x: number[]
        y: string[]

        constructor(x:  number[], y: string[]) {
            this.x = x
            this.y = y
        }

        hash(): string {
            return `${this.x.hash()}${this.y.hash()}`
        }

        equals(b: Foo) {
            return this.x.equals(b.x) && this.y.equals(b.y)
        }
    }

    class Boo extends Foo {
        z: string

        constructor(x:  number[], y: string[], z: string) {
            super(x, y)
            this.z = z
        }

        equals(b: Foo): boolean {
            if (b instanceof Boo) return this.x.equals(b.x) && this.y.equals(b.y) && this.z.equals(b.z)
            if (b instanceof Foo) return this.x.equals(b.x) && this.y.equals(b.y)
            return false
        }
    }

    const foo: Foo = new Foo([1,2,3], ["fgas","gfas", "fsd"])
    const boo1: Boo = new Boo([1,2,3], ["fgas","gfas", "fsd"], "hi")
    const boo2: Boo = new Boo([1,2,3], ["fgas","gfas", "fsd"], "jhahjs")

    expect(boo1.equals(boo1)).toBe(true)
    expect(boo2.equals(boo2)).toBe(true)
    expect(boo1.equals(boo2)).toBe(false)
    expect(foo.equals(boo1)).toBe(true)
    expect(foo.equals(boo2)).toBe(true)

})

