import { raw } from "./raw"

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

class Part1 {
    get input() {
        return this.parse(raw)
    }
    parse(raw: string) {
        return raw.split("\n").map((row) => {
            const len = row.length / 2
            return [row.slice(0, len), row.slice(len)]
        })
    }
    findDuplicate(row: string[]) {
        const chars = row[0].split("")
        for (let char of chars) {
            if (row[1].includes(char)) return char
        }
    }
    findValueOfDuplicate(char: string | undefined) {
        if (char === undefined) return 0
        return alphabet.indexOf(char) + 1
    }
    get duplicatesValues() {
        return this.input.map(row => this.findValueOfDuplicate(this.findDuplicate(row)))
    }
    get totalValueOfDuplicates() {
        return this.duplicatesValues.reduce((acc,curr) => acc+curr,0)
    }
}
const part1 = new Part1()
console.log(part1.totalValueOfDuplicates)
// 8109
