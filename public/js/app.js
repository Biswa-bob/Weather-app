const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const locate = search.value;

  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";
  fetch("/weather?location=" + locate).then((response) => {
    response.json().then((data) => {
      //console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.weather;
      }
    });
  });
});
