import * as fs from 'fs';

const data = fs.readFileSync('./day-11/data.txt', "ascii");
const monkeysData = data.split('\n\n');

enum Operation {
    add,
    sub,
    mult,
    div,
    notSpecified
}

type Function = {
    operation: Operation;
    modifier: number;
    targetSelf: boolean;
}

type Action = {
    target: number
}

type Item = {
    worryLevel: number
}

type Monkey = {
    items: Item[],
    func: Function,
    condition: Function,
    trueAction: Action,
    falseAction: Action,
    inspectCount: number
}

const monkeys: Monkey[] = [];
monkeysData.forEach(monkey => {
    const split = monkey.split('\n');
    const items: Item[] = split[1]
        .split(': ')
        .slice(1)
        .reduce((current, str) => current + str, "")
        .split(', ')
        .map(item => {return {worryLevel: parseInt(item)}});

    const operationData = split[2]
        .split(': ')
        .slice(1)
        .reduce((current, str) => current + str, "")
        .split(' ');

    var operation: Operation;
    switch (operationData[3]) {
        case '*':
            operation = Operation.mult;
            break;
        case '+':
            operation = Operation.add;
            break;
        case '-':
            operation = Operation.sub;
            break;
        case '/':
            operation = Operation.div;
            break;
        default:
            operation = Operation.notSpecified;
            break;
    }
    
    var func: Function = {
        operation: operation,
        modifier: operationData[4] === 'old' ? 0 : parseInt(operationData[4]),
        targetSelf: operationData[4] === 'old' ? true : false
    }

    var testConditionData = split[3]
        .split(': ')
        .slice(1)
        .reduce((current, str) => current + str, "")
        .split(' ');

    var testType: Operation;
    switch (testConditionData[0]) {
        case 'divisible':
            testType = Operation.div;
            break;
        default:
            testType = Operation.notSpecified;
            break;
    }

    var condition: Function = {
        operation: testType,
        modifier: testConditionData[2] === 'old' ? 0 : parseInt(testConditionData[2]),
        targetSelf: testConditionData[2] === 'old' ? true : false
    }

    var trueActionData = split[4]
        .split(': ')
        .slice(1)
        .reduce((current, str) => current + str, "")
        .split(' ');

    var falseActionData = split[5]
        .split(': ')
        .slice(1)
        .reduce((current, str) => current + str, "")
        .split(' ');

    var trueAction: Action = {
        target: parseInt(trueActionData[3])
    }
    var falseAction: Action = {
        target: parseInt(falseActionData[3])
    }

    monkeys.push({
        items: items,
        func: func,
        condition: condition,
        trueAction: trueAction,
        falseAction: falseAction,
        inspectCount: 0
    });
});

monkeys.forEach((monkey, index) => {
    var listedString = monkey.items.reduce((current, str) => current + str.worryLevel + ', ', "");
    console.log(`Monkey ${index}: ${listedString}`);
});
console.log('------------------------------------------------------------------------------');

var modulo = monkeys.reduce((current, monkey) => current * monkey.condition.modifier, 1);
const rounds = 10000;
for(let i = 0; i < rounds; i++) {
    monkeys.forEach((monkey) => {
        monkey.items.forEach(item => {
            monkey.inspectCount += 1;
            var newVal: number;
            switch (monkey.func.operation) {
                case Operation.add:
                    newVal = monkey.func.targetSelf ? item.worryLevel + item.worryLevel : item.worryLevel + monkey.func.modifier;
                    break;
                case Operation.sub:
                    newVal = monkey.func.targetSelf ? item.worryLevel - item.worryLevel : item.worryLevel - monkey.func.modifier;
                    break;
                case Operation.mult:
                    newVal = monkey.func.targetSelf ? item.worryLevel * item.worryLevel : item.worryLevel * monkey.func.modifier;
                    break;
                case Operation.div:
                    newVal = monkey.func.targetSelf ? item.worryLevel / item.worryLevel : item.worryLevel / monkey.func.modifier;
                    break;
                case Operation.notSpecified:
                    break;
                default:
                    break;
            }
            const val = 1;
            newVal = newVal % modulo;
            
            var conditionMet: boolean;
            switch (monkey.condition.operation) {
                case Operation.div:
                    conditionMet = monkey.condition.targetSelf ? (newVal) % item.worryLevel === 0 : (newVal) % monkey.condition.modifier === 0;
                    break;
                default:
                    break;
            }

            if (conditionMet) {
                monkeys[monkey.trueAction.target].items.push({worryLevel: newVal});
            } else {
                monkeys[monkey.falseAction.target].items.push({worryLevel: newVal});
            }
        });
        monkey.items = [];
    });

    // monkeys.forEach((monkey, index) => {
    //     var listedString = monkey.items.reduce((current, str) => current + str.worryLevel + ', ', "");
    //     console.log(`Monkey ${index} (${monkey.inspectCount}): ${listedString}`);
    // });
    // console.log('------------------------------------------------------------------------------');
}


monkeys.forEach((monkey, index) => {
    var listedString = monkey.items.reduce((current, str) => current + str.worryLevel + ', ', "");
    console.log(`Monkey ${index} (${monkey.inspectCount}): ${listedString}`);
});
console.log('------------------------------------------------------------------------------');