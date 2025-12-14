function getData(ID) {

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (ID === 3) {
        reject("ID not found");
      } else {
        console.log("Data:", ID);
        resolve("Task Done");
      }
    }, 5000);
  });
}
//const abc = getData(3);   when this condition is true it shows an error id not found

// whenever promise is used firstly it return promise--resolve or reject (i pending status,or in fulfilled or reject)

getData(1) // promise chaining
  .then((res) => {
    return getData(2);
  })
  .then((res) => {
    return getData(3);
  })
  .then((res) => {
    return getData(4);
  })
  .catch((rej) => {
    console.log(rej);
  });
