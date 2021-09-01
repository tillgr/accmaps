import {UserGroupEnum} from "../interfaces/userGroupEnum";

const UserGroups: Map<UserGroupEnum, any> = new Map<UserGroupEnum, any>();
UserGroups.set(UserGroupEnum.blindPeople, {name: 'Users with visual impairments', icon: 'visibility_off'});
UserGroups.set(UserGroupEnum.noImpairments, {name: 'Users with no special needs', icon: 'people'});
UserGroups.set(UserGroupEnum.wheelchairUsers, {name: 'Wheelchair users', icon: 'accessible'});

export {UserGroups};
