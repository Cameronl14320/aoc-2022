import * as fs from 'fs';

const data = fs.readFileSync('./day-12/data.txt', "ascii");
const lines = data.split('\n');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const heightMap = new Map<string, number>();
letters.forEach((height, index) => {
    heightMap.set(height, index);
});

type Node = {
    location: [number, number];
    height: number;
    previous: Node;
    next: Node;
}

const terrainExample: Node[][] = [];
var start: [number, number];
var end: [number, number];
lines.forEach((row, rowIndex) => {
    const split = row.split('');
    const terrainRow = [];
    split.forEach((col, colIndex) => {
        if (col === 'S') {
            start = [rowIndex, colIndex];
            terrainRow.push({
                location: [rowIndex, colIndex],
                height: heightMap.get('a'),
                previous: null
            });
        } else if (col === 'E') {
            end = [rowIndex, colIndex];
            terrainRow.push({
                location: [rowIndex, colIndex],
                height: heightMap.get('z'),
                previous: null
            });
        } else {
            terrainRow.push({
                location: [rowIndex, colIndex],
                height: heightMap.get(col),
                previous: null
            });          
        }
    });

    terrainExample.push(terrainRow);
});

function getNeighborsFrom(node: Node, terrain: Node[][]): [number, number][] {
    var neighbors: [number,number][] = [];

    var aboveRow: Node;
    if (node.location[0] - 1 >= 0) {
        aboveRow = terrain[node.location[0] - 1][node.location[1]];
    }
    var belowRow: Node;
    if (node.location[0] + 1 < terrain.length) {
        belowRow = terrain[node.location[0] + 1][node.location[1]] ?? null;
    }
    var leftRow: Node;
    if (node.location[1] >= 0) {
        leftRow = terrain[node.location[0]][node.location[1] - 1] ?? null;
    }
    var rightRow: Node;
    if (node.location[1] < terrain[0].length) {
        rightRow = terrain[node.location[0]][node.location[1] + 1] ?? null;;
    }

    [aboveRow, belowRow, leftRow, rightRow].forEach(neighbor => {
        if (!!neighbor && neighbor.height <= node.height + 1) {
            neighbors.push(neighbor.location);
        }
    });

    return neighbors;
}

function getShortestPath(startLocations: [number, number][]): number[] {
    var stepCounters: number[] = [];

    startLocations.forEach(startLocation => {
        const terrain: Node[][] = [];
        terrainExample.forEach(row => {
            const terrainRow: Node[] = [];
            row.forEach(col => {
                terrainRow.push({
                    height: col.height,
                    location: col.location,
                    next: null,
                    previous: null
                });
            });
            terrain.push(terrainRow);
        });
        
        var current: [number, number] = [startLocation[0], startLocation[1]];
        var neighbors: [number, number][] = [];
        const visited: Set<Node> = new Set();
        visited.add(terrain[start[0]][start[1]]);
        if (getNeighborsFrom(terrain[current[0]][current[1]], terrain).length > 0) {
            while(!(current[0] === end[0] && current[1] === end[1])) {
                const currentNeighbors = getNeighborsFrom(terrain[current[0]][current[1]], terrain);
                currentNeighbors.forEach(neighbor => {
                    if (!visited.has(terrain[neighbor[0]][neighbor[1]]) && !neighbors.some(loc => loc[0] === neighbor[0] && loc[1] === neighbor[1])) {
                        terrain[neighbor[0]][neighbor[1]].previous = terrain[current[0]][current[1]];
                        neighbors.push(neighbor);
                    }
                });
            
                if (neighbors.length > 0) {
                    const nextNode = terrain[neighbors[0][0]][neighbors[0][1]];
                    terrain[current[0]][current[1]].next = nextNode;
                    neighbors = neighbors.slice(1);
                    visited.add(nextNode);
                    current = [nextNode.location[0], nextNode.location[1]];
                
                    if (current[0] === end[0] && current[1] === end[1]) {
                        console.log(`Found path from [${startLocation[0]}, ${startLocation[1]}] to [${end[0]}, ${end[1]}]`);
                        break;
                    }
                } else {
                    break;
                }
            }
            
            var stepCounter = 0;
            var back = terrain[end[0]][end[1]];
            if (!!back.previous) {
                while(back != terrain[startLocation[0]][startLocation[1]]) {
                    back = back.previous
                    stepCounter += 1;
                }
        
                stepCounters.push(stepCounter);
            }
        }
    });

    return stepCounters;
}

// Part 1
const part1 = getShortestPath([start]);
console.log(part1);

// Part 2
const startLocations: [number, number][] = [];
terrainExample.forEach(row => {
    row.forEach(col => {
        if (col.height === heightMap.get('a')) {
            startLocations.push([col.location[0], col.location[1]]);
        }
    })
});
// console.log(startLocations.length);
const part2 = getShortestPath(startLocations).filter(path => path != 0);
part2.sort();
console.log(part2);