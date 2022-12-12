import { raw } from "./raw"

interface Instruction {
    amount: number
    source: number
    destination: number
}

class Solution {
    stack = this.initialStacks
    get initialStacks() {
        const stackHeight = 8
        const numberOfStacks = 9
        const charsInLine = numberOfStacks * 4
        const stacks: string[] = []
        for (let stackCount = 0; stackCount < numberOfStacks; stackCount++) {
            let stack = ""
            for (let itemCount = 0; itemCount < stackHeight; itemCount++) {
                const pos = 1 + itemCount * charsInLine + stackCount * 4
                const cargo = raw.slice(pos, pos + 1)
                stack = stack + cargo
            }
            stacks.push(stack.replace(/\s/g, ""))
        }
        return stacks
        /** [
            'FTNZMGHJ', 'JWV',
            'HTBJLVG',  'LVDCNJPB',
            'GRPMSWF',  'MVNBFCHG',
            'RMGHD',    'DZVMNH',
            'HFNG'
            ] */
    }
    get instructions(): Instruction[] {
        return raw
            .split("\n")
            .slice(10)
            .map((row) => {
                const matches = row.matchAll(/\d+/g)
                return {
                    amount: parseInt(matches.next().value[0]),
                    source: parseInt(matches.next().value[0]),
                    destination: parseInt(matches.next().value[0]),
                }
            })
    }
    get finalArrangement9000() {
        this.fullyRearrange9000(this.instructions)
        const result = this.stack
        return this.stack
    }
    get finalArrangement9001() {
        this.fullyRearrange9001(this.instructions)
        const result = this.stack
        return this.stack
    }
    get answerPart1() {
        return this.finalArrangement9000.map((row) => row.slice(0, 1)).join("")
    }
    get answerPart2() {
        return this.finalArrangement9001.map((row) => row.slice(0, 1)).join("")
    }
    rearrange9000(instruction: Instruction) {
        const { amount, source, destination } = instruction
        for (let i = 0; i < amount; i++) {
            const cargo = this.stack[source - 1].slice(0, 1)
            this.stack[source - 1] = this.stack[source - 1].slice(1)
            this.stack[destination - 1] = cargo + this.stack[destination - 1]
        }
    }
    rearrange9001(instruction: Instruction) {
        const { amount, source, destination } = instruction
        const cargo = this.stack[source - 1].slice(0, amount)
        this.stack[source - 1] = this.stack[source - 1].slice(amount)
        this.stack[destination - 1] = cargo + this.stack[destination - 1]
    }
    fullyRearrange9000(instructions: Instruction[]) {
        for (let instruction of instructions) {
            this.rearrange9000(instruction)
        }
    }
    fullyRearrange9001(instructions: Instruction[]) {
        for (let instruction of instructions) {
            this.rearrange9001(instruction)
        }
    }
}

const solution = new Solution()

// console.log(solution.answerPart1)
// TDCHVHJTG

// console.log(solution.answerPart2)
// NGCMPJLHV
