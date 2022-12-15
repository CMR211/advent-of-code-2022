interface IMonkey {
    items: number[]
    operation: (old: number) => number
    test: (item: number) => boolean
    onTrue: (item: number) => void
    onFalse: (item: number) => void
}

class Monkey {
    items: number[] = []
    operation: (old: number) => number
    test: (item: number) => boolean
    onTrue: (item: number) => void
    onFalse: (item: number) => void
    inspected = 0
    constructor(props: IMonkey) {
        this.items = props.items
        this.operation = props.operation
        this.test = props.test
        this.onFalse = props.onFalse
        this.onTrue = props.onTrue
    }
    turn() {
        if (this.items.length < 1) return
        this.items = this.items.map((item) => Math.floor(this.operation(item) / 3))
        this.items.forEach((item) => {
            this.inspected++
            if (this.test(item)) this.onTrue(item)
            else this.onFalse(item)
        })
        this.items = []
    }
    receiveItem(item: number) {
        this.items.push(item)
    }
}

const monkey0: Monkey = new Monkey({
    items: [79, 98],
    operation: (old) => old * 19,
    test: (item) => item % 23 === 0,
    onTrue: (item) => monkey2.receiveItem(item),
    onFalse: (item) => monkey3.receiveItem(item),
})
const monkey1: Monkey = new Monkey({
    items: [54, 65, 75, 74],
    operation: (old) => old + 6,
    test: (item) => item % 19 === 0,
    onTrue: (item) => monkey2.receiveItem(item),
    onFalse: (item) => monkey0.receiveItem(item),
})
const monkey2: Monkey = new Monkey({
    items: [79, 60, 97],
    operation: (old) => old * old,
    test: (item) => item % 13 === 0,
    onTrue: (item) => monkey1.receiveItem(item),
    onFalse: (item) => monkey3.receiveItem(item),
})
const monkey3: Monkey = new Monkey({
    items: [74],
    operation: (old) => old + 3,
    test: (item) => item % 17 === 0,
    onTrue: (item) => monkey0.receiveItem(item),
    onFalse: (item) => monkey1.receiveItem(item),
})
const monkeys = [monkey0, monkey1, monkey2, monkey3]

function round() {
    monkeys.forEach((monkey) => monkey.turn())
}

function part1solution() {
    const monkeyInspections: number[] = []
    for (let i = 0; i < 20; i++) round()
    monkeys.forEach((monkey, index) => monkeyInspections.push(monkey.inspected))
    const monkeyBusiness = monkeyInspections.sort((a,b) => b-a).slice(0,2).reduce((acc,curr) => acc * curr)
    return monkeyBusiness
}

console.log(part1solution())
