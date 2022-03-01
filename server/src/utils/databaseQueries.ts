import Knex from "../service/db_connection";

export const filterQuestions = async (tags: string[], difficulty: string[], companies: string[]): Promise<any> => {
  const response = await Knex("questions")
    .join("tags", "questions.question_id", "=", "tags.question_id")
    .join("companies", "questions.question_id", "=", "companies.question_id")
    .select("questions.question_id", "question_title", "difficulty")
    .where((builder) => {
      tags.map((tag) => {
        builder.orWhere(tag, "true");
      });
    })
    .where((builder) => {
      companies.map((company) => {
        builder.orWhere(company, "true");
      });
    })
    .whereIn("difficulty", difficulty)
    .orderBy([{ column: "question_id", order: "asc" }]);

  return response;
};

export const renderQuestion = async (question_id: string): Promise<any> => {
  const question = await Knex("questions").select("*").where("question_id", "=", question_id);
  const tags = await Knex("tags").select("*").where("question_id", "=", question_id);
  const companies = await Knex("companies").select("*").where("question_id", "=", question_id);
  const question_data = await Knex("questions_data").select("*").where("question_id", "=", question_id);

  const response = {
    question: { ...question[0], ...question_data[0] },
    tags: tags[0],
    companies: companies[0],
  };
  return response;
};

// okay so how would you query this --> I want all the tags and then left join
