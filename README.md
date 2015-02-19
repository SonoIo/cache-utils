
# Cache

Very simple in memory cache for browser and node.js.
It provides a very basic ttl implementation.

## set(name, value, [ttl])

Store *value* in the cache with *name*. 
*ttl* sholud be any valid [moment duration format](http://momentjs.com/docs/#/durations/creating/). Preferred form is:

```
var ttl = {
    seconds: 10,
    minutes: 20,
    hours: 1
};
```
## get(name)

Returns the stored cached value. If *ttl* expires will return null.

## remove(name)

Removes related value.

## pop(name)

Removes related value and returns the value.

## clear()

Clear in memory storage.
