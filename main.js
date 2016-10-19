/*
Notes: {
    Use parseInt("Text") to turn into number:
        var a = "18";
        var b = parseInt(a) + 2;

        result of b: 20
        
    Use var.split(',') to turn into list:
        var a = "a,b,c,d,e,f,g";
        var b = n.split(',');

        result of b: [a,b,c,d,e,f,g];
        
    Use "<br>" to split lines in div:
        var a = "a" + "<br>";
        var b = "b" + "<br>";
        var c = "c";
        document.getElementById('main').innerHTML = a + b + c;

        result Output:
            a
            b
            c

    Use number.toString(16) to convert decimal to hex:
        var a = 69;
        var b a.toString(16);

        result of b: 45;

    Use parseInt(hex, 16) to convert hex to decimal:
        var a = 45;
        var b = parseInt(a, 16);

        result of b: 69;

    Use array.reverse() to reverse list:
        var a = [2,3,1];
        a.reverse();

        result of a: [1,3,2];

    Use n.toPrecision(x) to round number in x significant figures:
        var a = 3.14159265;
        var b = a.toPrecision(4);

        result of b: 3.142;
    
    Standard Index Form:
        a * 10^b
        a - Coefficient
        b - Exponent
        var c = 0.0054;
        var exponent = key.round(Math.log(c) / Math.log(10), "down");
        var coefficient = c * Math.pow(10, -1 * exponent);

        result of exponent: -3
                  coefficient: 5.4 

    Use Number(string) to turn into a number
        var a = "3.14159265";
        var b = Number(a);

        result of b: 3.14159265

    http://stackoverflow.com/questions/34599303/javascript-sort-list-of-lists-by-sublist-second-entry

    Use array.splice(index, 1) to delete array[index]
        var a = [1, 2, 3];
        var b = a.splice(1, 1);

        result of b: [1, 3];
}
*/

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
        },

        numberOutput: function(a) {
            var b = a.toString();
            var c = b.split("");
            c.reverse();
            var d = "";
            for (var i = 0; i < c.length; i++) {
                if ((i + 1) === c.length) {
                    d = c[i] + d;
                } else if (((i + 1) % 3) === 0) {
                    d = " " + c[i] + d;
                } else {
                    d = c[i] + d;
                }
            }
            return d;
        },

        //http://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript
        base64: (function() {
            return {
                base: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",

                fromNumber: function(a, clean) {
                    clean = clean || "no";
                    a = key.round(a, "down");
                    if (isNaN(Number(a)) || (a === null) || (a === Number.POSITIVE_INFINITY)) {
                        console.log("The input is not valid");
                        return;
                    }
                    if (a < 0) {
                        console.log("Can't represent negative numbers now");
                        return;
                    }
                    var b;
                    var c = a;
                    var d = "";
                    while (true) {
                        b = c % 64;
                        d = key.base64.base.charAt(b) + d;
                        c = key.round(c / 64, "down");
                        if (c === 0) {
                            break;
                        }
                    }
                    if (clean == "yes") {
                        var e = d.split("");
                        e.reverse();
                        var f = "";
                        for (var i = 0; i < e.length; i++) {
                            if ((i + 1) == e.length) {
                                f = e[i] + f;
                            } else if (((i + 1) % 2) === 0) {
                                f = " " + e[i] + f;
                            } else {
                                f = e[i] + f;
                            }
                        }
                        return f;
                    } else {
                        return d;
                    }
                },

                toNumber: function(a) {
                    var b = [];
                    if (!isNaN(a)) {
                        var c = a.toString();
                        b = c.split("");
                    } else {
                        b = a.split("");
                    }
                    var d = [];
                    for (var i = 0; i < b.length; i++) {
                        if (b[i] !== " ") {
                            d.push(b[i]);
                        }
                    }
                    var e = 0;
                    for (var i = 0; i < d.length; i++) {
                        e = (e * 64) + key.base64.base.indexOf(d[i]);
                    }
                    return e;
                },

                test: function(a) {
                    a = key.round(Math.abs(a), "down") || key.round(key.random(key.base64.toNumber("// //"), key.base64.toNumber(1000)));
                    console.log("Number           : " + key.numberOutput(a));
                    var b = key.base64.fromNumber(a, "yes");
                    console.log("Number to Base-64: " + b);
                    var c = key.base64.toNumber(b);
                    console.log("Base-64 to Number: " + key.numberOutput(c));
                    if (c !== a) {
                        console.log("Test Failed");
                    }
                    console.log(" ");
                } 
            };
        })(),
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
    console.log(" ");
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
    console.log(" ");
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

    var date = document.getElementById('timeUntilDate').value || "random";

    var futureDate = new Date(date);
    var currentDate = new Date();

    if (!isValidDate(futureDate) || (futureDate.getTime() <= currentDate.getTime())) {
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
    console.log(" ");
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
    console.log(" ");
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
    console.log(" ");
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
    console.log(" ");
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
        array.push(key.round(key.random(randomArrayMax), "up", 1));
    }
    array.sort(key.sortAscending);

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

    var output = "The median is " + median + "<br>Q1 is " + q1 + "<br>Q3 is " + q3 + "<br>The interquartile range is " + iqr + "<br>The max is " + maxArray + "<br>The min is " + minArray;

    document.getElementById('IQROutput').innerHTML = output;
    console.log(array);
    console.log(" ");
};

var approximateSqrt = function() {
    //https://www.youtube.com/watch?v=PJHtqMjrStk

    var num = document.getElementById('sqrtOf').value || key.round(key.random(Math.PI * 100));

    var approximate = key.approxSqrt(num);

    var actual = Math.sqrt(num);
    console.log("Actual value: " + key.round(actual, "nearest", 4));

    var percentOff = key.round((Math.abs(actual - approximate) / actual) * 100, "nearest", 4);

    document.getElementById('approxSqrtOutput').innerHTML = "The approximate square root of " + num + " is " + key.round(approximate, "nearest", 4) + " and it was " + percentOff + "% off the real value";
    console.log(" ");
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

    var mean = document.getElementById('ndfMean').value || key.random(Math.PI * 10, Math.PI * (-10));

    var sd;
    if ((mean > 0) || (mean < 0)) {
        //Standard Deviation cannot be a negative number
        sd = Math.abs(document.getElementById('ndfSD').value) || key.random(Math.abs(mean) / 10);
    } else {
        sd = Math.abs(document.getElementById('ndfSD').value) || 1;
    }

    var val = document.getElementById('ndfValue').value || key.random(mean + (sd * 4), mean - (sd * 4));

    var result = key.round(calculate(val, mean, sd), "nearest", 4);

    val = key.round(val, "nearest", 2);
    mean = key.round(mean, "up", 2);

    document.getElementById('ndfOutput').innerHTML = "X ~ N(" + mean + ", " + key.round(sd, "nearest", 2) + "²) --> P(X < " + val + ") = " + result;
    console.log("P(Z < " + key.round((val - mean) / sd, "nearest", 2) + ")");
    console.log(" ");
};

var averages = function() {
    var isInt = function(a) {
        if ((a % 1) === 0) {
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
        var b = a.sort(key.sortAscending);
        var c = [];
        for (var i = 0; i < b.length; i++) {
            c.push(b[i]);
        }
        if (c.length == 1) {
            return c[0];
        } else if (c.length == 2) {
            return (c[0] + c[1]) / 2;
        } else {
            c.splice(c.length - 1, 1);
            c.splice(0, 1);
            return median(c);
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
    var length = Math.abs(document.getElementById('avgLength').value) || key.random(Math.PI * 7.5, 5);

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

    document.getElementById('avgOutput').innerHTML = "Mode: " + mode(list) + "<br>Median: " + median(list) + "<br>Mean: " + mean(list);
    console.log(" ");
};

var morseConvert = function() {
    var morseCode = (function() {
        return {
            code: ["/", ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----", "-.--.-", "-.--.-", "-....-", "--..--", ".-.-.-", "-..-.", "..--..", ".----."],
            letters: " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890()-,./?'",

            fromSentence: function(a) {
                a = a.toUpperCase();
                var b = a.split("");
                var c = [];
                for (var i = 0; i < b.length; i++) {                        
                    if ((morseCode.letters.indexOf(b[i]) <= -1) && (morseCode.letters.indexOf(b[i - 1]) > 0) && (morseCode.letters.indexOf(b[i + 1]) > 0)) {
                        c.push(" ");
                    } else if (morseCode.letters.indexOf(b[i]) > -1) {
                        c.push(b[i]);
                    }
                }
                var d = "";
                for (var i = 0; i < c.length; i++) {
                    var e = morseCode.code[morseCode.letters.indexOf(c[i])];
                    if ((i + 1) == c.length) {
                        d = d + e;
                    } else {
                        d = d + e + " ";
                    }
                }
                return d;
            },

            toSentence: function(a) {
                var b = a.split(" ");
                var c = [];
                for (var i = 0; i < b.length; i++) {
                    if (morseCode.code.indexOf(b[i]) > -1) {
                        c.push(b[i]);
                    }
                }
                var d = "";
                for (var i = 0; i < c.length; i++) {
                    var e = morseCode.letters.charAt(morseCode.code.indexOf(c[i]));
                    d = d + e;
                }
                return d;
            },

            test: function(a) {
                a = a || "Hello World";
                console.log("Sentence: " + a);
                var b = morseCode.fromSentence(a);
                console.log("Sentence to Morse Code: " + b);
                var c = morseCode.toSentence(b);
                console.log("Morse Code to Sentence: " + c);
                if (c !== a.toUpperCase()) {
                    console.log("Test Failed");
                }
                console.log(" ");
            }
        };
    })();

    var input = document.getElementById('morseInput').value || "";

    if ((input === " ") || (input === "")) {
        document.getElementById('morseOutput').innerHTML = "You must input something";
    } else {
        var isSentence = function(a) {
            var b = a.split(" ");
            for (var i = 0; i < b.length; i++) {
                if (morseCode.code.indexOf(b[i]) <= -1) {
                    return true;
                }
                return false;
            }
        };
        if (isSentence(input)) {
            document.getElementById('morseOutput').innerHTML = morseCode.fromSentence(input);
        } else {
            document.getElementById('morseOutput').innerHTML = morseCode.toSentence(input);
        }
    }
    console.log(" ");
};

var iteration = function() {
    var iterationFormula = function(a) {
        return (((2 * a) - 5) / Math.pow(a, 2)) + 3;
    };

    var formula = function(a) {
        return Math.pow(a, 3) - (3 * Math.pow(a, 2)) - (2 * a) + 5;
    };

    var start = Number(document.getElementById('iterationStart').value) || Number(key.random(Math.PI * 10, 1).toPrecision(3));
    var sigFigures = Number(document.getElementById('iterationSigFigures').value) || key.round(key.random(4, 2));

    var output = "";
    if (isNaN(Number(start)) || isNaN(Number(sigFigures)) || (start === null) || (sigFigures === null) || (start == Number.POSITIVE_INFINITY) || (sigFigures == Number.POSITIVE_INFINITY)) {
        output = output + "One of the inputs is invalid";
    } else if (sigFigures < 0) {
        output = output + "Significant Figure can't be negative";
    } else {
        output = output + "Equation: x³ - 3x² - 2x + 5 = 0<br>";

        var x = [start];
        output = output + "x0 = " + x[0] + "<br>";
        while (true) {
            x.push(Number(iterationFormula(x[x.length - 1]).toPrecision(sigFigures + 1)));
            if (x[x.length - 1].toPrecision(sigFigures) == x[x.length - 2].toPrecision(sigFigures)) {
                break;
            }
        }
        console.log(x);

        var rootFoo = Number(x[x.length - 1].toPrecision(sigFigures));
        var iterations = x.length - 1;
        var exponent = key.round(Math.log(rootFoo) / Math.log(10), "down");
        var coefficient = key.round(rootFoo / Math.pow(10, exponent), "nearest", sigFigures - 1);

        var low = Number((key.round(coefficient - (0.5 * Math.pow(10, -1 * (sigFigures - 1))), "nearest", sigFigures) * Math.pow(10, exponent)).toPrecision(sigFigures + 1));
        var lowValue = Number(formula(low).toPrecision(4));

        var high = Number((key.round(coefficient + (0.5 * Math.pow(10, -1 * (sigFigures - 1))), "nearest", sigFigures) * Math.pow(10, exponent)).toPrecision(sigFigures + 1));
        var highValue = Number(formula(high).toPrecision(4));

        output = output + "Root: " + rootFoo + "<br>Took " + iterations + " iterations<br>f(" + low + ") = " + lowValue + "<br>f(" + high + ") = " + highValue;
    }

    document.getElementById('iterationOutput').innerHTML = output;
    console.log(" ");
};

var monteCarlo = function() {
    var max = Math.abs(document.getElementById('monteCarloMax').value) || 1;
    var rep = Math.abs(document.getElementById('monteCarloRep').value) || Number(key.random(5000000, 500000).toPrecision(3));

    var output = "";

    if (isNaN(Number(max)) || isNaN(Number(rep)) || (max === null) || (rep === null) || (max == Number.POSITIVE_INFINITY) || (rep == Number.POSITIVE_INFINITY)) {
        output = "An input is invalid";
    } else {
        var total = 0;
        var inCircle = 0;

        for (var i = 0; i < rep; i++) {
            var xValue = key.random(max, max * -1);
            var yValue = key.random(max, max * -1);
            if ((Math.pow(xValue, 2) + Math.pow(yValue, 2)) <= Math.pow(max, 2)) {
                inCircle++;
                total++;
            } else {
                total++;
            }
        }
        var estimate = (inCircle / total) * 4;
        var percentOff = Number(((Math.abs(estimate - Math.PI) / Math.PI) * 100).toPrecision(4));
        output = "Total: " + total + "<br>In Circle: " + inCircle + "<br>Estimate: " + Number(estimate.toPrecision(9)) + "<br>Percentage Off: " + percentOff + "%";
    }

    document.getElementById('monteCarloOutput').innerHTML = output;
};

var base64Convert = function() {
    var random = key.round(key.random(key.base64.toNumber("// //"), key.base64.toNumber(1000)));
    var n = document.getElementById('base64ConvertNum').value || random;
    var converted = key.base64.fromNumber(n, "yes");
    document.getElementById('base64ConvertOutput').innerHTML = "Number: " + n + "<br>Base-64: " + converted;
}

/*
TODO List - 
1. Enhancement {
    a. None
}
2. None
}
*/