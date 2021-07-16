const instance = axios.create({
  baseURL: "https://api.covid19api.com/",
});

window.cronaData = [];
instance.get("/summary").then(function (response) {
  const res = response.data.Global;
  window.cronaData.push(res);
});
