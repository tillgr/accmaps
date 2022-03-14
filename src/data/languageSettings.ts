import { LanguageSettingsEnum } from "../models/languageSettingsEnum";

const LanguageSettings: Map<LanguageSettingsEnum, any> = new Map<LanguageSettingsEnum, any>();
LanguageSettings.set(LanguageSettingsEnum.english, {
  name: "English",
  resourceFile: "../../public/strings/lang.en.json"
});
LanguageSettings.set(LanguageSettingsEnum.german, {
  name: "Deutsch",
  resourceFile: "../../public/strings/lang.de.json"
});

export { LanguageSettings };
