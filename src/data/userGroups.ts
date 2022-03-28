import { UserGroupsEnum } from "../models/userGroupsEnum";
import { lang } from "../services/languageService";

const UserGroups: Map<UserGroupsEnum, any> = new Map<UserGroupsEnum, any>();
UserGroups.set(UserGroupsEnum.blindPeople, {
  name: lang.userProfileVisImpairments,
  icon: "visibility_off",
});
UserGroups.set(UserGroupsEnum.noImpairments, {
  name: lang.userProfileNoSpecialNeeds,
  icon: "people",
});
UserGroups.set(UserGroupsEnum.wheelchairUsers, {
  name: lang.userProfileWheelchair,
  icon: "accessible",
});

export { UserGroups };
