function getData(ID, getNextData) {
  setTimeout(() => {
    console.log("Data:", ID);
    if (getNextData) {
      getNextData();
    }
  }, 2000);
}
// this is type of condition is known as callback hell,....it is solved by---> Promise(solved only storage problem)
getData(1, () => {
  getData(2, () => {
    getData(3, () => {
      getData(4);
    });
  });
});
