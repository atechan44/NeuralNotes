# NeuralNotes

Modern, yapay zeka destekli bir not alma uygulaması.

## 🚀 Proje Özeti

NeuralNotes, notlarınızı sadece depolamaktan daha fazlasını yapan, yapay zeka ile güçlendirilmiş bir not alma uygulamasıdır. Markdown desteği, AI özetleme, içgörü üretme ve kavram haritaları oluşturma gibi özelliklere sahiptir.

## 🧠 Temel Özellikler

- Markdown/düz metin not alma
- Yapay zeka ile not özetleme (Backend entegrasyonu sonra yapılacak)
- Kavram haritaları ve içgörüler (Backend entegrasyonu sonra yapılacak)
- Karanlık/Açık tema geçişi
- Çoklu dil desteği
- Duyarlı (responsive) tasarım

## 🛠️ Teknoloji Yığını

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Stil**: Tailwind CSS
- **Animasyonlar**: Framer Motion
- **i18n**: react-i18next
- **Test**: Vitest + React Testing Library
- **CI/CD**: GitHub Actions + Netlify

## 🔧 Kurulum

### Ön Koşullar

- Node.js (v18+)
- npm veya yarn

### Geliştirme Ortamı Kurulumu

```bash
# Repoyu klonlayın
git clone <repo-url>
cd neural-notes

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### Üretim Ortamına Build

```bash
npm run build
```

Build edilen dosyalar `dist/` klasöründe olacaktır.

## 🚦 Testler

```bash
# Tüm testleri çalıştırma
npm run test

# Test coverage raporu
npm run test:coverage

# Geliştirme sırasında testleri izleme
npm run test:watch
```

## 📝 Proje Yapısı

```
src/
├── assets/           # Statik dosyalar (görseller, fontlar)
├── components/       # Yeniden kullanılabilir UI bileşenleri
├── config/           # Uygulama konfigürasyon dosyaları
├── features/         # Özellik bazlı modüller
├── hooks/            # Özel React hook'ları
├── i18n/             # Dil dosyaları ve çeviri yapılandırması
├── layouts/          # Sayfa düzenleri
├── pages/            # Sayfa bileşenleri
└── styles/           # Global stil dosyaları
```

## 🔄 CI/CD

Proje, GitHub Actions ve Netlify ile otomatik CI/CD pipeline'ına sahiptir:

- Her `pull request` için testler ve lint kontrolleri çalıştırılır
- `main` branch'e merge edilen değişiklikler otomatik olarak Netlify'a deploy edilir

## 📋 Geliştirici Notları

- Bu proje şu anda sadece frontend odaklıdır, backend entegrasyonu daha sonra yapılacaktır
- Routing ve State Management kütüphaneleri eklemek için ileride ihtiyaç değerlendirmesi yapılacaktır
- Tema, dil gibi uygulama genelindeki ayarlar `src/config/constants.ts` içinde tanımlanmıştır

## 🔗 Faydalı Linkler

- [React Dokümantasyonu](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [react-i18next](https://react.i18next.com/)

## 📜 Lisans

[MIT](LICENSE)
