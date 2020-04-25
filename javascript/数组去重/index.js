var a = [1, 1, 2, 2, 3, '1', 2, 1000, NaN, 1000, NaN];

var b = a.filter((item, index, a) => {
    if (a.indexOf(item) === index) {
        return item
    }
})
