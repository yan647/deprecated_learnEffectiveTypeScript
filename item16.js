var xs = [1, 2, 3];
var x0 = xs[0];
var x1 = xs['1'];
function get(array, k) {
    return array[k];
}
console.log(get(xs, '1'));
for (var _i = 0, xs_1 = xs; _i < xs_1.length; _i++) {
    var x = xs_1[_i];
    console.log(typeof x); //number
}
xs.forEach(function (x, i) {
    console.log('foreach-x', typeof x); //number
    console.log('foreach-i', typeof i); //number
});
xs.map(function (x, i) {
    console.log('map-x', typeof x); //number
    console.log('map-i', typeof i); //number
});
