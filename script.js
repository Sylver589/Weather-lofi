let API_KEY = "a35e1fd6abc31b1aaf2f1fd996c16cb4";

let appState = {
  city: "Toronto",
  units: "metric",
  theme: "night",
  mediaIndex: 0,
  isPlaying: false
};

let el = {
  bgVideo: document.getElementById("bgVideo"),
  bgImage: document.getElementById("bgImage"),
  themeSelect: document.getElementById("themeSelect"),
  cityInput: document.getElementById("cityInput"),
  cityBtn: document.getElementById("cityBtn"),
  celsiusBtn: document.getElementById("celsiusBtn"),
  fahrenheitBtn: document.getElementById("fahrenheitBtn"),
  musicPlayer: document.getElementById("musicPlayer"),
  musicToggle: document.getElementById("musicToggle"),
  prevSongBtn: document.getElementById("prevSongBtn"),
  nextSongBtn: document.getElementById("nextSongBtn"),
  shuffleSongBtn: document.getElementById("shuffleSongBtn"),
  musicLabel: document.getElementById("musicLabel"),
  forecastTrack: document.getElementById("forecastTrack"),
  forecastPrev: document.getElementById("forecastPrev"),
  forecastNext: document.getElementById("forecastNext"),
  timeText: document.getElementById("timeText"),
  location: document.getElementById("location"),
  description: document.getElementById("description"),
  temp: document.getElementById("temp"),
  unitSymbol: document.getElementById("unitSymbol"),
  feelsLike: document.getElementById("feelsLike"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind"),
  condition: document.getElementById("condition")
};

let themeLibrary = {
  clear: {
    tint: "rgba(255, 178, 95, 0.26)",
    media: [
      {
        type: "video",
        src: "images/Sunny.mp4",
        music: "music/Lofi-Sunny.mp3",
        label: "Sunny Lo-fi"
      },
      {
        type: "video",
        src: "images/Sunny.mkv",
        music: "music/Lofi-Sunny2.mp3",
        label: "Sunny Lo-fi 2"
      }
    ]
  },

  night: {
    tint: "rgba(40, 70, 140, 0.34)",
    media: [
      {
        type: "image",
        src: "images/Clear_Night.gif",
        music: "music/Lofi-Night.mp3",
        label: "Night Lo-fi"
      },
      {
        type: "video",
        src: "images/Clear-night.mp4",
        music: "music/Lofi-Night2.mp3",
        label: "Night Lo-fi 2"
      }
    ]
  },

  clouds: {
    tint: "rgba(235, 165, 95, 0.24)",
    media: [
      {
        type: "video",
        src: "images/Cloudy.mp4",
        music: "music/Lofi-Cloudy.mp3",
        label: "Cloudy Lo-fi"
      },
      {
        type: "image",
        src: "images/Cloudy2.gif",
        music: "music/Lofi-Cloudy2.mp3",
        label: "Cloudy Lo-fi 2"
      }
    ]
  },

  fog: {
    tint: "rgba(190, 160, 130, 0.24)",
    media: [
      {
        type: "video",
        src: "images/Fog.mp4",
        music: "music/Lofi-Fog.mp3",
        label: "Fog Lo-fi"
      },
      {
        type: "video",
        src: "images/Fog2.mp4",
        music: "music/Lofi-Fog2.mp3",
        label: "Fog Lo-fi 2"
      }
    ]
  },

  rain: {
    tint: "rgba(70, 130, 165, 0.34)",
    media: [
      {
        type: "image",
        src: "images/rain.gif",
        music: "music/Lofi-rain.mp3",
        label: "Rain Lo-fi"
      },
      {
        type: "image",
        src: "images/rain2.gif",
        music: "music/Lofi-rain2.mp3",
        label: "Rain Lo-fi 2"
      },
      {
        type: "image",
        src: "images/rain3.gif",
        music: "music/Lofi-Rain3.mp3",
        label: "Rain Lo-fi 3"
      }
    ]
  },

  snow: {
    tint: "rgba(105, 190, 220, 0.28)",
    media: [
      {
        type: "image",
        src: "images/snow.gif",
        music: "music/Lofi-Snow.mp3",
        label: "Snow Lo-fi"
      },
      {
        type: "image",
        src: "images/Snow2.gif",
        music: "music/Lofi-Snow2.mp3",
        label: "Snow Lo-fi 2"
      }
    ]
  },

  storm: {
    tint: "rgba(70, 80, 120, 0.36)",
    media: [
      {
        type: "image",
        src: "images/Storm.gif",
        music: "music/Lofi-Storm.mp3",
        label: "Storm Lo-fi"
      },
      {
        type: "video",
        src: "images/Storm.mp4",
        music: "music/Lofi-Storm2.mp3",
        label: "Storm Lo-fi 2"
      }
    ]
  },

  wind: {
    tint: "rgba(150, 115, 90, 0.28)",
    media: [
      {
        type: "image",
        src: "images/Wind.gif",
        music: "music/Lofi-Wind.mp3",
        label: "Wind Lo-fi"
      },
      {
        type: "video",
        src: "images/Windy2.mp4",
        music: "music/Lofi-Wind2.mp3",
        label: "Wind Lo-fi 2"
      }
    ]
  }
};

function currentThemePack() {
  return themeLibrary[appState.theme];
}

function currentMediaItem() {
  return currentThemePack().media[appState.mediaIndex];
}

function randomIndex(length, exclude = -1) {
  if (length <= 1) return 0;

  let next = Math.floor(Math.random() * length);

  while (next === exclude) {
    next = Math.floor(Math.random() * length);
  }

  return next;
}

function getUnitInfo() {
  return appState.units === "metric"
    ? { symbol: "°C", wind: "m/s" }
    : { symbol: "°F", wind: "mph" };
}

function updateUnitButtons() {
  let usingMetric = appState.units === "metric";

  el.celsiusBtn.classList.toggle("active", usingMetric);
  el.fahrenheitBtn.classList.toggle("active", !usingMetric);
  el.unitSymbol.textContent = getUnitInfo().symbol;
}

function updateMusicButton() {
  el.musicToggle.textContent = appState.isPlaying ? "⏸" : "▶";
}

function showVisual(mediaItem) {
  if (mediaItem.type === "video") {
    el.bgImage.style.opacity = "0";
    el.bgVideo.style.opacity = "1";

    if (!el.bgVideo.src.includes(mediaItem.src)) {
      el.bgVideo.src = mediaItem.src;
    }

    el.bgVideo.play().catch(() => {});
    return;
  }

  el.bgVideo.style.opacity = "0";
  el.bgImage.style.opacity = "1";
  el.bgImage.src = mediaItem.src;
}

function showMusic(mediaItem) {
  el.musicPlayer.src = mediaItem.music;
  el.musicLabel.textContent = mediaItem.label;

  if (appState.isPlaying) {
    el.musicPlayer.play().catch(() => {
      appState.isPlaying = false;
      updateMusicButton();
    });
  }
}

function applyTheme(themeName, useRandomMedia = true) {
  let pack = themeLibrary[themeName];
  if (!pack) return;

  appState.theme = themeName;

  if (useRandomMedia) {
    appState.mediaIndex = randomIndex(pack.media.length, appState.mediaIndex);
  } else if (appState.mediaIndex >= pack.media.length) {
    appState.mediaIndex = 0;
  }

  document.documentElement.style.setProperty("--theme-tint", pack.tint);

  let mediaItem = currentMediaItem();
  showVisual(mediaItem);
  showMusic(mediaItem);
}

function stepSong(direction) {
  let pack = currentThemePack();
  let total = pack.media.length;

  appState.mediaIndex = (appState.mediaIndex + direction + total) % total;
  showMusic(currentMediaItem());
}

function shuffleSong() {
  let pack = currentThemePack();
  appState.mediaIndex = randomIndex(pack.media.length, appState.mediaIndex);
  showMusic(currentMediaItem());
}

function toggleMusic() {
  if (appState.isPlaying) {
    el.musicPlayer.pause();
    appState.isPlaying = false;
    updateMusicButton();
    return;
  }

  el.musicPlayer.play()
    .then(() => {
      appState.isPlaying = true;
      updateMusicButton();
    })
    .catch(() => {
      appState.isPlaying = false;
      updateMusicButton();
    });
}

function tryStartMusic() {
  appState.isPlaying = true;
  updateMusicButton();

  el.musicPlayer.play().catch(() => {
    appState.isPlaying = false;
    updateMusicButton();
  });
}

function guessThemeFromWeather(condition) {
  let text = condition.toLowerCase();

  if (text.includes("thunderstorm")) return "storm";
  if (text.includes("rain") || text.includes("drizzle")) return "rain";
  if (text.includes("snow")) return "snow";
  if (
    text.includes("mist") ||
    text.includes("fog") ||
    text.includes("haze") ||
    text.includes("smoke")
  ) {
    return "fog";
  }
  if (text.includes("cloud")) return "clouds";

  return "clear";
}

function weatherUrl() {
  return `https://api.openweathermap.org/data/2.5/weather?q=${appState.city}&appid=${API_KEY}&units=${appState.units}`;
}

function forecastUrl() {
  return `https://api.openweathermap.org/data/2.5/forecast?q=${appState.city}&appid=${API_KEY}&units=${appState.units}`;
}

async function fetchJson(url) {
  let response = await fetch(url);
  let data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function renderCurrentWeather(data) {
  let { symbol, wind } = getUnitInfo();

  el.location.textContent = data.name;
  el.description.textContent = data.weather[0].description;
  el.temp.textContent = Math.round(data.main.temp);
  el.unitSymbol.textContent = symbol;
  el.feelsLike.textContent = `${Math.round(data.main.feels_like)}${symbol}`;
  el.humidity.textContent = `${data.main.humidity}%`;
  el.wind.textContent = `${data.wind.speed} ${wind}`;
  el.condition.textContent = data.weather[0].main;
}

function renderForecast(data) {
  let { symbol } = getUnitInfo();
  el.forecastTrack.innerHTML = "";

  let middayEntries = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  middayEntries.forEach((entry) => {
    let date = new Date(entry.dt_txt);
    let weekday = date.toLocaleDateString("en-US", { weekday: "short" });

    let card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <p>${weekday}</p>
      <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" alt="${entry.weather[0].description}">
      <strong>${Math.round(entry.main.temp)}${symbol}</strong>
      <span>${entry.weather[0].main}</span>
    `;

    el.forecastTrack.appendChild(card);
  });
}

async function refreshWeather() {
  try {
    let current = await fetchJson(weatherUrl());
    renderCurrentWeather(current);

    if (el.themeSelect.value === "auto") {
      applyTheme(guessThemeFromWeather(current.weather[0].main));
    }

    let forecast = await fetchJson(forecastUrl());
    renderForecast(forecast);
  } catch (error) {
    el.description.textContent = "Could not load weather.";
    console.error(error);
  }
}

function setUnits(units) {
  appState.units = units;
  updateUnitButtons();
  refreshWeather();
}

function searchCity() {
  let value = el.cityInput.value.trim();
  if (!value) return;

  appState.city = value;
  refreshWeather();
}

function updateClock() {
  el.timeText.textContent = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });
}

function scrollForecast(amount) {
  el.forecastTrack.scrollBy({
    left: amount,
    behavior: "smooth"
  });
}

function bindEvents() {
  el.themeSelect.addEventListener("change", () => {
    if (el.themeSelect.value === "auto") {
      refreshWeather();
      return;
    }

    applyTheme(el.themeSelect.value);
  });

  el.cityBtn.addEventListener("click", searchCity);

  el.cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchCity();
    }
  });

  el.celsiusBtn.addEventListener("click", () => setUnits("metric"));
  el.fahrenheitBtn.addEventListener("click", () => setUnits("imperial"));

  el.musicToggle.addEventListener("click", toggleMusic);
  el.prevSongBtn.addEventListener("click", () => stepSong(-1));
  el.nextSongBtn.addEventListener("click", () => stepSong(1));
  el.shuffleSongBtn.addEventListener("click", shuffleSong);

  el.forecastPrev.addEventListener("click", () => scrollForecast(-220));
  el.forecastNext.addEventListener("click", () => scrollForecast(220));
}

function init() {
  updateUnitButtons();
  applyTheme("night", false);
  bindEvents();
  refreshWeather();
  updateClock();
  setInterval(updateClock, 1000);
  tryStartMusic();
}

init();
