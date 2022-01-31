import { AccessibilityPropertiesInterface } from "../models/accessibilityPropertiesInterface";
import { UserGroupEnum } from "../models/userGroupEnum";
import * as string from '../../public/strings/lang.en.json';

const allGroups = [
  UserGroupEnum.blindPeople,
  UserGroupEnum.noImpairments,
  UserGroupEnum.wheelchairUsers,
];

export const buildingAccessibilityProperties: AccessibilityPropertiesInterface[] =
  [
    {
      accessibilityFunction: (f) =>
        f.properties.wheelchair !== undefined &&
        f.properties.wheelchair === "yes",
      msgTrue: string.buildingAccessibilityWheelchairTrue,
      msgFalse: (f) =>
        f.properties.wheelchair === undefined
          ? null
          : f.properties.wheelchair === "limited"
          ? string.buildingAccessibilityWheelchairLimited
          : string.buildingAccessibilityWheelchairFalse,
      userGroups: [UserGroupEnum.wheelchairUsers],
    },
    {
      accessibilityFunction: (f) =>
        f.properties["wheelchair:description:de"] !== undefined,
      msgTrue: (f) => f.properties["wheelchair:description:de"],
      msgFalse: null,
      userGroups: [UserGroupEnum.wheelchairUsers],
    },
    {
      accessibilityFunction: (f) =>
        f.properties["wheelchair:description:en"] !== undefined,
      msgTrue: (f) => f.properties["wheelchair:description:en"],
      msgFalse: null,
      userGroups: [UserGroupEnum.wheelchairUsers],
    },
    {
      accessibilityFunction: (f) =>
        f.properties["toilets:wheelchair"] !== undefined &&
        f.properties["toilets:wheelchair"] === "yes",
      msgTrue: string.buildingAccessibilityToiletsTrue,
      msgFalse: null,
      userGroups: [UserGroupEnum.wheelchairUsers],
    },
    {
      accessibilityFunction: (f) => f.properties["opening_hours"] !== undefined,
      msgTrue: (f) => f.properties["opening_hours"],
      msgFalse: null,
      userGroups: allGroups,
    },
  ];
