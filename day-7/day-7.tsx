import * as fs from 'fs';

const data = fs.readFileSync('./day-7/data.txt', "ascii");
const lines = data.split('\n');
const splitLines: string[][] = [];
lines.forEach(line => {
    splitLines.push(line.split(' '));
});

type File = {
    name: string,
    size: number
}

class Directory {
    public files: File[]
    public directories: Map<string, Directory>
    public parent: Directory;

    public constructor(parent: Directory) {
        this.parent = parent;
        this.files = [];
        this.directories = new Map<string, Directory>();
    }

    public getDirectory(subpath: string) {
        if (!this.directories.has(subpath)) {
            this.directories.set(subpath, new Directory(this));
        }

        return this.directories.get(subpath);
    }

    public addFile(file: File) {
        this.files.push(file);
    }

    public getTotalSize() {
        var totalSize = 0;
        this.files.forEach(file => {
            totalSize += file.size;
        });

        this.directories.forEach(directory => {
            totalSize += directory.getTotalSize();
        });

        return totalSize;
    }

    public getAllDirectories() {
        var allDirectories: Directory[] = [];

        this.directories.forEach(directory => {
            allDirectories.push(directory);
            allDirectories = allDirectories.concat(directory.getAllDirectories());
        });

        return allDirectories;
    }
}

var rootDirectory: Directory = new Directory(null);
var currentDirectory: Directory = rootDirectory;

splitLines.forEach(value => {
    if (value[0] === '$') {
        if (value[1] === 'cd') {
            if (value[2] === '/') {
                currentDirectory = rootDirectory;
            } else if (value[2] === '..') {
                currentDirectory = currentDirectory.parent;
            } else {
                currentDirectory = currentDirectory.getDirectory(value[2] + '/');
            }
        }
    } else {
        if (value[0] != 'dir') {
            currentDirectory.addFile({
                name: value[1],
                size: parseInt(value[0])
            });
        }
    }
});

const smallFolders = rootDirectory.getAllDirectories()
    .filter(directory => directory.getTotalSize() <= 100000)
    .reduce((total, directory) => total + directory.getTotalSize(), 0);

console.log("Smaller folders: " + smallFolders);

const neededSpace = 30000000 - (70000000 - rootDirectory.getTotalSize());
const possibleDirectories = rootDirectory.getAllDirectories().filter(directory => directory.getTotalSize() >= neededSpace);
const sortedDirectories = possibleDirectories.sort((a: Directory, b: Directory) => {
    var firstSize = a.getTotalSize();
    var secondSize = b.getTotalSize();
    if (firstSize < secondSize) return -1;
    if (firstSize > secondSize) return 1;
    return 0;
});

console.log("Folder to delete: " + sortedDirectories[0].getTotalSize());