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

        var selectDate = date || "random";
        if ((futureDate.getTime() <= currentDate.getTime()) || (futureDate.getTime() == currentDate.getTime())) {
            selectDate = "random";
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

        var binary = [n128, n64, n32, n16, n8, n4, n2, n1]
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