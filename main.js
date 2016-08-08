//Key functions
var key = (function() {
    return {
        isString: function(a) {
            return isNaN(a);
        },

        random: function(a, b) {
            b = b || 0;
            var c = a - b;
            return (Math.random() * c) + b;
        },

        round: function(a, b, c) {
            b = b || "nearest";
            c = c || 0;
            if (b == "down") {
                return Math.floor(a * Math.pow(10, c)) / Math.pow(10, c);
            } else if (b == "up") {
                return Math.ceil(a * Math.pow(10, c)) / Math.pow(10, c);
            } else {
                return Math.round(a * Math.pow(10, c)) / Math.pow(10, c);
            }
        },

        approxSqrt: function(a) {
            var b = a;
            var c = 1;
            while (true) {
                b = a - (c * c);
                if (b === 0) {
                    break;
                } else if (b < 0) {
                    c--;
                    break;
                } else {
                    c++;
                }
            }
            b = a - (c * c);
            return c + (b / (c * 2));
        },

        sortAscending: function(a, b) {
            return a - b;
            //array.sort(key.sortAscending);
        },
        sortDescending: function(a, b) {
            return b - a;
        },

        isPrime: function(a) {
            if (a == 2) {
                return "true";
            } else if (a > 2) {
                for (var i = 2; i <= Math.sqrt(a); i++) {
                    if ((a % i) === 0) {
                        return "false";
                    }
                }
                return "true";
            } else {
                return "false";
            }
        },

        //jQuery Needed
        removeDupes: function(a) {
            var b = [];
            $.each(a, function(i, c) {
                if ($.inArray(c, b) == -1) b.push(c);
            });
            return b;
        },
        countDupes: function(a) {
            //http://jsfiddle.net/simevidas/bnACW/
            var b = [];
            for (var i = 0; i < a.length; i++) {
                b.push(a[i]);
            }
            var c = [],
                d = [],
                prev;
            b.sort(key.sortAscending);
            for (var i = 0; i < b.length; i++) {
                if (b[i] !== prev) {
                    c.push(b[i]);
                    d.push(1);
                } else {
                    d[d.length - 1] ++;
                }
                prev = b[i];
            }
            return [c, d];
            //c = actual values, d = dupe count
        }
    };
})();

var reload = function() {
    location.reload();
};

var getPrimes = function() {
    var min = Math.abs(document.getElementById('primesMin').value) || key.random(Math.PI * 10);
    var max = Math.abs(document.getElementById('primesMax').value) || key.random(Math.PI * 100, min);
    var minNmax = [min, max];
    minNmax.sort(key.sortAscending);

    var primes = [];
    for (var i = key.round(minNmax[0], "up"); i <= key.round(minNmax[1], "down"); i++) {
        if (i >= 2) {
            if (key.isPrime(i) == "true") {
                primes.push(i);
            }
        }
    }

    var output;
    for (var i = 0; i < primes.length; i++) {
        if (i > 0) {
            output = output + ", " + primes[i];
        } else {
            output = primes[i].toString();
        }
    }

    document.getElementById('primes').innerHTML = output;
    console.log("Min: " + min);
    console.log("Max: " + max);
    console.log("Length: " + primes.length);
};

var convertWeek = function() {
    
};