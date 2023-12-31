// fetching background image
fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById(
      "author"
    ).textContent = `Image by: ${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
    console.error(err);
  });

// fetching bitcoin data
fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>
    `;

    function handleClick() {
      document.getElementById("crypto").innerHTML += `
      <p>🎯: $${data.market_data.current_price.usd}</p>
      <p>👆: $${data.market_data.high_24h.usd}</p>
      <p>👇: $${data.market_data.low_24h.usd}</p>
    `;
    }
    document
      .getElementById("crypto-top")
      .addEventListener("click", handleClick);
  })
  .catch((err) => console.error(err));

// get and display current time

// function getCurrentTime() {
//   const date = new Date();
//   document.getElementById("time").textContent = date.toLocaleTimeString(
//     "en-us",
//     { timeStyle: "short" }
//   );
// }
// setInterval(getCurrentTime, 1000);

function getCurrentTime() {
  const day = new Date();
  const hour = day.getHours();
  const minutes = day.getMinutes();
  document.getElementById("hour").textContent = `${hour}`;
  document.getElementById("minutes").textContent = `${minutes}`;
  if (minutes <= 9) {
    document.querySelector("#minutes").innerHTML = "0" + minutes;
  } else {
    document.querySelector("#minutes").innerHTML = minutes;
  }
}
// getCurrentTime();
setInterval(getCurrentTime, 1000);

// get current position for weather api
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
    })
    .catch((err) => console.error(err));
});

// quote generator
async function getQuote() {
  try {
    await fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        const quoteWithoutAuthor = (document.getElementById(
          "quote"
        ).innerText = `"${data.content}"`);

        function mouseOverQuote() {
          document.getElementById("quote").style.display = "none";
          document.getElementById("quoteWithAuthor").style.display = "block";
          document.getElementById(
            "quoteWithAuthor"
          ).innerText = `${quoteWithoutAuthor}
           - ${data.author}`;
          document.getElementById("quoteWithAuthor").style.margin = "10px";
        }

        function mouseOutQuote() {
          document.getElementById("quote").style.display = "block";
          document.getElementById("quoteWithAuthor").style.display = "none";
        }
        document
          .getElementById("quote")
          .addEventListener("mouseover", mouseOverQuote);
        document
          .getElementById("quote")
          .addEventListener("mouseout", mouseOutQuote);
      });
  } catch (error) {
    console.error("Error:", error);
  }
}
window.addEventListener("load", getQuote);

// greeting user
const date = new Date();
const hours = date.getHours();
const greeting = document.getElementById("greeting");
let user = "Natalia";

if (hours >= 4 && hours <= 12) {
  greeting.textContent = `Good morning, ${user}`;
} else if (hours >= 12 && hours <= 18) {
  greeting.textContent = `Good afternoon, ${user}`;
} else if (hours < 4 || hours > 18) {
  greeting.textContent = `Good evening, ${user}`;
}

function handleInputChange(event) {
  document.getElementById("focus").value = event.target.value;
  document.getElementById("focus").style.display = "none";
  document.getElementById("message").textContent = event.target.value;
}

function editing() {
  document.getElementById("focus").style.display = "block";
}

document.getElementById("focus").addEventListener("change", handleInputChange);
document.getElementById("message").addEventListener("click", editing);

// Todo section
function handleTodoClick() {
  const todoElement = document.getElementById("todo-app");
  todoElement.style.display = "block";
  todoElement.innerHTML = `
    <div class="todo-app-top">
      <h3 class="todo-app-header">Today</h3>
      <img src="./icons/more.png" alt="more icon" class="more-icon" />
      <img src="./icons/close.png" alt="close-icon" class="close-icon" id="close-icon" />
    </div>
    <p id="todo-app-text">Add a todo to get started</p>
    <button id="todo-app-button" class="todo-app-button">New todo</button>
    <ul id="todo-task-block"></ul>
    <input type="text" placeholder="New Todo" class="todo-app-input" id="todo-app-input" />
  `;
  // click on todo button and displaying input for adding todo-text
  function handleTodoButtonClick() {
    document.getElementById("todo-app-button").style.display = "none";
    document.getElementById("todo-app-input").style.display = "block";
  }
  document
    .getElementById("todo-app-button")
    .addEventListener("click", handleTodoButtonClick);

  // close todo section with close-icon
  function handleCloseIconClick() {
    todoElement.style.display = "none";
  }
  document
    .getElementById("close-icon")
    .addEventListener("click", handleCloseIconClick);

  // handle input change
  function handleInputChange(event) {
    const inputValue = document.getElementById("todo-app-input").value = event.target.value;
    document.getElementById("todo-app-text").style.display = "none";
    todoElement.style.height = "auto";
    document.getElementById("todo-app-input").style.marginTop = "40px";

    // document.getElementById("todo-task-block").innerHTML += `
    //   <li>
    //     <input type="checkbox" name="checkbox" class="checkbox"
    //       onchange="handleCheckBoxChange()" />
    //     <span class="task">${inputValue}</span>
    //   </li>
    // `

    document.getElementById("todo-task-block").innerHTML += `
      <li>
        <label class="task"><input type="checkbox" name="checkbox" class="checkbox"
          onchange="handleCheckBoxChange()" />${inputValue}</label>
      </li>
    `
    document.getElementById("todo-task-block").style.display = "flex";
    document.getElementById("todo-task-block").style.flexDirection = "column";
    document.getElementById("todo-task-block").style.gap = "10px";
    document.getElementById("todo-task-block").style.marginTop = "20px";
    document.getElementById("todo-app-input").value = "";
  }
  document.getElementById("todo-app-input").addEventListener("change", handleInputChange);
}
document.getElementById("todo").addEventListener("click", handleTodoClick);

// handle checkbox state change
function handleCheckBoxChange() {
  document.querySelector("li").addEventListener("click", function (e) {
    if (e.target.nodeName !== "span") {
    return;
  }
    e.target.setAttribute("id", e.target.checked ? 1 : 0);
  })
}

// if (document.querySelector(".checkbox").checked) {
//   document.querySelector(".task").classList.add("line-through")
// }