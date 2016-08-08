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
    var weekToConvert = document.getElementById('convertWeek').value || key.random(366 / 7);
    var week = key.round(weekToConvert, "down");

    var dayToConvert = (weekToConvert - week) * 7;
    var day = key.round(dayToConvert, "down");

    var hourToConvert = (dayToConvert - day) * 24;
    var hour = key.round(hourToConvert, "down");

    var minuteToConvert = (hourToConvert - hour) * 60;
    var minute = key.round(minuteToConvert, "down");

    var second = key.round((minuteToConvert - minute) * 60, "nearest", 2);

    if (week == 1) {
        week = week + " week, ";
    } else {
        week = week + " weeks, ";
    }
    if (day == 1) {
        day = day + " day, ";
    } else {
        day = day + " days, ";
    }
    if (hour == 1) {
        hour = hour + " hour, ";
    } else {
        hour = hour + " hours, ";
    }
    if (minute == 1) {
        minute = minute + " minute and ";
    } else {
        minute = minute + " minutes and ";
    }
    if (second == 1) {
        second = second + " second.";
    } else {
        second = second + " seconds.";
    }

    var converted = [week, day, hour, minute, second];
    var output = "";
    for (var i = 0; i < converted.length; i++) {
        output = output + converted[i];
    }
    document.getElementById('convertedWeek').innerHTML = output;
};

var timeUntil = function() {
    //http://ditio.net/2010/05/02/javascript-date-difference-calculation/

    var inWeeks = function(a, b) {
        var c = a.getTime();
        var d = b.getTime();
        return (c - d) / (7 * 24 * 60 * 60 * 1000);
    };
    var convertRound = function(a) {
        if (a > 0) {
            return key.round(a, "down");
        } else if (a < 0) {
            return key.round(a, "up");
        } else {
            return a;
        }
    };
    var isValidDate = function(a) {
        if (Object.prototype.toString.call(a) !== "[object Date]") {
            return false;
        }
        return !isNaN(a.getTime());
    };

    var futureDate = new Date();
    var currentDate = new Date();

    while (!isValidDate(futureDate) || (futureDate.getTime() <= currentDate.getTime())) {
        var date = document.getElementById('timeUntilDate').value;

        var selectDate;
        if (!isValidDate(futureDate) || (futureDate.getTime() <= currentDate.getTime())) {
            selectDate = "random";
        } else {
            selectDate = date;
        }

        if (selectDate == "random") {
            var tempDate = new Date();

            var month = tempDate.getMonth() + 1;
            if (month <= 9) {
                month = "0" + month;
            }

            var days = tempDate.getDate();
            if (days <= 9) {
                days = "0" + days;
            }

            var year = tempDate.getFullYear() + 1;

            var hours = tempDate.getHours();
            if (hours <= 9) {
                hours = "0" + hours;
            }

            var minutes = tempDate.getMinutes();
            if (minutes <= 9) {
                minutes = "0" + minutes;
            }

            var tempDate1 = month + " " + days + ", " + year + " " + hours + ":" + minutes;
            tempDate1 = new Date(tempDate1);

            var randomisedDate = key.random(tempDate1.getTime(), currentDate.getTime());

            futureDate = new Date(randomisedDate);
        } else {
            futureDate = new Date(date);
        }

        currentDate = new Date();
    }

    currentDate = new Date();
    var weekToConvert = inWeeks(futureDate, currentDate);
    var week = convertRound(weekToConvert);

    var dayToConvert = (weekToConvert - week) * 7;
    var day = convertRound(dayToConvert);

    var hourToConvert = (dayToConvert - day) * 24;
    var hour = convertRound(hourToConvert);

    var minuteToConvert = (hourToConvert - hour) * 60;
    var minute = convertRound(minuteToConvert);

    var second = key.round((minuteToConvert - minute) * 60, "nearest", 2);

    if (week == 1) {
        week = week + " week, ";
    } else {
        week = week + " weeks, ";
    }

    if (day == 1) {
        day = day + " day, ";
    } else {
        day = day + " days, ";
    }

    if (hour == 1) {
        hour = hour + " hour, ";
    } else {
        hour = hour + " hours, ";
    }

    if (minute == 1) {
        minute = minute + " minute and ";
    } else {
        minute = minute + " minutes and ";
    }

    if (second == 1) {
        second = second + " second left till " + futureDate + ".";
    } else {
        second = second + " seconds left till " + futureDate + ".";
    }

    var converted = [week, day, hour, minute, second];
    var output = "";
    for (var i = 0; i < converted.length; i++) {
        output = output + converted[i];
    }

    document.getElementById('timeUntilOutput').innerHTML = output;
};

var toBinary = function() {
    var n1;
    var n2;
    var n4;
    var n8;
    var n16;
    var n32;
    var n64;
    var n128;

    var n = document.getElementById('toBinaryValue').value || key.round(key.random(255));
    console.log("Denary Value: " + n);

    if (n > 255) {
        document.getElementById('toBinaryOutput').innerHTML = "Overflow Error";
    } else if ((n % 1) !== 0) {
        document.getElementById('toBinaryOutput').innerHTML = "Invalid Denary Value";
    } else {
        if (n >= 128) {
            n128 = "1";
            n -= 128;
        } else {
            n128 = "0";
        }

        if (n >= 64) {
            n64 = "1";
            n -= 64;
        } else {
            n64 = "0";
        }

        if (n >= 32) {
            n32 = "1";
            n -= 32;
        } else {
            n32 = "0";
        }

        if (n >= 16) {
            n16 = "1";
            n -= 16;
        } else {
            n16 = "0";
        }

        if (n >= 8) {
            n8 = "1";
            n -= 8;
        } else {
            n8 = "0";
        }

        if (n >= 4) {
            n4 = "1";
            n -= 4;
        } else {
            n4 = "0";
        }

        if (n >= 2) {
            n2 = "1";
            n -= 2;
        } else {
            n2 = "0";
        }

        if (n >= 1) {
            n1 = "1";
        } else {
            n1 = "0";
        }

        var binary = [n128, n64, n32, n16, n8, n4, n2, n1];
        var output = "";
        for (var i = 0; i < binary.length; i++) {
            if (i <= 3) {
                output = output + binary[i];
            } else if (i == 4) {
                output = output + " " + binary[i];
            } else {
                output = output + binary[i];
            }
        }
        document.getElementById('toBinaryOutput').innerHTML = output;
    }
};

var partitions = function() {
    var num = document.getElementById('partitionsValue').value || key.round(key.random(100));

    var output;
    if (((num % 1) !== 0) || (num <= 0)) {
        document.getElementById('partitionsOutput').innerHTML = "This number cannot have partitions";
    } else {
        var part1 = 4 * num * Math.sqrt(3);
        var part2 = Math.PI * Math.sqrt((2 * num) / 3);
        output = (1 / part1) * Math.exp(part2);

        document.getElementById('partitionsOutput').innerHTML = num + " has " + key.round(output) + " partitions";
    }
};

var factorableQuadratic = function() {
    var plusOrMinus = function(a) {
        if (a >= 0) {
            return "+ " + a;
        } else {
            return "- " + Math.abs(a);
        }
    };
    var xValue4Quadratic = function(a) {
        if (a == 1) {
            return "+ x";
        } else if (a == -1) {
            return "- x";
        } else {
            return plusOrMinus(a) + "x";
        }
    };
    var xValue4Factored = function(a) {
        if (a == 1) {
            return "x";
        } else if (a == -1) {
            return "-x";
        } else {
            return a + "x";
        }
    };

    var a = 0;
    while (a === 0) {
        a = key.round(key.random(5, -5));
    }

    var b = 0;
    while (b === 0) {
        b = key.round(key.random(15, -15));
    }

    var c = 0;
    while (c === 0) {
        c = key.round(key.random(5, -5));
    }

    var d = 0;
    while (d === 0) {
        d = key.round(key.random(15, -15));
    }

    var aX = xValue4Factored(a);
    var bX = plusOrMinus(b);
    var cX = xValue4Factored(c);
    var dX = plusOrMinus(d);

    var factored = "(" + aX + " " + bX + ")(" + cX + " " + dX + ")";

    var ac = a * c;
    var adbc = xValue4Quadratic((a * d) + (b * c));
    var bd = plusOrMinus(b * d);

    var quadratic = ac + "x² " + adbc + " " + bd;

    document.getElementById('factorableOutput').innerHTML = quadratic + " to " + factored;
};

var medianIQR = function() {
    var isDecimal = function(a) {
        if ((a % i) === 0) {
            return false;
        } else {
            return true;
        }
    };

    var randomArrayLength = document.getElementById('IQRLength').value || key.round(key.random(15, 10));
    var randomArrayMax = document.getElementById('IQRMax').value || key.round(key.random(15, 10));

    var array = [];
    for (var i = 0; i < key.round(randomArrayLength, "down"); i++) {
        array.push(key.round(key.random(randomArrayMax), "up", 1))
    }
    array.sort(key.sortAscending)

    var q1 = key.round(array[key.round(((array.length / 4) - 1), "up")], "nearest", 1);
    var q3 = key.round(array[key.round((((array.length * 3) / 4) - 1), "up")], "nearest", 1);
    var iqr = key.round(q3 - q1, "nearest", 1);

    var nthValueInArray = (array.length - 1) / 2;

    var median = 0;

    if (isDecimal(nthValueInArray)) {
        median = key.round((array[key.round(nthValueInArray, "down")] + array[key.round(nthValueInArray, "up")]) / 2, "nearest", 1);
    } else {
        median = key.round(array[nthValueInArray], "nearest", 1);
    }

    var maxArray = key.round(array[array.length - 1], "nearest", 1);
    var minArray = key.round(array[0], "nearest", 1);

    var output = "The median is " + median + ", Q1 is " + q1 + ", Q3 is " + q3 + " and the interquartile range is " + iqr + ". The max is " + maxArray + " and the min is " + minArray;

    document.getElementById('IQROutput').innerHTML = output;
    console.log(array);
};

var approximateSqrt = function() {
    //https://www.youtube.com/watch?v=PJHtqMjrStk

    var num = document.getElementById('sqrtOf').value || key.round(key.random(Math.PI * 100));

    var approximate = key.approxSqrt(num);

    var actual = Math.sqrt(num);
    console.log("Actual value: " + key.round(actual, "nearest", 4));

    var percentOff = key.round((Math.abs(actual - approximate) / actual) * 100, "nearest", 4);

    document.getElementById('approxSqrtOutput').innerHTML = "The approximate square root of " + num + " is " + key.round(approximate, "nearest", 4) + " and it was " + percentOff + "% off the real value";
};

var normalDistribution = function() {
    var normalCDF = function(a) {
        var b = 1 / (1 + 0.2316419 * Math.abs(a));
        var c = 0.3989423 * Math.exp(-a * a / 2);
        var d = c * b * (0.3193815 + b * (-0.3565638 + b * (1.781478 + b * (-1.821256 + b * 1.330274))));
        if (a > 0) {
            d = 1 - d;
        }
        return d;
    };
    var calculate = function(a, b, c) {
        var d = 0;
        c = Math.abs(c);
        if (c === 0) {
            if (a < b) {
                d = 0;
            } else {
                d = 1;
            }
        } else {
            d = normalCDF((a - b) / c);
        }
        return d;
    };

    var mean = document.getElementById('ndfMean').value || key.random(Math.PI * 100);

    var sd;
    if ((mean > 0) || (mean < 0)) {
        //Standard Deviation cannot be a negative number
        sd = Math.abs(document.getElementById('ndfSD').value) || key.random(Math.abs(mean) / 10);
    } else {
        sd = Math.ans(document.getElementById('ndfSD').value) || 1;
    }

    var val = document.getElementById('ndfValue').value || key.random(mean + (sd * 4), mean - (sd * 4));

    var result = key.round(calculate(val, mean, sd), "nearest", 4);

    val = key.round(val, "nearest", 2);
    mean = key.round(mean, "up", 2);

    document.getElementById('ndfOutput').innerHTML = "X ~ N(" + mean + ", " + key.round(sd, "nearest", 2) + "²) --> P(X < " + val + ") = " + result;
    console.log("P(Z < " + key.round((val - mean) / sd, "nearest", 2) + ")");
};

var averages = function() {
    var isInt = function(a) {
        if ((a % 1) == 0) {
            return true;
        } else {
            return false;
        }
    };
    var mode = function(a) {
        var b = [];
        for (var i = 0; i < a.length; i++) {
            b.push(a[i]);
        }
        b = key.countDupes(b);
        var c = [];
        for (var i = 0; i < b[1].length; i++) {
            c.push(b[1][i]);
        }
        c.sort(key.sortDescending);
        return b[0][b[1].indexOf(c[0])];
    };
    var median = function(a) {
        var b = [];
        for (var i = 0; i < a.length; i++) {
            b.push(a[i]);
        }
        b.sort(key.sortAscending);
        var c = (b.length - 1) / 2;
        if (isInt(c)) {
            return b[c];
        } else {
            return (b[key.round(c, "down")] + b[key.round(c, "up")]) / 2;
        }
    };
    var mean = function(a) {
        var b = 0;
        for (var i = 0; i < a.length; i++) {
            b += a[i];
        }
        return key.round(b / a.length, "nearest", 2);
    };

    var max = Math.abs(document.getElementById('avgMax').value) || key.random(Math.PI * 10, 10);
    var min = Math.abs(document.getElementById('avgMin').value) || key.random(max, 1);
    var length = Math.abs(document.getElementById('avgLengt').value) || key.random(Math.PI * 7.5, 5);

    //Max and Min must not be the same values
    while (min == max) {
        min = key.random(max, 1);
    }

    //Max must be bigger than min
    var bigger = [key.round(min), key.round(max)];
    bigger.sort(key.sortAscending);

    console.log("Max: " + bigger[1]);
    console.log("Min: " + bigger[0]);
    console.log("Length: " + key.round(length, "down"));

    var list = [];
    for (var i = 0; i < key.round(length, "down"); i++) {
        list.push(key.round(key.random(bigger[1], bigger[0])));
    }
    console.log(list);

    document.getElementById('avgOutput').innerHTML = "Mode: " + mode(list) + ". Median: " + median(list) + ". Mean: " + mean(list);
};

/*
TODO List - 
1. Enhancement {
    a. None
}
2. None
*/