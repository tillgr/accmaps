import { UserFeatureEnum } from "../models/userFeatureEnum";
import { UserGroupEnum } from "../models/userGroupEnum";
import * as string from '../../public/strings/lang.en.json';

const UserFeatureSelection: Map<UserFeatureEnum, any> = new Map<UserFeatureEnum, any>();
/*feature selection*/
UserFeatureSelection.set(UserFeatureEnum.entrancesExits, {
  name: string.userProfileEntranceExit,
  id: "entrancesExits",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.toilets, {
  name: string.userProfileToilets,
  id: "toilets",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.elevators, {
  name: string.userProfileElevators,
  id: "elevators",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.stairs, {
  name: string.userProfileStairs,
  id: "stairs",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.emergencyExits, {
  name: string.userProfileEmergencyExit,
  id: "emergencyExits",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.service, {
  name: string.userProfileServices,
  id: "service",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});

UserFeatureSelection.set(UserFeatureEnum.ramps, {
  name: string.userProfileRamps,
  id: "ramps",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false
});
UserFeatureSelection.set(UserFeatureEnum.tactileLines, {
  name: string.userProfileTactileLines,
  id: "tactileLines",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.blindPeople],
  isCheckedDefault: false
});
UserFeatureSelection.set(UserFeatureEnum.disabledParking, {
  name: string.userProfileDisabledParking,
  id: "disabledParking",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false
});
UserFeatureSelection.set(UserFeatureEnum.accessibleToilets, {
  name: string.userProfileAccessibleToilets,
  id: "accessibleToilets",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false
});

export { UserFeatureSelection };
