import { raw } from "./raw"

class Solution {
    get findBuffer() {
        return this.detect(4)
    }
    get findMessage() {
        return this.detect(14)
    }
    detect(length:number) {
        for (let index = length; index < raw.length - 1; index++) {
            const buffer = raw.slice(index - length, index)
            let isUnique = true
            for (let i = 0; i < length; i++) {
                const char = buffer[i]
                const regex = new RegExp(`${char}`, "g")
                if (Array.from(buffer.matchAll(regex)).length > 1) isUnique = false
            }
            if (!isUnique) continue
            return index
        }
    }
}

const solution = new Solution()

console.log(solution.findBuffer)
// 1912

console.log(solution.findMessage)

