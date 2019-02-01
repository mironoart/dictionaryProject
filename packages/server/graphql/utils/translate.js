const { Translate } = require("@google-cloud/translate");

const projectId = process.env.PROJECT_ID;
const key = process.env.TRANSLATION_API_KEY;
const translate = new Translate({
  projectId: projectId,
  key: key
});

const translateTxt = async (text, target = "ru") => {
  let translated = null;
  return translate.translate(text, target).then(results => {
    translated = results[0];
    return translated;
  });
};

export default translateTxt;
