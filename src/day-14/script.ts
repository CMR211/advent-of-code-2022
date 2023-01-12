import { exInp } from "./example"
import { fullInp } from "./input"

type TCoords = {
    x: number
    y: number
}
type TDirection = "left" | "right" | "down" | "down left" | "down right"

class Input {
    input: string
    constructor(_input: string) {
        this.input = _input
    }
    get lines() {
        const lines: string[][] = []
        const rows = this.input.split("\n")
        const markers = rows.map((row) => row.split(" -> "))
        for (let row of markers) {
            row.forEach((v, index, array) => {
                if (index === 0) return
                else lines.push([array[index - 1], array[index]])
            })
        }
        return lines.map((l) => l.map((c) => stringToCoords(c)))
    }
}

class Cavern {
    lowestX: number
    highestX: number
    voidLevel: number
    map: Record<string, string> = {}
    sand: TCoords = { x: 500, y: 0 }
    part: 1 | 2
    delta = {
        left: [-1, 0],
        right: [1, 0],
        down: [0, 1],
        "down left": [-1, 1],
        "down right": [1, 1],
    }
    constructor(_type: "example" | "full", _part: 1 | 2) {
        let temp: TCoords[][]
        this.part = _part
        this.lowestX = _type === "example" ? 494 : 490
        this.highestX = _type === "example" ? 503 : 570
        temp = _type === "example" ? new Input(exInp).lines : new Input(fullInp).lines
        temp.forEach((line) => {
            const xStart = Math.min(line[0].x, line[1].x)
            const xEnd = Math.max(line[0].x, line[1].x)
            const yStart = Math.min(line[0].y, line[1].y)
            const yEnd = Math.max(line[0].y, line[1].y)
            for (let i = xStart; i <= xEnd; i++) {
                for (let j = yStart; j <= yEnd; j++) {
                    this.map[`${i},${j}`] = "boulder"
                }
            }
        })
        this.voidLevel = Math.max(...Object.keys(this.map).map(key=>stringToCoords(key).y)) + 2
        if (this.part === 2) {
            for (let x = this.lowestX - this.voidLevel - 20; x<= this.highestX + this.voidLevel + 20;x++) {
                this.map[coordsToString({x,y:this.voidLevel})] = "boulder"
            }
        }
    }
    sandMovement() {
        while (true) {
            if (this.part === 1 ? this.isSandInAbyss() : this.isSandOutputBlocked()) {
                this.countSandInCavern()
                // console.log(this.mapVisual)
                break
            }
            if (this.isNearby("void", "down")) {
                this.moveSand("down")
                continue
            }
            if (this.isNearby("void", "down left")) {
                this.moveSand("down left")
                continue
            }
            if (this.isNearby("void", "down right")) {
                this.moveSand("down right")
                continue
            }
            this.addSandToCavern()
            this.resetSand()
            continue
        }
    }

    countSandInCavern() {
        let count = 0
        Object.values(this.map).forEach((v) => (v === "sand" ? count++ : null))
        console.log(`>>> Sand in cavern: ${count}.`)
    }

    isSandInAbyss() {
        return this.sand.y > this.voidLevel
    }

    isSandOutputBlocked() {
        return this.map[coordsToString({x:500,y:0})] === "sand"
    }

    isNearby(entity: "sand" | "boulder" | "void", direction: TDirection) {
        const checkLoc = { x: this.sand.x + this.delta[direction][0], y: this.sand.y + this.delta[direction][1] }
        if (entity === "void") {
            return this.map[coordsToString(checkLoc)] !== "sand" && this.map[coordsToString(checkLoc)] !== "boulder"
        } else return this.map[coordsToString(checkLoc)] === entity
    }

    moveSand(direction: TDirection) {
        this.sand.x += this.delta[direction][0]
        this.sand.y += this.delta[direction][1]
    }

    addSandToCavern() {
        this.map[coordsToString(this.sand)] = "sand"
    }

    resetSand() {
        this.sand = { x: 500, y: 0 }
    }
    get mapVisual() {
        let map = ""
        for (let y = 0; y <= this.voidLevel; y++) {
            for (let x = this.lowestX-200; x <= this.highestX+200; x++) {
                const coord: string = coordsToString({ x, y })
                map = map + visualOf(this.map[coord])
            }
            map = map + "\n"
        }
        return map
        function visualOf(entity: string) {
            if (entity === "boulder") return "#"
            if (entity === "sand") return "o"
            else return " "
        }
    }
}

function stringToCoords(stringCoord: string) {
    const split = stringCoord.split(",")
    return {
        x: parseInt(split[0]),
        y: parseInt(split[1]),
    }
}

function coordsToString(coord: TCoords) {
    return `${coord.x},${coord.y}`
}

const cavern = new Cavern("full", 2)
// console.log(cavern.map)
cavern.sandMovement()
