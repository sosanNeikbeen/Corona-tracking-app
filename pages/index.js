let res;

const getData = () => {
  instance.get("/summary").then((response) => {
    res = response.data.Countries;
    createTable(res);
  });
};

const createTable = (coronaData) => {
  const tbody = document.getElementById("tbody");
  perPage = getResultPerPage(2);
  coronaData.map((el) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    const td7 = document.createElement("td");
    td1.innerHTML = el.Country;
    td2.innerHTML = el.Date;
    td3.innerHTML = el.NewConfirmed;
    td4.innerHTML = el.NewDeaths;
    td5.innerHTML = el.TotalConfirmed;
    td6.innerHTML = el.TotalDeaths;
    td7.innerHTML = el.TotalRecovered;
    if (td3.innerHTML <= 1000) {
      td3.className = " bg-green ";
    } else {
      td3.className = "bg-red ";
    }
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tbody.appendChild(tr);
  });
};

getData();
