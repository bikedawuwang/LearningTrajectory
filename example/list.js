var data = [
    {
        "id": 111,
        "stationName": "故仙乡站"
    },
    {
        "id": 222,
        "stationName": "景和镇站"
    },
    {
        "id": 333,
        "stationName": "回龙观站"
    },
    {
        "id": 444,
        "stationName": "回龙观站"
    },
    {
        "id": 555,
        "stationName": "行别营乡站"
    },
    {
        "id": 666,
        "stationName": "景和镇站"
    },
    {
        "id": 777,
        "stationName": "沙河桥站"
    },
    {
        "id": 888,
        "stationName": "回龙观站"
    },
    {
        "id": 999,
        "stationName": "回龙观站"
    },
    {
        "id": 101010,
        "stationName": "景和镇站"
    }
]

function arrCheck(arr) {
    var newArr = arr;
    for (var i = 0; i < arr.length; i++) {
        var temp = arr[i];
        let count = -1;
        for (var j = 0; j < arr.length; j++) {
            if (arr[j].stationName == temp.stationName) {
                count++;
            }
        }
        if (count === 0) {
            newArr[i].stationName = `${arr[i].stationName}`
        }
        else {
            newArr[i].stationName = `${count}${arr[i].stationName}`;
        }
    }
    return newArr;
}



let obj = {}
let newArr = [];
data.forEach(item => {
    let newItem = item;
    if (!obj[item] && obj[item] != 0) {
        obj[item] = 0;
    }
    else {
        obj[item] += 1;
        if (obj[item] > 0) {
            newItem = `${obj[item]}${item.stationName}`
        }

    }
    newArr.push(newItem)
})
console.log(newArr, obj)

// let a = arrCheck(data);
// console.log("a", a)
