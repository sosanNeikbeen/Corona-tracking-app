const elements = {
  table: document.getElementById("tbody"),
  pagination: document.getElementById("pagination"),
  searchInput: document.getElementById("search"),
  previousButton: document.querySelector(".prev"),
  nextButton: document.querySelector(".nxt"),
  pageNum: document.querySelector(".page-number"),
  sortDropdown: document.querySelector("#sortDropdown"),
  spinner: document.querySelector("#spinner"),
};

const pagination = {
  page: 1,
  resultPerPage: 10,
};

let data;
const getData = async () => {
  const response = await instance.get("/summary");
  return response.data.Countries;
};

const loadTable = (tableData) => {
  let rows = "";

  if (tableData.length === 0) {
    let row = "<tr";
    row += `<td >No data found</td>`;
    rows += row + "<tr>";
  }
  tableData.forEach((item) => {
    let row = "<tr>";
    row += `<td>${item.Country}</td>`;

    const formatedDate = changeDateFormat(item.Date);
    row += `<td>${formatedDate}</td>`;
    row += `<td class=${item.NewConfirmed <= 1000 ? "bg-green" : "bg-red"}>${
      item.NewConfirmed
    }</td>`;
    row += `<td>${item.NewDeaths}</td>`;
    row += `<td>${item.TotalConfirmed}</td>`;
    row += `<td>${item.TotalDeaths}</td>`;
    row += `<td>${item.TotalRecovered}</td>`;
    rows += row + "<tr>";
  });

  elements.table.innerHTML = rows;
};

let searchValue;
const onSearch = () => {
  searchValue = elements.searchInput.value;
  searchValue = searchValue.replace(/\s+/g, "-").toLowerCase();
  if (searchValue) {
    const filteredCountry = data.filter((el) => {
      return el.Slug === searchValue;
    });
    loadTable(filteredCountry);
    elements.pagination.style.display = "none";
  } else {
    const perPageData = getResultPerPage(pagination.page);
    loadTable(perPageData);
    elements.pagination.style.display = "block";
  }
};

const sortData = async () => {
  let dropdownValue = elements.sortDropdown.value;
  if (dropdownValue === "highestCase") {
    data = data.sort((a, b) => b.NewConfirmed - a.NewConfirmed);
    const perPageData = getResultPerPage(pagination.page);
    return loadTable(perPageData);
  }

  if (dropdownValue === "lowestCase") {
    data = data.sort((a, b) => a.NewConfirmed - b.NewConfirmed);
    const perPageData = getResultPerPage(pagination.page);
    return loadTable(perPageData);
  }

  data = await getData();
  const perPageData = getResultPerPage(pagination.page);
  loadTable(perPageData);
};

const handleNext = () => {
  const numOfPages = Math.ceil(data.length / pagination.resultPerPage);
  if (pagination.page === numOfPages) {
    return;
  }
  pagination.page = pagination.page + 1;

  const perPageData = getResultPerPage(pagination.page);
  loadTable(perPageData);
  elements.pageNum.innerHTML = pagination.page;
};

const handlePrevious = () => {
  if (pagination.page === 1) {
    return;
  }

  pagination.page = pagination.page - 1;
  const perPageData = getResultPerPage(pagination.page);
  loadTable(perPageData);
  elements.pageNum.innerHTML = pagination.page;
};

const controller = async () => {
  //Call getData function
  data = await getData();
  elements.spinner.style.display = "none";

  //show 10 results per page
  const perPageData = getResultPerPage(pagination.page);
  loadTable(perPageData);

  //search country on keypress
  elements.searchInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      onSearch();
    }
  });

  elements.sortDropdown.addEventListener("change", (event) => {
    sortData();
  });
  elements.previousButton.addEventListener("click", handlePrevious);
  elements.nextButton.addEventListener("click", handleNext);
};

const changeDateFormat = (dates) => {
  date = new Date(dates);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  dates = year + "-" + month + "-" + dt;

  return dates;
};

const getResultPerPage = (page) => {
  const start = (page - 1) * pagination.resultPerPage;
  const end = page * pagination.resultPerPage;
  return data.slice(start, end);
};

controller();
