import { UserFeaturesEnum } from "../models/userFeaturesEnum";
import { UserGroupsEnum } from "../models/userGroupsEnum";
import { lang } from "../services/languageService";

/**Initial data for modal, also list of profiles per selectable userFeature*/

const UserFeatureSelection: Map<UserFeaturesEnum, any> = new Map<
  UserFeaturesEnum,
  any
>();

UserFeatureSelection.set(UserFeaturesEnum.entrancesExits, {
  name: lang.userProfileEntranceExit,
  id: "entrancesExits",
  accessibleFeature: false,
  userGroups: [
    UserGroupsEnum.noImpairments,
    UserGroupsEnum.wheelchairUsers,
    UserGroupsEnum.blindPeople,
  ],
});
UserFeatureSelection.set(UserFeaturesEnum.toilets, {
  name: lang.userProfileToilets,
  id: "toilets",
  accessibleFeature: false,
  userGroups: [UserGroupsEnum.noImpairments, UserGroupsEnum.blindPeople],
});
UserFeatureSelection.set(UserFeaturesEnum.elevators, {
  name: lang.userProfileElevators,
  id: "elevators",
  accessibleFeature: false,
  userGroups: [
    UserGroupsEnum.noImpairments,
    UserGroupsEnum.wheelchairUsers,
    UserGroupsEnum.blindPeople,
  ],
});
UserFeatureSelection.set(UserFeaturesEnum.stairs, {
  name: lang.userProfileStairs,
  id: "stairs",
  accessibleFeature: false,
  userGroups: [UserGroupsEnum.noImpairments, UserGroupsEnum.blindPeople],
});
UserFeatureSelection.set(UserFeaturesEnum.emergencyExits, {
  name: lang.userProfileEmergencyExit,
  id: "emergencyExits",
  accessibleFeature: false,
  userGroups: [
    UserGroupsEnum.noImpairments,
    UserGroupsEnum.wheelchairUsers,
    UserGroupsEnum.blindPeople,
  ],
});
UserFeatureSelection.set(UserFeaturesEnum.service, {
  name: lang.userProfileServices,
  id: "service",
  accessibleFeature: false,
  userGroups: [
    UserGroupsEnum.noImpairments,
    UserGroupsEnum.wheelchairUsers,
    UserGroupsEnum.blindPeople,
  ],
});

UserFeatureSelection.set(UserFeaturesEnum.ramps, {
  name: lang.userProfileRamps,
  id: "ramps",
  accessibleFeature: true,
  userGroups: [UserGroupsEnum.wheelchairUsers],
});
UserFeatureSelection.set(UserFeaturesEnum.tactileLines, {
  name: lang.userProfileTactileLines,
  id: "tactileLines",
  accessibleFeature: true,
  userGroups: [UserGroupsEnum.blindPeople],
});
UserFeatureSelection.set(UserFeaturesEnum.disabledParking, {
  name: lang.userProfileDisabledParking,
  id: "disabledParking",
  accessibleFeature: true,
  userGroups: [UserGroupsEnum.wheelchairUsers, UserGroupsEnum.blindPeople],
});
UserFeatureSelection.set(UserFeaturesEnum.accessibleToilets, {
  name: lang.userProfileAccessibleToilets,
  id: "accessibleToilets",
  accessibleFeature: true,
  userGroups: [UserGroupsEnum.wheelchairUsers, UserGroupsEnum.blindPeople],
});

export { UserFeatureSelection };
