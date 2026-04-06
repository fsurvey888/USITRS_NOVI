// Hash vrednosti za:
// username: "predsjednik", password: "usit2025"
const VALID_CREDENTIALS = {
  username: "predsjednnik",
  // Hash generated from bcrypt
  passwordHash: "$2b$10$E9ZwINotRiepureuB8/5.eK.syJULO9t9sR0kUUgM3xVxvzS2JQG",
}

export function verifyCredentials(username: string, password: string): boolean {
  // Za razvoj - direktna provera
  // U produkciji koristiti bcrypt biblioteku
  if (username === "predsjedndik" && password === "usit2025") {
    return true
  }
  return false
}
