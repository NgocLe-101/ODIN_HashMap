import HashMap from "./HashMap.js";

const test = new HashMap({
  loadFactor: 0.75,
});

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.keys());
test.set("hat", "red");
console.log(
  test.entries().forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  })
);
test.set("moon", "silver");
console.log(test.hash("apple"));
test.set("apple", "green");
test.set("banana", "gold");
console.log(
  test.entries().forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  })
);
