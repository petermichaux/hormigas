(function() {

    buster.testCase('objectSetSuite', {

        "test set starts with no elements": function() {
            var s = new hormigas.ObjectSet();
            var alpha = {};
            assert.same(0, s.length, "set should start empty");
            assert.same(false, s.has(alpha), "an empty list should not have an alpha element");
        },

        "test constructor with arguments uses has": function() {
            var alpha = {};
            var beta = {};
            var s = new hormigas.ObjectSet(alpha, beta, alpha);
            assert.same(2, s.length);
            assert.same(true, s.has(alpha));
            assert.same(true, s.has(beta));
        },

        "test add and delete return value": function() {
            var s = new hormigas.ObjectSet();
            var alpha = {};
            assert.same(true, s.add(alpha), 'adding an item not in the list should return true.');
            assert.same(false, s.add(alpha), 'adding an item in the list should return false.');
            assert.same(true, s['delete'](alpha), 'deleting an item in the list should return true.');
            assert.same(false, s['delete'](alpha), 'deleting an item not in the list should return false');
        },

        "test has": function() {
            var s = new hormigas.ObjectSet();
            var alpha = {};
            s.add(alpha);
            assert.same(true, s.has(alpha));
        },

        "test clear": function() {
            var s = new hormigas.ObjectSet();
            var alpha = {};
            var beta = {};
            s.add(alpha);
            s.add(beta);
            assert.same(true, s.has(alpha));
            assert.same(true, s.has(beta));
            assert.same(true, s.clear(), "clearing a non-clear set should return true");
            assert.same(0, s.length);
            assert.same(false, s.has(alpha));
            assert.same(false, s.has(beta));
            assert.same(false, s.clear(), "clearing a clear set should return false");
        },

        "test hormigas.ObjectSet length property": function() {
            var s = new hormigas.ObjectSet();
            var alpha = {};
            var beta = {};
            assert.same(0, s.length, "s.length should start life at zero.");
            s.add(alpha);
            assert.same(1, s.length, "The length should increment to one after adding first element.");
            s.add(alpha);
            assert.same(1, s.length, "After adding the same element again the length should not change.");
            s.add(beta);
            assert.same(2, s.length, "After adding two elements the length should be two.");
            s['delete'](alpha);
            assert.same(1, s.length, "After removing an element the length should decrement.");
            s['delete'](alpha);
            assert.same(1, s.length, "Removing an element not in the set should not change the length.");
            s['delete'](beta);
            assert.same(0, s.length, "Removing last element in set should return the length to zero.");
            s['delete'](beta);
            assert.same(0, s.length, "Removing it again should still keep it at zero.");
        },

        "test length properties are independent on multiple objects": function() {
            var s0 = new hormigas.ObjectSet();
            var s1 = new hormigas.ObjectSet();

            var alpha = {};
            var beta = {};
            var gamma = {};

            assert.same(0, s0.length);
            assert.same(0, s1.length);

            s0.add(alpha);
            assert.same(1, s0.length);
            assert.same(0, s1.length);

            s1.add(beta);
            s1.add(gamma);
            assert.same(1, s0.length);
            assert.same(2, s1.length);
        },

        "test elements are independent on multiple objects": function() {
            var s0 = new hormigas.ObjectSet();
            var s1 = new hormigas.ObjectSet();

            var alpha = {};
            var beta = {};

            s0.add(alpha);
            assert.same(true, s0.has(alpha));
            assert.same(false, s1.has(alpha));

            s1.add(beta);
            assert.same(false, s0.has(beta));
            assert.same(true, s1.has(beta));
        },

        "test toArray": function() {
            var s = new hormigas.ObjectSet();
            var alpha = {};
            var beta = {};
            assert.arrayEquals([], s.toArray());
            s.add(alpha);
            s.add(beta);
            assert.arrayEquals([alpha, beta], s.toArray());
        },

        "test forEach": function() {
            var alpha = {};
            var beta = {};
            var s = new hormigas.ObjectSet(alpha, beta);
            var t = [];
            s.forEach(function(el) {
                t.push(el);
            });
            assert.arrayEquals([alpha, beta], t);
        },

        "test some": function() {
            var alpha = {length:5};
            var beta = {length:4};
            var gamma = {length:5};
            var s = new hormigas.ObjectSet(alpha, beta, gamma);
            assert.same(true, s.some(function(el) {return el.length === 5;}));
            assert.same(false, s.some(function(el) {return el.length === 6;}));
        },

        "test every": function() {
            var alpha = {length:5};
            var beta = {length:4};
            var gamma = {length:5};
            var s = new hormigas.ObjectSet(alpha, beta, gamma);
            assert.same(false, s.every(function(el) {return el.length === 5;}));
            assert.same(true, s.every(function(el) {return typeof el === 'object';}));
        },

        "test every on empty set is true": function() {
            var s = new hormigas.ObjectSet();
            assert.same(true, s.every(function(el) {return false;}));
        },

        "test reduce": function() {
            var zero = {value:0};
            var one = {value:1};
            var two = {value:2};
            var three = {value:3};
            var four = {value:4};
            var s = new hormigas.ObjectSet(zero, one, two, three, four);
            var result = s.reduce(function(previous, current) {
                return {value: previous.value + current.value};
            });
            assert.same(10, result.value);
        },

        "test reduce with initial value": function() {
            var zero = {value:0};
            var one = {value:1};
            var two = {value:2};
            var three = {value:3};
            var four = {value:4};
            var s = new hormigas.ObjectSet(zero, one, two, three, four);
            var initial = 5;
            var result = s.reduce(function(previous, current) {
                return previous + current.value;
            }, initial);
            assert.same(15, result);
        },

        "test reduce empty set": function() {
            var s = new hormigas.ObjectSet();
            var initial = {value:5625};
            var result = s.reduce(function(previous, current) {
                return {value: previous.value + current.value};
            }, initial);
            assert.same(initial.value, result.value);
        },

        "test empty set has isEmpty true": function() {
            var s = new hormigas.ObjectSet();
            assert.same(true, s.isEmpty());
        },

        "test non-empty set has isEmpty false": function() {
            var s = new hormigas.ObjectSet({});
            assert.same(false, s.isEmpty());
        },

        "test emptying a set causes isEmpty to true again": function() {
            var one = {};
            var s = new hormigas.ObjectSet(one);
            s['delete'](one);
            assert.same(true, s.isEmpty());
        }

    });

}());
