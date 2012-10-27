Hormigas
========

JavaScript collection classes.


Examples
--------

An ObjectSet instance can hold objects (not primitives as a performance tradeoff.)

```javascript
var alpha = {length: 5};
var beta  = {length: 4};
var gamma = {length: 5};
var set = new hormigas.ObjectSet(alpha, beta, alpha);
set.length; // 2
set.has(alpha);
set['delete'](beta);
set.add(gamma);
set.toArray(); // [alpha, gamma] or [gamma, alpha]
set.forEach(function(element) {
    console.log(element.length);
});
set.every(function(element) {
    return element.length > 0;
}); // true
set.some(function(element) {
    return element.length > 0;
}); // true
set.reduce(function(accumulator, element) {
    return {value: accumulator.length + element.length};
}); // 10
set.map(function(element) {
    return element.length;
}); // [5, 5]
set.filter(function(element) {
    return element.length > 4;
}); // [alpha, gamma] or [gamma, alpha]
set.empty();
```

You can also mixin ObjectSet functionality into other constructors

```javascript
app.MyModel = function() {
    hormigas.ObjectSet.call(this);
};
hormigas.ObjectSet.mixin(app.MyModel.prototype);
```

or mixin to just a single object.

```javascript
var obj = {};
hormigas.ObjectSet.mixin(obj);
```


Downloads
---------

See http://peter.michaux.ca/downloads/hormigas/ for production ready builds.


Status
------

Ready.


Browser Support
---------------

Tested working in IE6 and newer browsers by a variety of manufacturers.


Dependencies
------------

None.


Source Code
-----------

GitHub: https://github.com/petermichaux/hormigas


Build
-----

To build the production ready files, you need [JSMin](http://www.crockford.com/javascript/jsmin.html) or any other tool with the same command line interface. Then just type "make" at the command line and look in the build directory for the results.

For the record, this is how I installed JSMin. Note that I have /Users/peter/bin in my PATH.

```sh
$ cd ~/tmp
$ curl -O https://raw.github.com/douglascrockford/JSMin/master/jsmin.c
$ gcc -o jsmin jsmin.c
$ mv jsmin ~/bin
$ rm jsmin.c
$ which jsmin
/Users/peter/bin/jsmin
```


Tests
-----

To run the automated tests, open tst/runner.html in a web browser.


Author
------

Peter Michaux<br>
petermichaux@gmail.com<br>
http://peter.michaux.ca/<br>
[@petermichaux](https://twitter.com/petermichaux)
