import * as fs from 'fs';

const data = fs.readFileSync('./day-3/data.txt', "ascii");

const rucksacks = data.split('\n');

type Rucksack = {
    firstCompartment: string[],
    secondCompartment: string[]
}

const typedRucksacks: Rucksack[] = [];
rucksacks.forEach(rucksack => {
    const half = rucksack.length/2;

    var firstCompartment = rucksack.slice(0, half);
    var secondCompartment = rucksack.slice(half);

    var typedRucksack = {
        firstCompartment: firstCompartment.split(''),
        secondCompartment: secondCompartment.split('')
    }

    typedRucksacks.push(typedRucksack);
});

const duplicates: string[] = [];
typedRucksacks.forEach(rucksack => {
    var dupes = rucksack.firstCompartment
        .filter(item => rucksack.secondCompartment.includes(item));

    duplicates.push(dupes[0]);
});

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCaseLetters = letters.map(letter => letter.toUpperCase());

const combined = letters.concat(upperCaseLetters);

var pointsCalculator = 1;

const priorityMap: Map<string, number> = new Map<string, number>();
combined.forEach(letter => {
    priorityMap.set(letter, pointsCalculator);
    pointsCalculator += 1;
});

var priorityTotal = 0;
duplicates.forEach(letter => {
    priorityTotal += priorityMap.get(letter);
});

console.log(priorityTotal);

type RucksackGroup = {
    first: string[],
    second: string[],
    third: string[]
};

var groupedRucksacks: RucksackGroup[] = [];

var rucksacksClone = rucksacks.slice();
while(rucksacksClone.length >= 3) {
    var group = rucksacksClone.slice(0, 3);
    rucksacksClone = rucksacksClone.slice(3);

    if (group.length >= 3) {
        groupedRucksacks.push({
            first: group[0].split(''),
            second: group[1].split(''),
            third: group[2].split(''),
        });
    }
}

var groupedDuplicates: string[] = [];
groupedRucksacks.forEach(group => {
    const dupe = group.first.filter(letter => group.second.includes(letter) && group.third.includes(letter));

    groupedDuplicates.push(dupe[0]);
})

var groupedPriorityTotal = 0;
groupedDuplicates.forEach(letter => {
    groupedPriorityTotal += priorityMap.get(letter);
});

console.log(groupedPriorityTotal);