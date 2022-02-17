import { UserGroupEnum } from "../models/userGroupEnum";
import { AccessibilityPropertiesInterface } from "../models/accessibilityPropertiesInterface";
import * as string from '../../public/strings/lang.en.json';

export const levelAccessibilityProperties: AccessibilityPropertiesInterface[] =
  [
    {
      accessibilityFunction: (f) =>
        f.properties.amenity !== undefined &&
        f.properties.amenity === "toilets" &&
        f.properties.wheelchair !== undefined &&
        f.properties.wheelchair !== "no",
      msgTrue: string.buildingAccessibilityToiletsTrue,
      msgFalse: string.buildingAccessibilityToiletsFalse,
      userGroups: [UserGroupEnum.wheelchairUsers],
    },
    {
      accessibilityFunction: (f) =>
        f.properties.tactile_paving !== undefined &&
        f.properties.tactile_paving === "yes",
      msgTrue: string.buildingAccessibilityTactilePavingTrue,
      msgFalse: string.buildingAccessibilityTactilePavingFalse,
      userGroups: [UserGroupEnum.blindPeople],
    },
    {
      accessibilityFunction: (f) =>
        f.properties.highway !== undefined &&
        f.properties.highway === "elevator" &&
        f.properties.wheelchair !== undefined &&
        f.properties.wheelchair !== "no",
      msgTrue: string.buildingAccessibilityElevatorTrue,
      msgFalse: string.buildingAccessibilityElevatorFalse,
      userGroups: [UserGroupEnum.wheelchairUsers],
    },
    {
      accessibilityFunction: (f) =>
        ["de", "en"].some(
          (lng) =>
            (f.properties.tactile_writing !== undefined &&
              f.properties.tactile_writing === "yes") ||
            (f.properties["tactile_writing:embossed_printed_letters:" + lng] !==
              undefined &&
              f.properties[
                "tactile_writing:embossed_printed_letters:" + lng
              ] === "yes") ||
            (f.properties["tactile_writing:engraved_printed_letters:" + lng] !==
              undefined &&
              f.properties[
                "tactile_writing:engraved_printed_letters:" + lng
              ] === "yes") ||
            (f.properties["tactile_writing:braille:" + lng] !== undefined &&
              f.properties["tactile_writing:braille:" + lng] === "yes") ||
            (f.properties["tactile_writing:computer_braille:" + lng] !==
              undefined &&
              f.properties["tactile_writing:computer_braille:" + lng] ===
                "yes") ||
            (f.properties["tactile_writing:fakoo:" + lng] !== undefined &&
              f.properties["tactile_writing:fakoo:" + lng] === "yes") ||
            (f.properties["tactile_writing:moon:" + lng] !== undefined &&
              f.properties["tactile_writing:moon:" + lng] === "yes")
        ),
      msgTrue: string.buildingAccessibilityTactileWritingTrue,
      msgFalse: string.buildingAccessibilityTactileWritingFalse,
      userGroups: [UserGroupEnum.blindPeople],
    },
    {
      accessibilityFunction: (f) =>
        f.properties.highway !== undefined &&
        f.properties.highway === "elevator" &&
        ((f.properties["speech_output:en"] !== undefined &&
          f.properties["speech_output:en"] === "yes") ||
          (f.properties["speech_output:de"] !== undefined &&
            f.properties["speech_output:de"] === "yes")),
      msgTrue: string.buildingAccessibilityElevatorSpeechTrue,
      msgFalse: string.buildingAccessibilityElevatorSpeechFalse,
      userGroups: [UserGroupEnum.blindPeople],
    },
  ];
