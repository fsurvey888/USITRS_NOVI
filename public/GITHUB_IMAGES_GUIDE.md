# Водич: Како складиштити и користити слике са GitHub-а

## Брз преглед
- Слике се чувају у `/public` фолдеру вашег GitHub репозиторија
- При локалном развоју, користи путање `/slika.jpg`
- При production (на Vercel-у), слике се аутоматски служе са GitHub CDN-а

## Корак 1: Припреми слику
1. Скузи слику са вашег компјутера (JPG, PNG, WebP)
2. Величина: оптимална је 800x600px или већа

## Корак 2: Додај слику у GitHub
### Опција А: Кроз Visual Code (препоручено)
1. Отвори GitHub Desktop или терминал у вашем пројекту
2. Направи нов фолдер за слике:
   ```
   /public/images/
   ```
3. Копирај своју слику у `/public/images/mojaslika.jpg`
4. Commit и push:
   ```
   git add .
   git commit -m "Додана слика за вијест"
   git push
   ```

### Опција Б: Директно на GitHub веб странице
1. Иди на твој GitHub репозиторијум
2. Кликни на `public` фолдер
3. Кликни на `Add file` → `Upload files`
4. Драг енд дроп слику
5. Commit

## Корак 3: Прави URL до слике
### За локални развој (Visual Code):
```
/images/mojaslika.jpg
```

### За GitHub Raw URL (ако требаш екстерни линк):
```
https://raw.githubusercontent.com/tvoje-korisnicko-ime/tvoj-repo-naziv/main/public/images/mojaslika.jpg
```

## Корак 4: Користи URL у админ панелу
1. Отвори `/admin` страницу
2. Унеси слику:
   - За вијести: `Наслов/опис слике` → унеси `/images/mojaslika.jpg`
   - За галерију: Унеси URL-е раздвојене зарезом:
     ```
     /images/slika1.jpg, /images/slika2.jpg, /images/slika3.jpg
     ```

## Напомене
- Слике мањих од 2MB учитавају се брже
- PNG је окај за иконе, JPG за фотографије
- WebP формат је најбржи, али није подржан свугде
- Слике у `/public` су јавно доступне

## Структура фолдера
```
твој-projekt/
├── public/
│   ├── images/
│   │   ├── slika1.jpg
│   │   ├── slika2.jpg
│   │   └── thumbnail.jpg
│   ├── index.html
│   └── robots.txt
├── app/
├── lib/
└── ...
```

## Примјер у админ панелу
- **Главна слика вијести**: `/images/vijest-1-slika.jpg`
- **Галерија**: `/images/galerija1.jpg, /images/galerija2.jpg, /images/galerija3.jpg`
