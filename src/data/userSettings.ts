import { UserSettingsEnum } from "../models/userSettingsEnum";

const UserSettings: Map<UserSettingsEnum, any> = new Map<UserSettingsEnum, any>();
UserSettings.set(UserSettingsEnum.visualSettings, {
  name: "Visual settings",
  linkedModal: "#userVisualSettingsModal",
  icon: "visibility"
});
UserSettings.set(UserSettingsEnum.featureSelection, {
  name: "Feature selection",
  linkedModal: "#userFeatureSelectionModal",
  icon: "ballot"
});

export { UserSettings };
