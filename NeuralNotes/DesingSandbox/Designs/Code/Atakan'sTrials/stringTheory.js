// Sicim Teorisi Benzeri Animasyon - Yıldız Parıltıları Versiyonu
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('stringTheoryAnimation');
    const ctx = canvas.getContext('2d');
    let width, height;

    // Canvas'ı pencere boyutuna göre ayarla
    function resizeCanvas() {
        width = window.innerWidth;
        // Footer'ın yaklaşık yüksekliğini çıkar
        const footerHeight = 60;
        height = window.innerHeight - footerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Yıldız Parçacığı sınıfı
    class StarParticle {
        constructor() {
            this.reset();
        }

        reset() {
            // Rastgele başlangıç pozisyonu
            this.x = Math.random() * width;
            this.y = Math.random() * height;

            // Boyut (daha büyük parçacıklar)
            this.size = Math.random() * 3 + 0.5;

            // Parlaklık/Opaklık (zaman içinde değişecek)
            this.alpha = Math.random() * 0.5 + 0.1;
            this.maxAlpha = this.alpha + 0.2;
            this.minAlpha = Math.max(0.05, this.alpha - 0.2);

            // Renk (daha parlak ve çeşitli tonlar)
            this.hue = Math.random() * 40 + 180; // 180-220 arası (mavi-turkuaz)
            this.saturation = Math.random() * 20 + 70; // 70-90 arası (daha canlı)
            this.lightness = Math.random() * 20 + 60; // 60-80 arası (daha parlak)

            // Titreşim/Parlama efekti için
            this.glowSize = this.size * (Math.random() * 10 + 5); // Parıltı çapı
            this.glowOpacity = Math.random() * 0.4 + 0.1;

            // Animasyon parametreleri
            this.speed = Math.random() * 0.001 + 0.0005;
            this.angle = Math.random() * Math.PI * 2;
            this.pulsate = Math.random() * 0.02 + 0.01; // Yanıp sönme hızı
            this.pulsateAngle = Math.random() * Math.PI * 2;

            // Bağlantı parametreleri (hangi yıldızlar birbirine bağlanabilir)
            this.connectionDistance = Math.random() * 150 + 50;
            this.connectionAlpha = Math.random() * 0.1 + 0.05;
        }

        update() {
            // Hafif hareket (çok az)
            this.x += Math.cos(this.angle) * 0.1;
            this.y += Math.sin(this.angle) * 0.1;

            // Yanıp sönme animasyonu
            this.pulsateAngle += this.pulsate;
            const pulse = Math.sin(this.pulsateAngle) * 0.5 + 0.5; // 0 ile 1 arası
            this.alpha = this.minAlpha + pulse * (this.maxAlpha - this.minAlpha);

            // Glow efektini de pulse ile güncelle
            this.glowOpacity = this.alpha * 0.8;

            // Ekrandan çıktıysa reset
            if (this.x < -this.glowSize || this.x > width + this.glowSize ||
                this.y < -this.glowSize || this.y > height + this.glowSize) {
                this.reset();
            }
        }

        draw() {
            // Önce glow efekti (radial gradient)
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.glowSize
            );

            gradient.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.glowOpacity})`);
            gradient.addColorStop(1, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
            ctx.fill();

            // Sonra merkez noktası (daha parlak)
            ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness + 10}%, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Parçacıklar arası bağlantıları çiz
    function drawConnections(particles) {
        ctx.lineWidth = 0.3;

        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];

                // İki parçacık arasındaki mesafeyi hesapla
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Eğer yeterince yakınsa bağlantı çiz
                if (distance < p1.connectionDistance) {
                    // Mesafeye göre alpha değerini hesapla
                    const alpha = p1.connectionAlpha * (1 - distance / p1.connectionDistance);

                    // Çizgi çiz
                    ctx.strokeStyle = `hsla(${p1.hue}, ${p1.saturation}%, ${p1.lightness}%, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Yıldız parçacıklarını oluştur
    const particles = [];
    const particleCount = Math.min(100, Math.floor(width * height / 20000)); // Daha az sayıda ama daha etkili

    for (let i = 0; i < particleCount; i++) {
        particles.push(new StarParticle());
    }

    // Buzlu cam efekti ekle
    function addFrostedGlassEffect() {
        // Canvas'ın üzerine hafif bir blur filtresi ekle
        canvas.style.filter = 'blur(1.5px)';

        // Animasyon için CSS ayarları
        document.body.style.position = 'relative';

        // Arka plan rengi değişimi
        document.body.style.backgroundImage = 'linear-gradient(to bottom, #1a1f25, #212529)';
    }

    // Buzlu cam efektini uygula
    addFrostedGlassEffect();

    // Animasyon döngüsü
    function animate() {
        // Canvas'ı temizle (çok hafif silme - uzun kuyruklar için)
        ctx.fillStyle = 'rgba(26, 31, 37, 0.05)'; // Daha koyu arka plan
        ctx.fillRect(0, 0, width, height);

        // Önce bağlantıları çiz
        drawConnections(particles);

        // Sonra parçacıkları güncelle ve çiz
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    // Animasyonu başlat
    animate();
});