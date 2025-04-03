// 🔑 OpenWeather API 키 입력
const apiKey = "4d5d8d915d1e9926b5d2cb5881856536";
const city = "Toronto";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// 요소 불러오기
const locationEl = document.getElementById("location");
const iconEl = document.getElementById("icon");
const descEl = document.getElementById("description");
const tempEl = document.getElementById("temp");

// 날씨 불러오기
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data); // 콘솔로 데이터 확인 (선택)

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    iconEl.src = iconUrl;
    iconEl.alt = data.weather[0].description;
    descEl.textContent = data.weather[0].description;
    tempEl.textContent = `${Math.round(data.main.temp)} °C`;
  })
  .catch(error => {
    locationEl.textContent = "Failed to load weather 😢";
    console.error("Error:", error);
  });
