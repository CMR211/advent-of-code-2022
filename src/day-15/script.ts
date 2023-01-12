import { example } from "./example"
import { input } from "./input"

type TCoord = { x: number; y: number }

class Sensor {
    sensor: TCoord
    beacon: TCoord
    distance: number
    constructor(instruction: string) {
        const [sensor, beacon] = instruction.split(": ")
        this.sensor = {
            x: parseInt(sensor.match(/x=-?\d+/g)![0].slice(2)),
            y: parseInt(sensor.match(/y=-?\d+/g)![0].slice(2)),
        }
        this.beacon = {
            x: parseInt(beacon.match(/x=-?\d+/g)![0].slice(2)),
            y: parseInt(beacon.match(/y=-?\d+/g)![0].slice(2)),
        }
        this.distance = distance(this.beacon, this.sensor)
    }
}

function distance(a: TCoord, b: TCoord) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

const sensors = example.split("\n").map((line) => new Sensor(line))

function part1(y: number) {
    const constraints = {
        xMax: 2,
        xMin: 1,
        yMax: 2,
        yMin: 1,
    }
    let positions = 0
    const beacons: number[] = []
    sensors.forEach((sensor) => {
        if (sensor.beacon.y === y) {
            if (!beacons.includes(sensor.beacon.x)) beacons.push(sensor.beacon.x)
        }
        const sensorXMax = sensor.sensor.x + sensor.distance
        if (constraints.xMax < sensorXMax) constraints.xMax = sensorXMax
        const sensorXMin = sensor.sensor.x - sensor.distance
        if (constraints.xMin > sensorXMin) constraints.xMin = sensorXMin
        const sensorYMax = sensor.sensor.y + sensor.distance
        if (constraints.yMax < sensorYMax) constraints.yMax = sensorYMax
        const sensorYMin = sensor.sensor.y - sensor.distance
        if (constraints.yMin > sensorYMin) constraints.yMin = sensorYMin
    })
    positions -= beacons.length
    for (let x = constraints.xMin; x <= constraints.xMax; x++) {
        let outOfRange = true
        const cell = { x, y }
        sensors.forEach((sensor) => {
            if (distance(cell, sensor.sensor) <= sensor.distance) outOfRange = false
        })
        if (!outOfRange) positions++
    }
    return positions
}

function part2() {
    const LIMIT = 20 /* 4_000_000 */
    let outOfRange = true
    for (let x = 0; x <= LIMIT; x++) {
        let outOfRange = true
        let searchY = -1
        for (let y = 0; y <= LIMIT; y++) {
            sensors.forEach((sensor) => {
                searchY = y
                if (distance({ x, y }, sensor.sensor) <= sensor.distance) outOfRange = false
            })
        }
        if (outOfRange) {
            return { x, y: searchY }
        }
    }
}

console.log(part2())
