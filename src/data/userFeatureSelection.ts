import { UserFeatureEnum } from "../models/userFeatureEnum";
import { UserGroupEnum } from "../models/userGroupEnum";

const UserFeatureSelection: Map<UserFeatureEnum, any> = new Map<UserFeatureEnum, any>();
/*feature selection*/
UserFeatureSelection.set(UserFeatureEnum.entrancesExits, {
  name: "entrances and exits",
  id: "entrancesExits",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.toilets, {
  name: "toilets",
  id: "toilets",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.elevators, {
  name: "elevators",
  id: "elevators",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.stairs, {
  name: "stairs",
  id: "stairs",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.emergencyExits, {
  name: "emergency exits",
  id: "emergencyExits",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});
UserFeatureSelection.set(UserFeatureEnum.service, {
  name: "service",
  id: "service",
  accessibleFeature: false,
  userGroups: [UserGroupEnum.noImpairments],
  isCheckedDefault: true
});

UserFeatureSelection.set(UserFeatureEnum.ramps, {
  name: "ramps",
  id: "ramps",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false
});
UserFeatureSelection.set(UserFeatureEnum.tactileLines, {
  name: "tactile lines",
  id: "tactileLines",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.blindPeople],
  isCheckedDefault: false
});
UserFeatureSelection.set(UserFeatureEnum.disabledParking, {
  name: "disabled parking",
  id: "disabledParking",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false
});
UserFeatureSelection.set(UserFeatureEnum.accessibleToilets, {
  name: "accessible toilets",
  id: "accessibleToilets",
  accessibleFeature: true,
  userGroups: [UserGroupEnum.wheelchairUsers],
  isCheckedDefault: false
});

export { UserFeatureSelection };
