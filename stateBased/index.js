const App = function _App() {
  return `
  <body>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../assets/images/1.png" alt="" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link active h5" aria-current="page" href="#"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active h5" href="#">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active h5" href="#">Prevention</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active h5" href="#">News</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active h5" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="slider_area" id="home">
    <div
      class="d-flex flex-column align-items-center justify-content-center mt-5 slider"
    >
      <div class="rounded mx-auto d-block">
        <img class="rotate" src="../assets/images/01.png" alt="" />
      </div>
      <div class="container-sm mt-5">
      <div class="card bg-dark">
        <div class="table-responsive">
          <table class="table table-dark">
            <thead>
              <tr>
                <th>Country</th>
                <th>Date</th>
                <th>New confirmed</th>
                <th>New death</th>
                <th>Total confirmed</th>
                <th>Total death</th>
                <th>${_App.state.data.Date}</th>
              </tr>
            </thead>
            <tbody id="tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
     
      </div>
  
    

  
    `;
};

App.state = {
  data: [],
};

const getData = () => {
  document.getElementById("app").innerHTML = App();
  instance.get("/summary").then(function (response) {
    const res = response.data;
    App.state.data.push(res);
  });
};
console.log(App.state.data);

getData();
