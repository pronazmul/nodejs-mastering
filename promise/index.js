fetch('https://jsonplaceholder.typicode.com/todos/100')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((er) => {
    console.log({ er })

})
