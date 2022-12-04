import * as fs from 'fs';

var data = fs.readFileSync("./day-1/data.txt", "ascii");

var splitData = data.split("\n");

var organised: any[] = [];
var randomSplit: number[] = [];

splitData.forEach((value: string) => {
    if (value != '') {
        var parsed = parseInt(value);
        randomSplit.push(parsed);
    } else {
        organised.push(randomSplit);
        randomSplit = [];
    }
});

var totals: number[] = [];

organised.forEach(elf => {
    var currentTotal = 0;
    elf.forEach((cookie: number) => {
        currentTotal += cookie;
    })
    totals.push(currentTotal);
});

var sorted = totals.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
});

console.log(sorted[0] + sorted[1] + sorted[2]);
