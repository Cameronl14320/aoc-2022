import * as fs from 'fs';

const data = fs.readFileSync('./day-4/data.txt', "ascii");

const pairs = data.split('\n');

type Range = {
    lower: number,
    upper: number
}

type Pair = {
    first: Range,
    second: Range
}

var typedPairs: Pair[] = [];
pairs.forEach(pair => {
    const splitPair = pair.split(',');
    const firstRange = splitPair[0].split('-');
    const secondRange = splitPair[1].split('-');
    
    typedPairs.push({
        first: {
            lower: parseInt(firstRange[0]),
            upper: parseInt(firstRange[1])
        },
        second: {
            lower: parseInt(secondRange[0]),
            upper: parseInt(secondRange[1])
        }
    });
});

var completeOverlap: Pair[] = [];
typedPairs.forEach(pair => {
    if (pair.first.lower <= pair.second.lower && pair.first.upper >= pair.second.upper) {
        completeOverlap.push(pair);
    } else if (pair.second.lower <= pair.first.lower && pair.second.upper >= pair.first.upper) {
        completeOverlap.push(pair);
    }
});

console.log(completeOverlap.length);

var partialOverlap: Pair[] = [];
typedPairs.forEach(pair => {
    if (pair.first.lower <= pair.second.lower && pair.first.upper >= pair.second.lower) {
        partialOverlap.push(pair);
    } else if (pair.second.lower <= pair.first.lower && pair.second.upper >= pair.first.lower) {
        partialOverlap.push(pair);
    }
});

console.log(partialOverlap.length);