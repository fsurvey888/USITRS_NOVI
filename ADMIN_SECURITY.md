# 🔐 Безбедност Админ Панела

## ⚠️ ВЕОМА ВАЖНО

Парола за админ панел је **САДА ЗАШТИЋЕНА** у посебном конфигурационом фајлу.

### Шта је направљено:

1. **lib/admin-config.ts** - Фајл где је парола сада централизована
   - Парола је уклоњена из главног админ кода
   - Користи се функција `checkPassword()` за верификацију

2. **.env.local** - Приватни фајл са окружењским варијаблама
   - **НИКАД не commitуј овај фајл на GitHub!**
   - `.gitignore` већ скрива сву `.env*` фајлове

3. **Парола је тренутно у плаћи текста** ⚠️
   - За PRODUCTION, требало би да буде ХЕШОВАНА са bcrypt

### Како да унапредиш безбедност:

#### За развој (Development):
Тренутно решење је довољно јер је `.env.local` скривено из Git-а.

#### За продукцију (Production):
```bash
# 1. Инсталирај bcrypt
npm install bcrypt
npm install --save-dev @types/bcrypt

# 2. Генериши hash твоје пароле:
# Користи скрипту испод у Node.js:
const bcrypt = require('bcrypt');
const password = 'usit2025';
const saltRounds = 10;
bcrypt.hash(password, saltRounds, (err, hash) => {
  console.log('Hash:', hash);
});

# 3. Стави hash у .env.local:
ADMIN_PASSWORD_HASH=$2b$10$... (твој bcrypt hash)

# 4. Ажурирај lib/admin-config.ts да користи верификацију са bcrypt
```

### Заштитни список:

✅ Парола је уклоњена из главног админ кода
✅ `.env.local` је у `.gitignore` (скривено из GitHub-а)
✅ Конфигурација је централизована у `lib/admin-config.ts`
❌ Парола је тренутно у плаћи текста (требало би за hash за production)

### Чека се:

Пре deployment-а на Netlify/Vercel:
1. Генериши bcrypt hash твоје пароле
2. Ажурирај `lib/admin-config.ts` да користи bcrypt верификацију
3. Постави окружењску варијаблу `ADMIN_PASSWORD_HASH` у Netlify/Vercel settings

### За Netlify/Vercel:

1. Иди на твоју апликацију на Netlify/Vercel
2. Settings → Environment
3. Додај варијаблу: `ADMIN_PASSWORD_HASH` = твој bcrypt hash
4. Ажурирај `lib/admin-config.ts` да чита из `process.env.ADMIN_PASSWORD_HASH`

**НЕ разглашавај паролу!** Чувај је приватно и безбедно.
