const pagination = {
  page: 1,
  resultPerPage: 5,
};

let data;
const paginationElement = document.getElementById("pagination");

const getData = () => {
  instance.get("/summary").then((response) => {
    data = response.data.Countries;

    const perPageData = getResultPerPage(pagination.page);
    loadTable(perPageData);

    const pageItem = createPagination();
    paginationElement.insertAdjacentHTML("afterbegin", pageItem);
    console.log(pageItem);
  });
};

// 1. Call getData function
getData();

const loadTable = (tableData) => {
  const tableBody = document.getElementById("tbody");
  let rows = "";

  tableData.forEach((item) => {
    let row = "<tr>";

    row += `<td>${item.Country}</td>`;
    row += `<td>${item.Date}</td>`;
    row += `<td>${item.NewConfirmed}</td>`;
    row += `<td>${item.NewDeaths}</td>`;
    row += `<td>${item.TotalConfirmed}</td>`;
    row += `<td>${item.TotalDeaths}</td>`;
    row += `<td>${item.TotalRecovered}</td>`;
    rows += row + "<tr>";
  });

  tableBody.innerHTML = rows;
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
  paginationElement.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;

    let goToPage = btn.dataset.goto;

    const x = getResultPerPage(goToPage);
    loadTable(x);
  });
};

addClickHandler();
