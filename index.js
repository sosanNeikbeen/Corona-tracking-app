const elements = {
  globalConfirmed: document.getElementById("globalConfirmed"),
  allCases: document.getElementById("allCases"),
  globalRecovered: document.getElementById("globalRecovered"),
  globalDeaths: document.getElementById("globalDeaths"),
  scrollUpButton: document.getElementById("scrollUp"),
};

const getGlobalCoronaCases = async () => {
  const data = await instance.get("/summary");
  const response = data.data.Global;
  const TotalConfirmed = response.TotalConfirmed;
  const totalRecovered = response.TotalRecovered;
  const totaldeaths = response.TotalDeaths;
  elements.globalConfirmed.innerHTML = TotalConfirmed;
  elements.allCases.innerHTML = TotalConfirmed;
  elements.globalRecovered.innerHTML = totalRecovered;
  elements.globalDeaths.innerHTML = totaldeaths;
};

getGlobalCoronaCases();

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
  scroll();
};

const scroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    elements.scrollUpButton.style.display = "block";
  } else {
    elements.scrollUpButton.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the page
const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

elements.scrollUpButton.addEventListener("click", scrollToTop);
