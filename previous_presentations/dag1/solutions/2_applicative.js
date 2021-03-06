"use strict";
var test = require('tape');

// Instead of discussing the theory on lexical scoping and closures,
// we'll just go straight to more code. If you want to read the theory,
// we recommend checking out this link after the workshop:
// http://eloquentjavascript.net/03_functions.html

// First up is applicative programming. In general, applicative
// programming is the pattern of defining a function that takes a
// function and then invokes that function for each element in a
// collection. We'll look at three central functions: map, filter and
// reduce. These are central building blocks of what we're learning
// today.

// Applicative programming works best with pure functions, i.e.
// functions that have no side effects: it references no other mutable
// class fields, doesn’t set any values other than the return value,
// and relies only on the parameters for input.

test('map', function(t) {
    // A map function accepts a higher-order function and a collection,
    // then applies the passed function to each element and returns a
    // collection.

    // To understand what we're talking about, this is an example of
    // using a for loop to go through a collection, performing a
    // calculation on each item:

    function squareFor(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            newArr.push(arr[i] * arr[i]);
        }
        return newArr;
    }

    t.deepEqual(
        squareFor([1,2,3]),
        [1,4,9]
    );

    // Thankfully we now have a `map` functions on `Array.prototype`.
    // Therefore, we can write this instead:

    function square(arr) {
        return arr.map(function(value) {
            return value * value;
        });
    }

    t.deepEqual(
        square([1,2,3]),
        [1,4,9]
    );

    // For each iteration of map it invokes the function with three
    // arguments: the current value, the current index, the entire
    // array. So we could have written this instead:

    function square(arr) {
        return arr.map(function(value, index, arr) {
            return value * value;
        });
    }

    // PROBLEM: Implement the following function using map, i.e. a
    // function that adds the current index to the current value.

    function addIndexFor(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            newArr.push(arr[i] + i);
        }
        return newArr;
    }

    t.deepEqual(
        addIndexFor([1,2,3]),
        [1,3,5]
    );

    function addIndex(arr) {
        return arr.map(function(value, index) {
            return value + index;
        });
    }

    t.deepEqual(
        addIndex([1,2,3]),
        [1,3,5]
    );

    t.end();
});

test('filter', function(t) {
    // Next up is filter. When filtering, you produce another list,
    // potentially smaller than the original, depending on the
    // filtering criteria.

    // A filter includes the value for all function invocations that
    // return `true`. Here's an example, again using `for`:

    function removeOddIndicesFor(arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            if (i % 2 == 0) {
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }

    t.deepEqual(
        removeOddIndicesFor([1,2,3,4,5]),
        [1,3,5]
    );

    // PROBLEM: Implement this using a `Array.prototype.filter`
    // instead:

    function removeOddIndices(arr) {
        return arr.filter(function(value, index) {
            return index % 2 == 0;
        });
    }

    t.deepEqual(
        removeOddIndices([1,2,3,4,5]),
        [1,3,5]
    );

    t.end();
});

test('implement map and filter', function(t) {
    // To be entirely sure that we properly understand how these
    // functions work, let's implement our own `map` and `filter`
    // functions. The implementation of these still have to concern
    // themselves with loops, counters and state.

    // (If you struggle, be sure to take a look at the examples we
    // saw earlier.)

    // PROBLEM: Implement `map`

    var map = function(items, fn) {
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            arr.push(fn(items[i], i));
        }
        return arr;
    }

    var mapRes = map([1,2,3,4], function(value, index) {
        return value * index;
    });

    t.deepEqual(
        mapRes,
        [0, 2, 6, 12]
    );

    // PROBLEM: Implement `filter`

    var filter = function(items, fn) {
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            if (fn(items[i], i)) {
                arr.push(items[i]);
            }
        }
        return arr;
    }

    var filterRes = filter([1,2,3,4], function(value, index) {
        return value * index > 4;
    });

    t.deepEqual(
        filterRes,
        [3,4]
    );

    t.end();
});

test('reduce', function(t) {
    // The last applicative functions we'll look at for now is reduce.
    // Reduce applies a function against an accumulator and each value
    // of the array to reduce it to a single value.

    // As always, let's start with an example of calculating the sum of
    // all items in an array using a `for` loop:

    function sumWithFor(arr) {
        var sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    t.equal(
        sumWithFor([1,2,3]),
        6
    );

    // Using reduce it can look like this:

    function sum(arr) {
        return arr.reduce(function(acc, value){

            // What is returned in this function is used as `acc` for
            // the next iteration
            return acc + value;

        }, 0);
        // 0 is the starting value for `acc`

        // What we return on the last iteration is the result of
        // the reduce.
    }

    // This illustrates how reduce works:

    // Operation   Accumulator   List
    //     +            0        1, 2, 3, 4
    //                  1        2, 3, 4
    //                  3        3, 4
    //                  6        4
    //                 10

    t.equal(
        sum([1,2,3,4]),
        10
    )

    t.equal(
        sum([0,0,-1]),
        -1
    )

    // PROBLEM: Implement multiplication using reduce

    function multiply(arr) {
        return arr.reduce(function(memo, num) {
            return memo * num;
        }, 1);
    }

    t.equal(
        multiply([1,2,3,4]),
        24
    );

    t.equal(
        multiply([0,1,2,3]),
        0
    );

    // PROBLEM: Implement join using reduce
    // (think about what's the first value and what we need to
    // iterate over)

    function join(arr, chr) {
        return arr.slice(1).reduce(function(memo, str) {
            return memo + chr + str;
        }, arr[0]);
    }

    t.equal(
        join(["a"], ":"),
        "a"
    );

    t.equal(
        join(["a","b","c"], ":"),
        "a:b:c"
    );

    t.end();
});

// In the examples we have seen so far, we have used methods that live
// on an array. We're now going to switch tactics and focus more on
// functions instead of methods. For example, in addition to
// `Array.prototype.reduce`, there exists a `reduce` functions in
// libraries such as Lo-Dash and Underscore. One of the primary values
// of using these functions instead is composability. We're going to
// look more on what exactly that means later. Another great thing is
// that some of these functions are more powerful that the methods on
// arrays.

// In this course we'll use Lo-Dash
// (however, we could also have chosen Underscore instead)
var _ = require('lodash');

test("_.reduce", function(t) {
    // We'll start by going back to reduce. Compared to the built-in
    // reduce, _.reduce does not need a starting value (which means
    // it's actually a fold not a reduce. (In fact, in Lo-Dash _.reduce
    // is aliased to _.foldl, i.e. fold from the left.)

    function join(arr, chr) {
        return _.reduce(arr, function(memo, str) {
            return memo + chr + str;
        });
    }

    t.equal(
        join(["a","b","c"], ":"),
        "a:b:c"
    );

    // PROBLEM: Determine the longest word using _.reduce

    var words = ['test', 'kim', 'winning', 'lol'];

    function longest(arr) {
        return _.reduce(arr, function(a, b) {
            if (a.length > b.length) {
                return a;
            }
            return b;
        });
    }

    t.deepEqual(
        longest(words),
        'winning'
    );

    t.end();
});

test('filter exists', function(t) {
    // A couple of simple helpers that need to be implemented
    // to show of a powerful trick when calling functions

    function exists(x) {
        return x != null;
    }

    function truthy(x) {
        return exists(x) && x !== false;
    }

    var values = ['user', null, false, 0, 'test', 1];

    // Every time we see the arguments "match up" and are passed
    // through to the function in the callback, as with the `x`
    // below, we don't need to create the callback function at all.
    // That means that this:
    _.filter(values, function(x) {
        return exists(x);
    });
    // is the same as:
    _.filter(values, exists);

    // This is called point-free style, we'll see quite a bit of this today!
    // (There are some things to think about. We'll look at those later.)

    t.deepEqual(
        values.filter(exists),
        ['user', false, 0, 'test', 1]
    );

    t.deepEqual(
        values.filter(truthy),
        ['user', 0, 'test', 1]
    );

    // PROBLEM: Sum the array using `_.reduce`, following a point-free style.

    var nums = [1,2,3,4,5];

    var plus = function(a, b) {
        return a + b;
    }

    var sum = _.reduce(nums, plus, 0);

    t.equal(sum, 15);

    t.end();
});

test('map, filter with context', function(t) {
    // Sometimes you want to use map, filter, reduce or other functions
    // inside an object and you want want to access something on
    // `this`. Thankfully this is very simple on _.filter and friends --
    // just add the context, i.e. what you want `this` to be, as the
    // last parameter:

    var ages = [20, 30, 75, 156, 200];

    var people = {
        maxAge: 120,
        validAges: function(ages) {

            return _.filter(ages, function(age) {
                return age < this.maxAge;
            }, this);

            // here we specified that we want `this` inside the function in the
            // filter be the same as `this` is inside the current function
        }
    };

    t.deepEqual(
        people.validAges(ages),
        [20, 30, 75]
    );

    // PROBLEM: Fix our filter implementation below so it handles the
    // specified context

    var filter = function(items, fn, context) {
        var arr = [];
        for (var i = 0; i < items.length; i++) {
            if (fn.call(context, items[i], i)) {
                arr.push(items[i]);
            }
        }
        return arr;
    }

    var people2 = {
        maxAge: 120,
        validAges: function(ages) {
            return filter(ages, function(age) {
                return age < this.maxAge;
            }, this);
        }
    };

    t.deepEqual(
        people2.validAges(ages),
        [20, 30, 75]
    );

    t.end();
});

