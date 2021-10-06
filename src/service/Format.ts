import prettier from "prettier/standalone";
import babylon from "prettier/parser-babel";

/**
 * this function format the code based of code language, it also use from different tools
 */
const format = (code: string, language: string) => {
  switch (language) {
    case "text/x-java":
      const JavaPlugin = require("prettier-plugin-java");
      return prettier.format(code, { parser: "java", plugins: [JavaPlugin], tabWidth: 2 });
    case "text/javascript":
      return prettier.format(code, { parser: "babel", plugins: [babylon], semi: false });
    case "text/x-c++src":
      return code;
    case "text/x-python":
      return code;
    case "text/x-rustsrc":
      return code;
    case "text/x-go":
      return code;
    case "text/x-php":
      const PhpPlugin = require("@prettier/plugin-php");
      return prettier.format(code, { parser: "php", plugins: [PhpPlugin] });
    case "text/x-ruby":
      return code;
    case "text/x-haskell":
      return code;
    default:
      return code;
  }
};

export default format;
