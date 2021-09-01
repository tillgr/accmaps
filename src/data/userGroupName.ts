import {UserGroup} from "./userGroup";

const UserGroupName: Map<UserGroup, string> = new Map<UserGroup, string>();

UserGroupName.set(UserGroup.blindPeople, 'Blind people');
UserGroupName.set(UserGroup.noImpairments, 'Users with no impairments');
UserGroupName.set(UserGroup.wheelchairUsers, 'wheelchair users');

export {UserGroupName};
