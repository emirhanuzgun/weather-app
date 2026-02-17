const apiKey = "7d222a072935567ee163ae961c23377d"; 

const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&lang=tr";

// --- HTML ELEMENTLERİNİ SEÇİYORUZ ---
const searchBox = document.querySelector("#sehir-input");
const searchBtn = document.querySelector("#arama-butonu");
const locationBtn = document.querySelector("#konum-butonu");
const weatherIcon = document.querySelector(".weather-icon");
const tarihElement = document.querySelector("#tarih");

// --- TARİHİ AYARLA ---
const bugun = new Date();
tarihElement.innerHTML = bugun.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// --- 1. FONKSİYON: ŞEHİR İSMİYLE ARAMA ---
async function checkWeather(city) {
    if(!city) return;
    // Linki burada oluşturuyoruz (Anahtarı ekleyerek)
    await fetchData(`${weatherUrl}&q=${city}&appid=${apiKey}`);
    await fetchForecast(`${forecastUrl}&q=${city}&appid=${apiKey}`);
}

// --- 2. FONKSİYON: KONUM (GPS) İLE ARAMA ---
async function checkWeatherByCoords(lat, lon) {
    // Koordinatlı link oluşturuyoruz
    await fetchData(`${weatherUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    await fetchForecast(`${forecastUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
}

// --- A. ANA VERİYİ ÇEKEN FONKSİYON ---
async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        if(response.status != 200) { 
            alert("Hava durumu alınamadı! Şehir ismini veya API Anahtarını kontrol et."); 
            return; 
        }
        
        const data = await response.json();

        // Ekrana Yazdır
        document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".hissedilen").innerHTML = Math.round(data.main.feels_like) + "°C";
        document.querySelector(".humidity").innerHTML = "%" + data.main.humidity;
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/s";

        // Gün Doğumu/Batımı
        let dogus = new Date(data.sys.sunrise * 1000).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
        let batis = new Date(data.sys.sunset * 1000).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'});
        document.querySelector(".sun-times").innerHTML = `${dogus} / ${batis}`;

        // İkonu Güncelle
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        // Arka Planı Değiştir
        changeBackground(data.weather[0].main);

        // Kutuyu Görünür Yap
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Hata:", error);
    }
}

// --- B. 5 GÜNLÜK TAHMİNİ ÇEKEN FONKSİYON ---
async function fetchForecast(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const forecastList = document.getElementById('forecast-list');
        forecastList.innerHTML = ""; 

        // Her günün öğle saati (12:00) verisini filtrele
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString('tr-TR', { weekday: 'short' });
            const temp = Math.round(day.main.temp) + "°C";
            const icon = day.weather[0].icon;

            const html = `
                <div class="forecast-card">
                    <p class="forecast-date">${date}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}.png">
                    <p>${temp}</p>
                </div>
            `;
            forecastList.innerHTML += html;
        });

    } catch (error) {
        console.error("Tahmin hatası:", error);
    }
}

// --- C. ARKA PLAN DEĞİŞTİRİCİ ---
function changeBackground(durum) {
    const body = document.querySelector("body");
    let bgUrl = "linear-gradient(135deg, #00feba, #5b548a)"; 

    if (durum === "Clear") bgUrl = "url('https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1974&auto=format&fit=crop')";
    else if (durum === "Clouds") bgUrl = "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951&auto=format&fit=crop')";
    else if (durum === "Rain" || durum === "Drizzle") bgUrl = "url('https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1974&auto=format&fit=crop')";
    else if (durum === "Snow") bgUrl = "url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?q=80&w=2108&auto=format&fit=crop')";

    body.style.backgroundImage = bgUrl;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundBlendMode = "overlay";
    body.style.backgroundColor = "rgba(0,0,0,0.3)";
}

// --- BUTON TIKLAMALARI ---
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
searchBox.addEventListener("keypress", (e) => { if (e.key === 'Enter') checkWeather(searchBox.value); });

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => checkWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
            () => alert("Konum alınamadı.")
        );
    } else {
        alert("Tarayıcınız konumu desteklemiyor.");
    }
});