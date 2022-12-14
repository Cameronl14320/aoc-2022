import * as fs from 'fs';

const data = fs.readFileSync('./day-13/data.txt', "ascii");
const lines = data.split('\n\n');
const pairsData = lines.map(line => line.split('\n'));

type Pair = {
    left: any[];
    right: any[];
}

const pairs: Pair[] = [];
pairsData.forEach(pair => {
    pairs.push({
        left: JSON.parse(pair[0]),
        right: JSON.parse(pair[1])
    });
});

function isOrdered(left: any[], right: any[]): boolean {

    return true;
}

var sum = 0;
pairs.forEach((pair, index) => {
    if (isOrdered(pair.left, pair.right)) {
        console.log(index + 1);
        sum += index + 1;
    }
});

console.log(sum);