import QuestionsJSON from './questions.json';

type Questions = Record<
  keyof typeof QuestionsJSON,
  {
    title: string;
    description?: string;
    type: string;
    choices: Record<string, string>;
    sort?: string[];
    category: string;
    reference: string;
    refId: string;
  }
>;

const Questions = QuestionsJSON as Questions;

export default Questions;
