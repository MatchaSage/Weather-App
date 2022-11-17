const weatherKey = "c6abf5b776e139b018a9479cb404a430";
async function getData(location) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherKey}&units=imperial`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  let parsed = await JSON.stringify(data);
  console.log(parsed);
}

getData("Canal Fulton");
