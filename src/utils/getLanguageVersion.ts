export const getLanguageVersion: Record<string, string> = {
  cpp17: "0", // g++ 17 GCC 9.10
  java: "3", // JDK 11.0.4
  python3: "3", // 3.7.4
  go: "3", // 1.13.1
  nodejs: "3", // 12.11.1
  ruby: "3", // 2.6.5
  haskell: "3", // ghc 8.6.5
  rust: "3", // 1.38.0
  php: "3", // 7.3.10
};
export const getLanguage: Record<string, string> = {
  "text/x-c++src": "cpp17",
  "text/x-java": "java",
  "text/javascript": "nodejs",
  "text/x-python": "python3",
  "text/x-go": "go",
  "text/x-rustsrc": "rust",
  "text/x-ruby": "ruby",
  "text/x-php": "php",
  "text/x-haskell": "haskell",
};
