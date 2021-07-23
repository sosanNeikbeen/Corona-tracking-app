const elements = {
  table: document.getElementById("tbody"),
  pagination: document.getElementById("pagination"),
  searchInput: document.getElementById("search"),
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

  tableData.forEach((item) => {
    let row = "<tr>";

    row += `<td>${item.Country}</td>`;
    const date = new Date(item.Date).toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    });
    row += `<td>${date}</td>`;
    row += `<td>${item.NewConfirmed}</td>`;
    row += `<td>${item.NewDeaths}</td>`;
    row += `<td>${item.TotalConfirmed}</td>`;
    row += `<td>${item.TotalDeaths}</td>`;
    row += `<td>${item.TotalRecovered}</td>`;
    rows += row + "<tr>";
  });

  elements.table.innerHTML = rows;
};

let searchValue;
const onSearch = (data) => {
  searchValue = elements.searchInput.value;
  searchValue = searchValue.toLowerCase();
  if (searchValue) {
    const filteredCountry = data.filter((el) => {
      return el.Slug === searchValue;
    });
    loadTable(filteredCountry);
  } else {
    const perPageData = getResultPerPage(pagination.page);
    loadTable(perPageData);
  }
};

const controller = async () => {
  // 1. Call getData function
  data = await getData();
  const perPageData = getResultPerPage(pagination.page);
  loadTable(perPageData);

  const pageItem = createPagination();
  elements.pagination.insertAdjacentHTML("afterbegin", pageItem);
  // console.log(pageItem);

  addClickHandler();
  elements.searchInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      onSearch(data);
    }
  });
};

// const changeDateFormat = (dates) => {
//   date = new Date(dates);
//   year = date.getFullYear();
//   month = date.getMonth() + 1;
//   dt = date.getDate();

//   if (dt < 10) {
//     dt = "0" + dt;
//   }
//   if (month < 10) {
//     month = "0" + month;
//   }
//   dates = year + "-" + month + "-" + dt;

//   return dates;
// };

const getResultPerPage = (page) => {
  const start = (page - 1) * pagination.resultPerPage;
  const end = page * pagination.resultPerPage;
  return data.slice(start, end);
};

const createPagination = () => {
  const numOfPages = Math.ceil(data.length / pagination.resultPerPage);
  console.log(numOfPages);

  if (pagination.page === 1 && numOfPages > 1) {
    return `<button type="button" class="btn btn-outline-light rounded-pill" disabled>
    <i class="bi bi-arrow-left-circle"></i>
    <span>page ${pagination.page - 1}</span>
  </button> <button
  type="button"
  class="btn btn-outline-light rounded-circle active" disabled
>
  <span>${pagination.page} </span>
</button> <button data-goto="${
      pagination.page + 1
    }" type="button" class="btn btn-outline-light rounded-pill">
<span>page ${pagination.page + 1}</span>
<i class="bi bi-arrow-right-circle"></i>
</button> `;
  }
  if (pagination.page === numOfPages && numOfPages > 1) {
    return `<button data-goto="${
      pagination.page - 1
    }" type="button" class="btn btn-outline-light rounded-pill" >
    <i class="bi bi-arrow-left-circle"></i>
    <span>page ${pagination.page - 1}</span>
  </button> <button
  type="button"
  class="btn btn-outline-light rounded-circle" disabled
>
  <span>${pagination.page} </span>
</button> <button type="button" class="btn btn-outline-light rounded-pill" disabled>
<span>page ${pagination.page + 1}</span>
<i class="bi bi-arrow-right-circle"></i>
</button> `;
  }
  if (pagination.page < numOfPages) {
    return `<button data-goto="${
      pagination.page - 1
    }" type="button" class="btn btn-outline-light rounded-pill">
    <i class="bi bi-arrow-left-circle"></i>
    <span>page ${pagination.page - 1}</span>
  </button> <button
  type="button"
  class="btn btn-outline-light rounded-circle" disabled
>
  <span>${pagination.page} </span>
</button> <button data-goto="${
      pagination.page + 1
    }" type="button" class="btn btn-outline-light rounded-pill">
<span>page ${pagination.page + 1}</span>
<i class="bi bi-arrow-right-circle"></i>
</button> `;
  }
  return "";
};

const addClickHandler = () => {
  elements.pagination.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    let goToPage = btn.dataset.goto;

    const paginated = getResultPerPage(goToPage);
    loadTable(paginated);
    createPagination();
  });
};

controller();
