# 🌦️ Modern Hava Durumu Paneli (Weather Dashboard)

Bu proje, HTML, CSS ve Vanilla JavaScript kullanılarak geliştirilmiş modern bir hava durumu uygulamasıdır. OpenWeatherMap API kullanılarak anlık hava durumu ve 5 günlük tahmin verilerini çeker. Tasarım, hava durumuna göre (Güneşli, Yağmurlu, Karlı vb.) dinamik olarak değişir.

## 🚀 Canlı Demo
Projenin çalışan halini buradan inceleyebilirsiniz:
**[https://emirhanuzgun.github.io/weather-app/]**

## 🌟 Özellikler

* **📍 Konum Bazlı Hava Durumu:** GPS izni ile bulunduğunuz konumun verilerini otomatik olarak getirir.
* **🔍 Şehir Arama:** Dünya üzerindeki herhangi bir şehrin hava durumunu sorgulama.
* **📅 5 Günlük Tahmin:** Önümüzdeki 5 günün öğle saatlerindeki sıcaklık ve durum tahminlerini listeler.
* **🎨 Dinamik Arka Plan:** Hava durumuna göre (Açık, Bulutlu, Yağmurlu, Karlı) değişen arka plan görselleri.
* **📊 Detaylı Veriler:** Sıcaklık, Hissedilen Sıcaklık, Nem, Rüzgar Hızı, Gün Doğumu ve Gün Batımı saatleri.
* **📱 Responsive Tasarım:** Mobil, tablet ve masaüstü cihazlarla tam uyumlu arayüz.

## 🛠️ Kullanılan Teknolojiler

* **HTML5:** Semantik yapı.
* **CSS3:** Flexbox, Grid, Responsive Tasarım ve Animasyonlar.
* **JavaScript (ES6+):**
    * `Fetch API` ile veri çekme 
    * DOM Manipülasyonu.
    * Geolocation API (Konum servisi).
* **API:** OpenWeatherMap (Current Weather & 5 Day Forecast).

## ⚙️ Kurulum (Kendi Bilgisayarınızda Çalıştırmak İçin)

Projeyi bilgisayarınıza indirip geliştirmek isterseniz şu adımları izleyin:

1.  **Projeyi Klonlayın:**
    ```bash
    git clone [https://github.com/emirhanuzgun/weather-app.git] (https://github.com/emirhanuzgun/weather-app.git)
    ```

2.  **API Anahtarı Alın:**
    * [OpenWeatherMap](https://openweathermap.org/) sitesine üye olun.
    * Ücretsiz bir API Key alın.

3.  **Yapılandırma:**
    * `script.js` dosyasını açın.
    * `const apiKey = "BURAYA_ANAHTARINI_YAZ";` satırını kendi anahtarınızla güncelleyin.

4.  **Çalıştırın:**
    * `index.html` dosyasına çift tıklayarak tarayıcıda açın.

## 👨‍💻 Geliştirici

**Emirhan Üzgün**
* [LinkedIn Profilim](https://linkedin.com/in/emirhan-üzgün/)
* [Portfolio Sitem](https://emirhanuzgun.dev)