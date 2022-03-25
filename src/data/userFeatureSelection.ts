import { UserFeatureEnum } from "../models/userFeatureEnum";
import { UserGroupEnum } from "../models/userGroupEnum";
import { lang } from "../services/languageService";

const UserFeatureSelection: Map<UserFeatureEnum, any> = new Map<
  UserFeatureEnum,
  any
>();
/*initial data for modal*/
UserFeatureSelection.set(UserFeatureEnum.entrancesExits, {
  name: lang.userProfileEntranceExit,
  id: "entrancesExits",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true,
});
UserFeatureSelection.set(UserFeatureEnum.toilets, {
  name: lang.userProfileToilets,
  id: "toilets",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true,
});
UserFeatureSelection.set(UserFeatureEnum.elevators, {
  name: lang.userProfileElevators,
  id: "elevators",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true,
});
UserFeatureSelection.set(UserFeatureEnum.stairs, {
  name: lang.userProfileStairs,
  id: "stairs",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true,
});
UserFeatureSelection.set(UserFeatureEnum.emergencyExits, {
  name: lang.userProfileEmergencyExit,
  id: "emergencyExits",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true,
});
UserFeatureSelection.set(UserFeatureEnum.service, {
  name: lang.userProfileServices,
  id: "service",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true,
});

UserFeatureSelection.set(UserFeatureEnum.ramps, {
  name: lang.userProfileRamps,
  id: "ramps",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false,
});
UserFeatureSelection.set(UserFeatureEnum.tactileLines, {
  name: lang.userProfileTactileLines,
  id: "tactileLines",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.blindPeople],
  isCheckedDefault: false,
});
UserFeatureSelection.set(UserFeatureEnum.disabledParking, {
  name: lang.userProfileDisabledParking,
  id: "disabledParking",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false,
});
UserFeatureSelection.set(UserFeatureEnum.accessibleToilets, {
  name: lang.userProfileAccessibleToilets,
  id: "accessibleToilets",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false,
});

export { UserFeatureSelection };
