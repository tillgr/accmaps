import { UserGroupEnum } from "../models/userGroupEnum";
import * as string from '../../public/strings/lang.en.json';

const UserGroups: Map<UserGroupEnum, any> = new Map<UserGroupEnum, any>();
UserGroups.set(UserGroupEnum.blindPeople, {
  name: string.userProfileVisImpairments,
  icon: "visibility_off",
});
UserGroups.set(UserGroupEnum.noImpairments, {
  name: string.userProfileNoSpecialNeeds,
  icon: "people",
});
UserGroups.set(UserGroupEnum.wheelchairUsers, {
  name: string.userProfileWheelchair,
  icon: "accessible",
});

export { UserGroups };
