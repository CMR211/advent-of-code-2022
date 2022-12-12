import { raw } from "./raw"

class Disc {
    tree = {
        type: "dir",
        children: {},
    }
    currentDirectory = ""
    get commands() {
        return raw.split("$").map((row) => row.split("\n").slice(0, -1))
    }
    terminal(commandGroup: string[]) {
        const command = commandGroup[0]
        if (command.slice(1, 3) === "cd") this.changeDirectory(command)
        if (command.slice(1, 3) === "ls") this.listFiles(commandGroup)
    }
    changeDirectory(command: string) {
        const path = command.slice(4)
        if (path === "..") this.currentDirectory = this.currentDirectory.split("/").slice(0, -1).join("/")
        else if (path === "/") this.currentDirectory = "/"
        else this.currentDirectory += path + "/"
        console.log("currentDirectory :", this.currentDirectory)
    }
    listFiles(commandGroup: string[]) {
        const files = commandGroup.slice(1)
        files.forEach((string) => {
            const [size, name] = string.split(" ")
            if (size === "dir") {
                const folder = {
                    type: "dir",
                    children: {},
                }
                setProperty(this.tree, this.currentDirectory + "/" + name, folder)
            } else {
                const file = {
                    type: "file",
                    size,
                }
                setProperty(this.tree, this.currentDirectory + "/" + name, file)
            }
        })
        console.log(this.tree)
    }
}

function accessProperty(object: any, path: string) {
    const pathArray: string[] = path.split("/")
    while (pathArray.length) {
        // @ts-ignore
        object = object[pathArray.shift()]
    }
    return object
}

function setProperty(object: any, path: string, property: any) {
    const pathArray: string[] = path.split("/")
    while (pathArray.length) {
        const currPath = pathArray.shift()
        if (currPath === "" || currPath === undefined) continue
        object = object[currPath]
    }
    return (object[pathArray[0]] = property)
}

const disc = new Disc()
disc.listFiles([" ls", "dir abc", "52 cdd"])
