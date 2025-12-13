console.log(1);
console.log(2);
console.log(3);
console.log(4);
abc();
console.log(5);
console.log(6);
console.log(7);

function abc() {
  setTimeout(() => {
    console.log("hello");
  }, 2000);
}

function sum(a, b) {
  x = a + 1;
  y = b + 1;
  return x + y;
}
// this function is defined in backend or different file..
function Addition(p, q, JOR) {
  // here, JOR is a parameter in Addition who take sum as value..
  m = p + 1;
  n = q - 1;
  let result = JOR(m, n); // here, JOR as a sum with parameter goes to sum function and return the value..back here
  console.log(result);
}

Addition(2, 3, sum);
