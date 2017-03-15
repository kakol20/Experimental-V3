/*
Notes: {
    Use parseInt("Text") to turn into number:
        var a = "18";
        var b = parseInt(a) + 2;

        result of b: 20
        
    Use var.split(',') to turn into list:
        var a = "a,b,c,d,e,f,g";
        var b = a.split(',');

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

        sortAscending: function(a, b) {
            return a - b;
            //array.sort(key.sortAscending);
        },
        sortDescending: function(a, b) {
            return b - a;
        },

        isPrime: function(a) {
            a = bigInt(a);
            if (a.equals(2)) {
                return true;
            } else if (a.greater(2)) {
                for (var i = bigInt(2); i.lesserOrEquals(6); i = i.next()) {
                    if ((a.mod(i)).equals(0)) {
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
                    d[d.length - 1]++;
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
                    if (!key.isValidNumber(a)) {
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

        isValidNumber: function(n) {
            return !(isNaN(Number(n)) || (n === null) || (Number(n) == Number.POSITIVE_INFINITY));
        },

        convertWeek: function(w) {
            var weekToConvert = w;
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
                second = second + " second";
            } else {
                second = second + " seconds";
            }

            var converted = [week, day, hour, minute, second];
            var output = "";
            for (var i = 0; i < converted.length; i++) {
                output = output + converted[i];
            }

            return output;
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
    };
})();

// http://www.accessify.com/tools-and-wizards/developer-tools/html-javascript-convertor - For future reference

// Runs script when page is loaded or reloaded
$(function() {
    console.log("Sᴄʀɪᴘᴛ ʙʏ Kᴀᴋᴏʟ20");
});

var getPrimes = function() {
    var min = Math.abs(document.getElementById('primesMin').value) || key.random(Math.PI * 10);
    var max = Math.abs(document.getElementById('primesMax').value) || key.random(Math.PI * 100, min);
    var minNmax = [min, max];
    minNmax.sort(key.sortAscending);

    var t0 = performance.now();

    var primes = [];
    for (var i = key.round(minNmax[0], "up"); i <= key.round(minNmax[1], "down"); i++) {
        if (i >= 2) {
            if (key.isPrime(i) == "true") {
                primes.push(i);
            }
        }
    }

    var output = "";
    for (var i = 0; i < primes.length; i++) {
        if (i > 0) {
            output = output + ", " + primes[i].toString();
        } else {
            output = output + primes[i].toString();
        }
    }

    document.getElementById('primes').innerHTML = output;
    console.log("Min: " + min);
    console.log("Max: " + max);
    console.log("Length: " + primes.length);

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
    console.log(" ");
};

var timeUntil = function() {
    // http://ditio.net/2010/05/02/javascript-date-difference-calculation/

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

    var date = document.getElementById('timeUntilInput').value || "random";

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

    var t0 = performance.now();

    currentDate = new Date();
    var output = key.convertWeek(inWeeks(futureDate, currentDate)) + " left until " + futureDate;
    document.getElementById('timeUntilOutput').innerHTML = output;

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
    console.log(" ");
};

var medianIQR = function() {
    var isDecimal = function(a) {
        if ((a % 1) === 0) {
            return false;
        } else {
            return true;
        }
    };

    var createList = function() {
        var a = "";

        for (var i = 0; i < 50; i++) {
            if (i === 0) {
                a = a + key.round(key.random(50, 1));
            } else {
                a = a + ", " + key.round(key.random(50, 1));
            }
        }
        return a;
    };
    var toArray = function(a) {
        var b = a.split(', ');
        var c = [];
        for (var i = 0; i < b.length; i++) {
            c.push(parseInt(b[i]));
        }
        return c;
    }

    var initial = document.getElementById('IQRInput').value || createList();
    var array = toArray(initial);
    console.log(array);

    var t0 = performance.now();

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

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
    console.log(" ");
};

var approximateSqrt = function() {
    //https://www.youtube.com/watch?v=PJHtqMjrStk

    var num = document.getElementById('sqrtOf').value || key.round(key.random(Math.PI * 100));

    var t0 = performance.now();

    var approximate = key.approxSqrt(num);

    var actual = Math.sqrt(num);
    console.log("Actual value: " + key.round(actual, "nearest", 4));

    var percentOff = key.round((Math.abs(actual - approximate) / actual) * 100, "nearest", 4);

    document.getElementById('approxSqrtOutput').innerHTML = "The approximate square root of " + num + " is " + key.round(approximate, "nearest", 4) + " and it was " + percentOff + "% off the real value";
    
    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
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

    var t0 = performance.now();

    var result = key.round(calculate(val, mean, sd), "nearest", 4);

    val = key.round(val, "nearest", 2);
    mean = key.round(mean, "up", 2);

    document.getElementById('ndfOutput').innerHTML = "X ~ N(" + mean + ", " + key.round(sd, "nearest", 2) + "²) --> P(X < " + val + ") = " + result;
    console.log("P(Z < " + key.round((val - mean) / sd, "nearest", 2) + ")");

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
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

    var createList = function() {
        var a = "";

        for (var i = 0; i < 50; i++) {
            if (i === 0) {
                a = a + key.round(key.random(50, 1));
            } else {
                a = a + ", " + key.round(key.random(50, 1));
            }
        }
        return a;
    };
    var toArray = function(a) {
        var b = a.split(", ");
        var c = [];
        for (var i = 0; i < b.length; i++) {
            c.push(parseInt(b[i]));
        }
        return c;
    };

    var initial = document.getElementById('averagesInput').value || createList();
    var list = toArray(initial);
    console.log(list);

    var t0 = performance.now();

    document.getElementById('avgOutput').innerHTML = "Mode: " + mode(list) + "<br>Median: " + median(list) + "<br>Mean: " + mean(list);

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
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

    var t0 = performance.now();

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

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
    console.log(" ");
};

var iteration = function() { // https://en.wikipedia.org/wiki/Newton's_method
    // ax³ + bx² + cx + d
    var output = "";

    var formula = function(x, a, b, c, d) {
        return (a * Math.pow(x, 3)) + (b * Math.pow(x, 2)) + (c * x) + d;
    };
    var derivative = function(x, a, b, c, d) {
        d = d || 0;
        return (3 * a * Math.pow(x, 2)) + (2 * b * x) + c;
    };
    var newtonMethod = function(x, a, b, c, d) {
        return x - (formula(x, a, b, c, d) / derivative(x, a, b, c));
    };

    var a = key.round(parseFloat(document.getElementById('iterationA').value)) || key.round(key.random(10, -10));
    while (a === 0) {
        a = key.round(key.random(10, -10));
    }
    var b = key.round(parseFloat(document.getElementById('iterationB').value)) || key.round(key.random(10, -10));
    while (b === 0) {
        b = key.round(key.random(10, -10));
    }
    var c = key.round(parseFloat(document.getElementById('iterationC').value)) || key.round(key.random(10, -10));
    while (c === 0) {
        c = key.round(key.random(10, -10));
    }
    var d = key.round(parseFloat(document.getElementById('iterationD').value)) || key.round(key.random(10, -10));
    while (d === 0) {
        d = key.round(key.random(10, -10));
    }

    if (a === 1) {
        output = "Equation: x³ ";
    } else if (a === -1) {
        output = "Equation: -x³";
    } else {
        output = "Equation: " + a + "x³ ";
    }
    if (b > 0) {
        if (b === 1) {
            output = output + "+ x² ";
        } else {
            output = output + "+ " + b + "x² ";
        }
    } else {
        if (b === -1) {
            output = output + "- x² ";
        } else {
            output = output + "- " + Math.abs(b) + "x² ";
        }
    }
    if (c > 0) {
        if (c === 1) {
            output = output + "+ x ";
        } else {
            output = output + "+ " + c + "x ";
        }
    } else {
        if (c === -1) {
            output = output + "- x ";
        } else {
            output = output + "- " + Math.abs(c) + "x ";
        }
    }
    if (d > 0) {
        output = output + "+ " + d + "<br>";
    } else {
        output = output + "- " + Math.abs(d) + "<br>";
    }

    var t0 = performance.now();

    var startNumber = parseFloat(document.getElementById('iterationStart').value) || key.round(key.random(100, -100));
    var decimalPlaces = key.round(parseFloat(document.getElementById('iterationDecimalPlaces').value)) || key.round(key.random(4, 2));

    output = output + "Decimal Places: " + decimalPlaces + "<br>x0 = " + startNumber + "<br>";

    if (!key.isValidNumber(startNumber) || !key.isValidNumber(decimalPlaces)) {
        output = "One of the inputs is invalid";
    } else {
        var x = [startNumber, key.round(newtonMethod(startNumber, a, b, c, d), "nearest", decimalPlaces + 1)];
        while (key.round(x[x.length - 1], "nearest", decimalPlaces) !== key.round(x[x.length - 2], "nearest", decimalPlaces)) {
            x.push(key.round(newtonMethod(x[x.length - 1], a, b, c, d), "nearest", decimalPlaces + 1));

            if (x.length >= 1000) {
                break;
            }
        }
        console.log(x);

        var iterations = x.length - 1;

        if (x.length >= 1000) {
            var temp = key.countDupes(x);
            var temp2 = [];
            for (var i = 0; i < temp[0].length; i++) {
                temp2.push([temp[0][i], temp[1][i]]);
            }
            temp2.sort(function(a, b) {
                return b[1] - a[1];
            });

            if ((temp2[0][1] > 1) && (temp2[1][1] > 1)) {
                output = output + "It is impossible to do with the given start number<b>";
            } else {
                output = output + "It will take too long";
            }
        } else {
            output = output + "Root: " + key.round(x[x.length - 1], "nearest", decimalPlaces) + "<br>";
            if (iterations > 1) {
                output = output + "Took " + iterations + " iterations<br>";
            } else {
                output = output + "Took one iteration<br>";
            }

            var noOfIterations = x.length - 1;

            var root_ = key.round(x[x.length - 1], "nearest", decimalPlaces);
            // console.log("Root: " + root_);
            var root_Value = formula(root_, a, b, c, d);
            // console.log("root_Value = " + root_Value);

            var low = key.round(((root_ * Math.pow(10, decimalPlaces)) - 0.5) / Math.pow(10, decimalPlaces), "nearest", decimalPlaces + 1);
            // console.log("Low: " + low);
            var lowValue = formula(low, a, b, c, d);
            // console.log("lowValue = " + lowValue);

            var high = key.round(((root_ * Math.pow(10, decimalPlaces)) + 0.5) / Math.pow(10, decimalPlaces), "nearest", decimalPlaces + 1);
            // console.log("High: " + high);
            var highValue = formula(high, a, b, c, d);
            // console.log("highValue = " + highValue);

            output = output + "f(" + low + ") = " + lowValue + "<br>f(" + root_ + ") = " + root_Value + "<br>f(" + high + ") = " + highValue;
        }
    }

    document.getElementById('iterationOutput').innerHTML = output;

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
    console.log(" ");
};

var monteCarlo = function() {
    var max = Math.abs(document.getElementById('monteCarloMax').value) || 1;
    var rep = Math.abs(document.getElementById('monteCarloRep').value) || Number(key.random(5000000, 500000).toPrecision(3));

    var output = "";

    var t0 = performance.now();

    if (!key.isValidNumber(max) || !key.isValidNumber(rep)) {
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

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
    console.log(" ");
};

var happyNumbers = function() {
    var out = function(units, result) {
        var a = "";
        for (var i = 0; i < units.length; i++) {
            if (i === 0) {
                a = units[i] + "² ";
            } else {
                a = a + "+ " + units[i] + "² ";
            }
        }
        return a + "= " + result;
    };
    var isHappyNumber = function(num) {
        var output = '';

        if (!key.isValidNumber(num)) {
            return [false, "NaN"];
        } else {
            var b = [];
            var c = Number(num);
            while (true) {
                var d = (c.toString()).split('');
                var e = 0;
                for (var i = 0; i < d.length; i++) {
                    e += Math.pow(Number(d[i]), 2);
                }
                if (e === 1) {
                    output = output + out(d, e);
                    return [true, output];
                } else if (b.indexOf(e) > -1) {
                    output = output + out(d, e);
                    return [false, output];
                }
                b.push(e);
                c = e;
                output = output + out(d, e) + "<br>";
            }
        }
    };

    var number = key.round(document.getElementById('happyNumbersInput').value) || key.round(key.random(Math.PI * 100, 5));

    var t0 = performance.now();

    if (isHappyNumber(number)[0]) {
        document.getElementById('happyNumbersOutput').innerHTML = isHappyNumber(number)[1] + "<br>" + number + " is a happy number";
    } else {
        document.getElementById('happyNumbersOutput').innerHTML = isHappyNumber(number)[1] + "<br>" + number + " is not a happy number";
    }

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(5) + "ms");
    }
    console.log(" ");
};

var carmichael = function() {
    alert("Bigger numbers and bigger gap between minimum and maximum means it will take longer to find the Carmichael numbers");
    var t0 = performance.now();

    var fermatLittleThereom = function(p) {
        for (var i = 2; i <= 5; i++) {
            if (!bigInt(i).pow(p).subtract(i).isDivisibleBy(p)) {
                return false;
            }
        }
        return true;
    };

    var isCarmichael = function(p) {
        if (fermatLittleThereom(p)) {
            if (!bigInt(p).isPrime()) {
                return true;
            }
        }
        return false;
    };

    var min = document.getElementById('carmichaelMin').value || key.round(key.random(1111, 1));
    // console.log(min);
    var max = document.getElementById('carmichaelMax').value || key.round(key.random(min + (Math.PI * 1000), min + (Math.PI * 100)));
    // console.log(max);

    var t0 = performance.now();

    var numbers = [];
    for (var i = min.toString(); bigInt(max.toString()).greaterOrEquals(i); i = bigInt(i).next().toString()) {
        if (isCarmichael(i)) {
            numbers.push(i);
        }
    }

    var output = "";
    if (numbers.length === 0) {
        output = "No Carmichael Numbers where found";
    } else {
        for (var i = 0; i < numbers.length; i++) {
            if (i === 0) {
                output = numbers[i].toString();
            } else {
                output = output + ", " + numbers[i];
            }
        }
    }

    document.getElementById('carmichaelOutput').innerHTML = output;
    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(4) + "ms");
    }
    console.log(" ");
};

var lcmAtoB = function() {
    alert("Bigger numbers will take longer time to execute. Biggest number you can input is 39 466");
    // http://pastebin.com/RBa0HpWj

    var gcd = function(a, b) {
        a = a.abs();
        b = b.abs();
        if (b.greaterOrEquals(a)) {
            var temp = a;
            a = b;
            b = temp;
        }
        while (true) {
            if (b.equals("0")) {
                return a;
            }
            a = a.mod(b);
            if (a.equals("0")) {
                return b;
            }
            b = b.mod(a);
        }
    };
    var lcm = function(a, b) {
        return (a.multiply(b)).divide(gcd(a, b));
    };

    var a = document.getElementById('lcmA').value || key.round(key.random(39466, 1));
    a = bigInt(a);
    var b = document.getElementById('lcmB').value || key.round(key.random(39456, 1));
    b = bigInt(b);

    var t0 = performance.now();

    var result = bigInt(1);
    if (b.greater(a)) {
        var temp = a;
        a = b;
        b = temp;
    }
    for (var i = b; i.lesserOrEquals(a); i = i.next()) {
        result = lcm(result, i);
    }
    result = result.toString();

    var output = "Smallest Number Divisible By All Numbers Between " + key.numberOutput(b.toString()) + " & " + key.numberOutput(a.toString()) + " is: " + key.numberOutput(result) + "<br>Length: " + result.length;
    document.getElementById('lcmOutput').innerHTML = output;

    var t1 = performance.now();
    var t = Math.abs(t1 - t0);
    if (t >= 1000) {
        console.log("Took: " + key.round(t / 1000, "nearest", 4) + "s");
    } else {
        console.log("Took: " + t.toPrecision(4) + "ms");
    }
    console.log(" ");
};

/*
TODO List - 
1. Enhancement {
    a. None
}
2. None
*/