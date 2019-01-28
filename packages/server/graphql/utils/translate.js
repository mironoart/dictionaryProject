const { Translate } = require("@google-cloud/translate");

const projectId = "heroic-command-225220";
const key = "AIzaSyBRBGpAUYIVnI6nm0pbigGXtTk8WFvQLzk";
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
