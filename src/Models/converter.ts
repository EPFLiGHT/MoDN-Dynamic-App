import fs from 'fs/promises';
import {join} from 'path';
import Questions from './questions.json';
import localization from './localization.json';

(async () => {
  const Localization = localization.Variables;

  const names = Object.keys(Questions);
  const newQuestions = {...Questions};

  Localization.forEach((item) => {
    const searchStr = item.Label.split(' ')
      .slice(0, item.Label.length < 7 ? 3 : 4)
      .join('')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '');

    const found =
      names.find(
        (name) => name.includes(searchStr) && name.includes(item.Reference.toLowerCase()),
      ) ??
      names.find((name) => name.includes(item.Reference.toLowerCase())) ??
      names.find((name) => name.includes(searchStr) && name.includes(item.ID)) ??
      names.find((name) => name.includes(searchStr));

    if (found) {
      newQuestions[found] = {
        ...(newQuestions[found] as any),
        title: item.Label,
        description: item.Description,
        category: item.Category,
        reference: item.Reference,
        refId: item.ID,
      };
    }
  });

  await fs.writeFile(join(__dirname, 'questions.json'), JSON.stringify(newQuestions, null, 2));
})();
