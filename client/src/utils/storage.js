//./utils/storage.js
export function getWordsFromStorage() {
  const stored = localStorage.getItem("languageLadderWords");
  return stored ? JSON.parse(stored) : [];
}

export function saveWordToStorage(words) {
  localStorage.setItem("languageLadderWords", JSON.stringify(words));
}
