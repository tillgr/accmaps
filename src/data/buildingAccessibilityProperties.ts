import { AccessibilityPropertiesInterface } from "../models/accessibilityPropertiesInterface";
import { UserGroupsEnum } from "../models/userGroupsEnum";
import { lang } from "../services/languageService";

const allGroups = [
  UserGroupsEnum.blindPeople,
  UserGroupsEnum.noImpairments,
  UserGroupsEnum.wheelchairUsers,
];

export const buildingAccessibilityProperties: AccessibilityPropertiesInterface[] =
  [
    {
      hasCorrectProperties: (f) =>
        f.properties.wheelchair !== undefined &&
        f.properties.wheelchair === "yes",
      msgTrue: lang.buildingAccessibilityWheelchairTrue,
      msgFalse: (f) =>
        f.properties.wheelchair === undefined
          ? null
          : f.properties.wheelchair === "limited"
          ? lang.buildingAccessibilityWheelchairLimited
          : lang.buildingAccessibilityWheelchairFalse,
      userGroups: [UserGroupsEnum.wheelchairUsers],
    },
    {
      hasCorrectProperties: (f) =>
        f.properties["wheelchair:description:de"] !== undefined,
      msgTrue: (f) => f.properties["wheelchair:description:de"],
      msgFalse: null,
      userGroups: [UserGroupsEnum.wheelchairUsers],
    },
    {
      hasCorrectProperties: (f) =>
        f.properties["wheelchair:description:en"] !== undefined,
      msgTrue: (f) => f.properties["wheelchair:description:en"],
      msgFalse: null,
      userGroups: [UserGroupsEnum.wheelchairUsers],
    },
    {
      hasCorrectProperties: (f) =>
        f.properties["toilets:wheelchair"] !== undefined &&
        f.properties["toilets:wheelchair"] === "yes",
      msgTrue: lang.buildingAccessibilityToiletsTrue,
      msgFalse: null,
      userGroups: [UserGroupsEnum.wheelchairUsers],
    },
    {
      hasCorrectProperties: (f) => f.properties["opening_hours"] !== undefined,
      msgTrue: (f) => f.properties["opening_hours"],
      msgFalse: null,
      userGroups: allGroups,
    },
  ];
