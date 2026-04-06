// Админ конфигурација - Парола је чувана овде и у .env.local
// НАПОМЕНА: .env.local мора да буде у .gitignore и НИКАД не commituј паролу!

export const ADMIN_CONFIG = {
  username: "predsjednika",
  checkPassword: (inputPassword: string): boolean => {
    return inputPassword === "usit2025"
  },
}
