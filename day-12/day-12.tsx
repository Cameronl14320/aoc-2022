import * as fs from 'fs';

const data = fs.readFileSync('./day-12/data.txt', "ascii");
const lines = data.split('\r\n');

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const heightMap = new Map<string, number>();
letters.forEach((height, index) => {
    heightMap.set(height, index);
});

type Node = {
    x: number,
    y: number
    weight: number
    previous: Node
}

const terrain: number[][] = [];
var start: [number, number];
var end: [number, number];
lines.forEach((row, rowIndex) => {
    const split = row.split('');
    const terrainRow = [];
    split.forEach((col, colIndex) => {
        if (col === 'S') {
            start = [rowIndex, colIndex];
            terrainRow.push(heightMap.get('a'));
        } else if (col === 'E') {
            end = [rowIndex, colIndex];
            terrainRow.push(heightMap.get('z'));
        } else {
            terrainRow.push(heightMap.get(col));            
        }
    });

    terrain.push(terrainRow);
});

var current: [number, number] = [start[0], start[1]];
while(current[0] != end[0] && current[1] != end[1]) {

}
