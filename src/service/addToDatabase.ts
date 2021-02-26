import knex from "./db_connection";
import questions from "../data/questions";
import tags_data from "../data/tags";
import companies_data from "../data/companies";
import questions_data from "../data/questions_data";
import { Question, Tags, QuestionData, Companies } from "../types";

const addToDatabase = (): void => {
  questions.sort(function (a, b) {
    return a.question_id > b.question_id ? 1 : a.question_id < b.question_id ? -1 : 0;
  });

  questions.forEach(async (question: Question) => {
    try {
      await knex<Question>("questions").insert({
        question_id: question.question_id,
        title: question.title,
        question_title: question.question_title,
        problem_url: question.problem_url,
        difficulty_level: question.difficulty_level,
        difficulty: question.difficulty,
      });
    } catch (err) {
      console.error(err);
    }
  });

  questions_data.forEach(async (question_data: QuestionData) => {
    try {
      await knex<QuestionData>("questions_data").insert({
        question_id: question_data.question_id,
        question: question_data.question,
      });
      console.log("Success 🎗");
    } catch (err) {
      console.error(err);
    }
  });

  companies_data.forEach(async (company_data: Companies) => {
    try {
      const { companies, question_id } = company_data;

      const obj = {};
      companies.map((company) => {
        obj[`${company}`] = true;
      });

      await knex("companies").insert({
        question_id: question_id,
        ...obj,
      });
      console.log("Success 🎗");
    } catch (err) {
      console.error(err);
    }
  });

  tags_data.forEach(async (tag_data: Tags) => {
    try {
      const { tags, question_id } = tag_data;

      const obj = {};
      tags.map((tag) => {
        obj[`${tag}`] = true;
      });

      await knex("tags").insert({
        question_id: question_id,
        ...obj,
      });
      console.log("Success 🎗");
    } catch (err) {
      console.error(err);
    }
  });
};

export default addToDatabase;
