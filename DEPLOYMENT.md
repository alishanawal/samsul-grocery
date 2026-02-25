# সামসুল'স গ্রোসারি - স্থাপনা গাইড

## 🚀 দ্রুত শুরু করুন

### প্রয়োজনীয়তা
- Node.js 14+ অথবা উচ্চতর
- npm অথবা yarn প্যাকেজ ম্যানেজার

### স্থানীয় উন্নয়ন সেটআপ

```bash
# প্রকল্প ডিরেক্টরিতে নেভিগেট করুন
cd samsul-grocery

# নির্ভরতা ইনস্টল করুন
npm install

# ডেভেলপমেন্ট সার্ভার চালু করুন
npm start

# ব্রাউজারে খুলুন: http://localhost:3000
```

### উৎপাদন বিল্ড

```bash
# অপ্টিমাইজড বিল্ড তৈরি করুন
npm run build

# বিল্ড আউটপুট দেখুন
ls -la build/

# স্থানীয়ভাবে পরিবেশন করুন (পরীক্ষার জন্য)
npx serve -s build
```

---

## ☁️ ক্লাউড স্থাপনা বিকল্প

### 1️⃣ **Vercel (সুপারিশকৃত)**

**সবচেয়ে সহজ - 2 মিনিট**

```bash
# Vercel CLI ইনস্টল করুন
npm i -g vercel

# স্থাপন করুন
vercel

# অনুরোধগুলি অনুসরণ করুন এবং সম্পূর্ণ করুন
```

বা **GitHub এর মাধ্যমে**:
1. এই রিপো GitHub এ পুশ করুন
2. Vercel.com এ যান
3. "New Project" ক্লিক করুন
4. GitHub সংযোগ করুন
5. রিপো নির্বাচন করুন
6. স্থাপন করুন!

---

### 2️⃣ **Netlify**

```bash
# Netlify CLI ইনস্টল করুন
npm i -g netlify-cli

# লগইন করুন
netlify login

# স্থাপন করুন
netlify deploy --prod --dir=build
```

অথবা **GitHub এর মাধ্যমে**:
1. GitHub এ রিপো সংযুক্ত করুন
2. Netlify.com এ যান
3. "New site from Git" ক্লিক করুন
4. রিপো নির্বাচন করুন
5. স্বয়ংক্রিয় স্থাপনা শুরু হবে

---

### 3️⃣ **GitHub Pages**

```bash
# package.json এ হোমপেজ যোগ করুন
# "homepage": "https://yourusername.github.io/samsul-grocery"

# বিল্ড করুন
npm run build

# gh-pages প্যাকেজ ইনস্টল করুন
npm i --save-dev gh-pages

# package.json scripts এ যোগ করুন:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"

# স্থাপন করুন
npm run deploy
```

---

### 4️⃣ **AWS (S3 + CloudFront)**

```bash
# AWS CLI ইনস্টল করুন
pip install awscli

# AWS কনফিগার করুন
aws configure

# বিল্ড করুন
npm run build

# S3 এ আপলোড করুন
aws s3 sync build/ s3://your-bucket-name --delete

# CloudFront ক্যাশ অবৈধ করুন (ঐচ্ছিক)
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

### 5️⃣ **Docker স্থাপনা**

**Dockerfile তৈরি করুন**:
```dockerfile
# বিল্ড পর্যায়
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# প্রোডাকশন পর্যায়
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

**স্থাপন করুন**:
```bash
# ডকার ইমেজ তৈরি করুন
docker build -t samsul-grocery .

# চালু করুন
docker run -p 3000:3000 samsul-grocery

# Docker Hub এ পুশ করুন (ঐচ্ছিক)
docker tag samsul-grocery:latest yourusername/samsul-grocery:latest
docker push yourusername/samsul-grocery:latest
```

---

## 📋 পূর্ব-স্থাপনা চেকলিস্ট

- [ ] সমস্ত পরিবেশ পরিবর্তনশীল সেট করা হয়েছে
- [ ] `npm install` সম্পূর্ণ হয়েছে কোনো ত্রুটি ছাড়াই
- [ ] `npm start` স্থানীয়ভাবে সঠিকভাবে চলে
- [ ] `npm run build` সফলভাবে সম্পূর্ণ হয়েছে
- [ ] সমস্ত ব্রাউজার পরীক্ষা পাস করেছে
- [ ] কোনো কনসোল ত্রুটি নেই
- [ ] প্রোডাকশন বিল্ড পরিবেশন করে সঠিকভাবে কাজ করে

---

## 🔒 নিরাপত্তা নোট

### পরিবেশ পরিবর্তনশীল
```env
# কখনও এগুলি প্রকাশ করবেন না
REACT_APP_API_KEY=xxxxx
REACT_APP_SECRET=xxxxx
```

### HTTPS বাধ্য করুন
সমস্ত প্রোডাকশন URL HTTP নয় HTTPS ব্যবহার করা উচিত।

### CORS নীতি
যদি একটি ব্যাকএন্ড যোগ করা হয়, CORS সঠিকভাবে কনফিগার করুন।

### API কল
- কখনও API কী ক্লায়েন্ট-সাইড এ প্রকাশ করবেন না
- ব্যাকএন্ড সার্ভারের মাধ্যমে API কল প্রক্সি করুন

---

## 📊 কর্মক্ষমতা অপ্টিমাইজেশন

### বিল্ড সাইজ কমান
```bash
# বিল্ড বিশ্লেষণ করুন
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'
```

### ছবি অপ্টিমাইজেশন
- Unsplash ইমেজ ইতিমধ্যে অপ্টিমাইজ করা হয়েছে
- লোকাল ইমেজ যোগ করার সময়, সরঞ্জাম ব্যবহার করুন:
  - TinyPNG
  - ImageOptim
  - Squoosh

### ক্যাশিং কৌশল
- স্থির সম্পদ দীর্ঘ ক্যাশ সময় ব্যবহার করুন
- HTML শূন্য ক্যাশ ব্যবহার করুন
- ServiceWorker কার্যকর করতে বিবেচনা করুন

---

## 🆘 সমস্যা সমাধান

### সমস্যা: "PORT 3000 ইতিমধ্যে ব্যবহারে"
```bash
# ভিন্ন পোর্ট ব্যবহার করুন
PORT=3001 npm start

# বা PORT 3000 পুনরায় সেট করুন
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

### সমস্যা: "Module not found"
```bash
# নির্ভরতা পুনঃইনস্টল করুন
rm -rf node_modules package-lock.json
npm install
```

### সমস্যা: বিল্ড ব্যর্থ
```bash
# ক্যাশ সাফ করুন
npm cache clean --force
rm -rf build/
npm run build
```

---

## 📈 পর্যবেক্ষণ এবং লগিং

### Google Analytics যোগ করুন
```javascript
// সামসুল গ্রোসারি ফাইনাল.jsx এ যোগ করুন
useEffect(() => {
  window.gtag('config', 'GA_MEASUREMENT_ID');
}, []);
```

### Error Tracking (Sentry)
```bash
npm install @sentry/react
```

---

## 💬 সাপোর্ট এবং রক্ষণাবেক্ষণ

### স্বয়ংক্রিয় আপডেট
```bash
# বার্ষিক ডিপেন্ডেন্সি আপডেট করুন
npm outdated
npm update
```

### পরিকল্পিত ডাউনটাইম
- সপ্তাহে 2-3 বার ব্যাকআপ চালান
- মাসিক নিরাপত্তা আপডেট করুন

---

## ✅ স্থাপনা চেকলিস্ট (চূড়ান্ত)

- [ ] সমস্ত পরীক্ষা স্থানীয়ভাবে পাস করেছে
- [ ] উৎপাদন বিল্ড সফলভাবে তৈরি করা হয়েছে
- [ ] ক্লাউড প্ল্যাটফর্ম নির্বাচিত এবং কনফিগার করা হয়েছে
- [ ] DNS সংযোগ করা হয়েছে (যদি কাস্টম ডোমেইন থাকে)
- [ ] SSL/TLS শংসাপত্র সক্ষম করা হয়েছে
- [ ] CDN কনফিগার করা হয়েছে
- [ ] পর্যবেক্ষণ এবং লগিং সেট আপ করা হয়েছে
- [ ] ব্যাকআপ এবং দুর্যোগ পুনরুদ্ধার পরিকল্পনা রয়েছে

---

**স্থাপনার জন্য প্রস্তুত**: ✅ সম্পূর্ণভাবে প্রস্তুত

শুভ স্থাপনা! 🎉
