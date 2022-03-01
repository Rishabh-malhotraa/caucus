import axios from "axios";
import cheerio from "cheerio";

interface ReturnType {
  error: boolean;
  htmlString: string;
}

export const scrapeQuestion = async (url: string, hostname: string): Promise<ReturnType> => {
  if (hostname === "codeforces.com") {
    try {
      const response = await axios.get(url);

      const $ = cheerio.load(response.data);

      const questionData = $(".problemindexholder").html();
      return questionData === null ? { error: true, htmlString: "" } : { error: false, htmlString: questionData };
    } catch (err) {
      return {
        error: true,
        htmlString: "",
      };
    }
  } else if (hostname === "atcoder.jp") {
    try {
      const response = await axios.get(url);

      const $ = cheerio.load(response.data);
      const questionData = $("#task-statement").children().children(".lang-en").html();

      const DelimitterCorrected = questionData?.replace(/<var>/g, "%%")?.replace(/<\/var>/g, "%%") || "";
      return questionData === null ? { error: true, htmlString: "" } : { error: false, htmlString: DelimitterCorrected };
    } catch (err) {
      return {
        error: true,
        htmlString: "",
      };
    }
  } else {
    return {
      error: true,
      htmlString: "",
    };
  }
};
