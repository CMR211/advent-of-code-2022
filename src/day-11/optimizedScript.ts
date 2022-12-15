import { raw } from "./raw"

const LCM =
    raw
        .match(/divisible by \d{1,2}/g)
        ?.map((i) => parseInt(i.replace("divisible by ", "")))
        .reduce((acc, curr) => acc * curr, 1) || 1

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
    turn1() {
        if (this.items.length < 1) return
        this.items = this.items.map((item) => {
            return Math.floor(this.operation(item) / 3)
        })
        this.items.forEach((item) => {
            this.inspected++
            if (this.test(item)) this.onTrue(item)
            else this.onFalse(item)
        })
        this.items = []
    }
    turn2() {
        if (this.items.length < 1) return

        this.items = this.items.map((item) => this.operation(item) % LCM)
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

const monkeys: Monkey[] = []
const input = raw.split("Monkey").slice(1)
input.forEach((line) => createMonkey(line))

function createMonkey(input: string) {
    const lines = input.split("\n")
    const startingItems = JSON.parse("[" + lines[1].replace("Starting items: ", "") + "]").map((item: string) => parseInt(item))
    const operation = lines[2].replace("Operation: new = old ", "")
    const operator = operation[0]
    const value = operation.slice(2)
    let operationFunction: (old: number) => number
    if (operator === "+") operationFunction = (old) => old + parseInt(value)
    else {
        if (value === "old") operationFunction = (old) => old * old
        else {
            const val = parseInt(value)
            operationFunction = (old) => old * val
        }
    }
    const testValue = parseInt(lines[3].replace(/(\D)/g, ""))
    const testFunction = (item: number) => item % testValue === 0
    const onTrueFunction = (item: number) => monkeys[parseInt(lines[4].replace(/(\D)/g, ""))].receiveItem(item)
    const onFalseFunction = (item: number) => monkeys[parseInt(lines[5].replace(/(\D)/g, ""))].receiveItem(item)

    monkeys.push(
        new Monkey({
            items: startingItems,
            operation: operationFunction,
            test: testFunction,
            onTrue: onTrueFunction,
            onFalse: onFalseFunction,
        })
    )
}

function round1() {
    monkeys.forEach((monkey) => monkey.turn1())
}

function round2() {
    monkeys.forEach((monkey) => monkey.turn2())
}

function solution(part: number) {
    const monkeyInspections: number[] = []
    if (part === 1) {
        for (let i = 0; i < 20; i++) {
            round1()
        }
    } else {
        for (let i = 0; i < 10000; i++) {
            round2()
        }
    }

    monkeys.forEach((monkey, index) => monkeyInspections.push(monkey.inspected))
    console.log(monkeyInspections)
    const monkeyBusiness = monkeyInspections
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((acc, curr) => acc * curr)
    return monkeyBusiness
}

// console.log(solution(1))
// 120384

console.log("solution 2",solution(2))
