import { UserSettingsEnum } from "../models/userSettingsEnum";
import * as string from '../../public/strings/lang.en.json';

const UserSettings: Map<UserSettingsEnum, any> = new Map<UserSettingsEnum, any>();
UserSettings.set(UserSettingsEnum.visualSettings, {
  name: string.userProfileVisualSettings,
  linkedModal: "#userVisualSettingsModal",
  icon: "visibility"
});
UserSettings.set(UserSettingsEnum.featureSelection, {
  name: string.userProfileFeatureSelection,
  linkedModal: "#userFeatureSelectionModal",
  icon: "ballot"
});

export { UserSettings };
