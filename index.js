var pick = require('./pick'),
    pf = require('quick-primefactors'),
    levels = require('hrm-level-data');

var tilesForLevel = {};

levels.forEach(function (level) {
    tilesForLevel[level.number] = level.floor && level.floor.tiles;
});

var generators = {};

/*** Mail Room ***/
generators[1] = function (inbox) {
    inbox = inbox || pick.exactly(3).numbersBetween(1, 9).toArray();

    // Direct copy
    var outbox = inbox.slice(0);

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Busy Mail Room ***/
generators[2] = function (inbox) {
    inbox = inbox || pick.between(6, 15).letters().toArray();

    // Direct copy
    var outbox = inbox.slice(0);

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Copy Floor ***/
generators[3] = function () {
    // Hard-coded
    return {
        inbox: [ -99, -99, -99, -99 ],
        outbox: [ "B", "U", "G" ]
    };
};

/*** Scrambler Handler ***/
generators[4] = undefined;

/*** Rainy Summer ***/
generators[6] = function (inbox) {
    inbox = inbox || pick.between(3, 6).pairsOf().numbersBetween(-9, 9).toArray();

    // Output the sum of each pair
    var outbox = [];

    for (var i = 0; i < inbox.length; i += 2) {
        outbox.push(inbox[i] + inbox[i + 1]);
    }

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Zero Exterminator ***/
generators[7] = function (inbox) {
    inbox = inbox || pick.between(6, 15).letters().or().numbersBetween(-9, 9).toArray();

    // Filter out zeros
    var outbox = inbox.filter(function (item) {
        return item !== 0;
    });

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Tripler Room ***/
generators[8] = function (inbox) {
    inbox = inbox || pick.between(3, 6).numbersBetween(-9, 9).toArray();

    // Multiply the numbers by 3
    var outbox = inbox.map(function (item) {
        return item * 3;
    });

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Zero Preservation Initiative ***/
generators[9] = function (inbox) {
    inbox = inbox || pick.between(6, 15).letters().or().numbersBetween(-9, 9).toArray();

    // Preserve zeros
    var outbox = inbox.filter(function (item) {
        return item === 0;
    });

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Octoplier Suite ***/
generators[10] = function (inbox) {
    inbox = inbox || pick.between(3, 6).numbersBetween(-9, 9).toArray();

    // Multiply the numbers by 8
    var outbox = inbox.map(function (item) {
        return item * 8;
    });

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Sub Hallway ***/
generators[11] = function (inbox) {
    inbox = inbox || pick.between(3, 6).pairsOf().numbersBetween(-9, 9).toArray();

    // Output difference of each pair, both ways
    var outbox = [];

    for (var i = 0; i < inbox.length; i += 2) {
        outbox.push(inbox[i + 1] - inbox[i], inbox[i] - inbox[i + 1]);
    }

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Tetracontiplier ***/
generators[12] = function (inbox) {
    inbox = inbox || pick.between(3, 6).numbersBetween(-9, 9).toArray();

    // Multiply the numbers by 40
    var outbox = inbox.map(function (item) {
        return item * 40;
    });

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Equalization Room ***/
generators[13] = undefined;

/*** Maximization Room ***/
generators[14] = function (inbox) {
    inbox = inbox || pick.between(3, 6).pairsOf().numbersBetween(-9, 9).toArray();

    // Output the maximum of each pair
    var outbox = [];

    for (var i = 0; i < inbox.length; i += 2) {
        outbox.push(Math.max(inbox[i], inbox[i + 1]));
    }

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Absolute Positivity ***/
generators[16] = undefined;

/*** Exclusive Lounge ***/
generators[17] = undefined;

/*** Countdown ***/
generators[19] = undefined;

/*** Multiplication Workshop ***/
generators[20] = undefined;

/*** Zero Terminated Sum ***/
generators[21] = undefined;

/*** Fibonacci Visitor ***/
generators[22] = undefined;

/*** The Littlest Number ***/
generators[23] = undefined;

/*** Mod Module ***/
generators[24] = undefined;

/*** Cumulative Countdown ***/
generators[25] = undefined;

/*** Small Divide ***/
generators[26] = undefined;

/*** Three Sort ***/
generators[28] = undefined;

/*** Storage Floor ***/
generators[29] = function (inbox) {
    var tiles = tilesForLevel[29];

    inbox = inbox || pick.between(4, 8).numbersBetween(0, 9).toArray();

    // Lookup floor tiles
    var outbox = inbox.map(function (item) {
        return tiles[item];
    });

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** String Storage Floor ***/
generators[30] = undefined;

/*** String Reverse ***/
generators[31] = undefined;

/*** Inventory Report ***/
generators[32] = undefined;

/*** Vowel Incinerator ***/
generators[34] = undefined;

/*** Duplicate Removal ***/
generators[35] = undefined;

/*** Alphabetizer ***/
generators[36] = undefined;

/*** Scavenger Chain ***/
generators[37] = undefined;

/*** Digit Exploder ***/
generators[38] = undefined;

/*** Re-Coordinator ***/
generators[39] = undefined;

/*** Prime Factory ***/
generators[40] = function (inbox) {
    inbox = inbox || pick.exactly(3).numbersBetween(2, 30).toArray(); // @todo .primes().or().nonPrimes()

    // Output prime factors smallest to largest of each number
    var outbox = [];

    inbox.forEach(function (item) {
        Array.prototype.push.apply(outbox, pf(item));
    });

    return {
        inbox: inbox,
        outbox: outbox
    };
};

/*** Sorting Floor ***/
generators[41] = undefined;

exports.generate = function (levelNumber, inbox) {
    var generator = generators[levelNumber];

    if (!generator) {
        return null;
    }

    return generator(inbox);
};
