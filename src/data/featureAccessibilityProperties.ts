import { AccessibilityPropertiesInterface } from "../models/accessibilityPropertiesInterface";
import { UserGroupsEnum } from "../models/userGroupsEnum";
import { lang } from "../services/languageService";
import { ICONS } from "../../public/strings/constants.json";
import { UserFeaturesEnum } from "../models/userFeaturesEnum";

const allGroups = [
  UserGroupsEnum.blindPeople,
  UserGroupsEnum.noImpairments,
  UserGroupsEnum.wheelchairUsers,
];

/**
 * List of all possible accessibility features, which can be shown on click or by indication icons.
 * Currently, only the very FIRST hit in this list is shown.
 * So the most specific properties should be listed first, afterwards the more general ones.
 */
export const featureAccessibilityProperties: AccessibilityPropertiesInterface[] =
  [
    /* ================ blind people ================ */
    /* tactile information board / tactile map */
    {
      hasCorrectProperties: (f) =>
        f.properties.information !== undefined &&
        ["tactile_map", "tactile_model", "braille", "tactile_letters"].includes(
          f.properties.information
        ),
      msgTrue: lang.featureAccessibilityTactileBoard,
      msgFalse: null,
      userGroups: [UserGroupsEnum.blindPeople],
      iconFilename: ICONS.INFO,
      tags: [UserFeaturesEnum.tactileLines],
    },
    {
      hasCorrectProperties: (f) =>
        f.properties["speech_output:de"] !== undefined ||
        f.properties["speech_output:en"] !== undefined ||
        f.properties["speech_output"] !== undefined,
      msgTrue: lang.featureAccessibilitySpeech,
      msgFalse: null,
      userGroups: [UserGroupsEnum.blindPeople],
    },

    /* ================ wheelchair users ================ */
    {
      hasCorrectProperties: (f) =>
        f.properties.amenity !== undefined &&
        f.properties.amenity === "toilets" &&
        f.properties.wheelchair !== undefined &&
        ["yes", "designated"].includes(f.properties.wheelchair),
      msgTrue: lang.featureAccessibilityAccessibleToilet,
      msgFalse: null,
      userGroups: [UserGroupsEnum.wheelchairUsers],
      iconFilename: ICONS.TOILETS_WHEELCHAIR,
      tags: [UserFeaturesEnum.accessibleToilets],
    },
    {
      hasCorrectProperties: (f) =>
        f.properties.highway !== undefined &&
        f.properties.highway === "elevator" &&
        f.properties.wheelchair !== undefined &&
        ["yes", "designated"].includes(f.properties.wheelchair),
      msgTrue: lang.featureAccessibilityElevator,
      msgFalse: null,
      userGroups: [UserGroupsEnum.wheelchairUsers],
      iconFilename: ICONS.ELEVATOR,
      tags: [UserFeaturesEnum.elevators],
    },
    {
      hasCorrectProperties: (f) =>
        f.properties.wheelchair !== undefined &&
        ["yes", "designated"].includes(f.properties.wheelchair),
      msgTrue: lang.buildingAccessibilityWheelchairTrue,
      msgFalse: lang.buildingAccessibilityWheelchairFalse,
      userGroups: [UserGroupsEnum.wheelchairUsers],
      iconFilename: ICONS.WHEELCHAIR,
      tags: [UserFeaturesEnum.ramps, UserFeaturesEnum.service],
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
        f.properties["wheelchair:description:de"] !== undefined,
      msgTrue: (f) => f.properties["wheelchair:description:de"],
      msgFalse: null,
      userGroups: [UserGroupsEnum.wheelchairUsers],
    },

    /* ================ general features ================ */
    /* toilets - general (no wheelchair) */
    {
      hasCorrectProperties: (f) =>
        f.properties.amenity !== undefined &&
        f.properties.amenity === "toilets" &&
        (f.properties.wheelchair === undefined ||
          !["yes", "designated"].includes(f.properties.wheelchair)),
      msgTrue: (f) =>
        (f.properties.male !== undefined
          ? lang.featureAccessibilityMale
          : f.properties.female !== undefined
          ? lang.featureAccessibilityFemale
          : lang.featureAccessibilityUnisex) + lang.featureAccessibilityToilet,
      msgFalse: null,
      userGroups: [UserGroupsEnum.noImpairments, UserGroupsEnum.blindPeople],
      iconFilename: ICONS.TOILETS,
      tags: [UserFeaturesEnum.toilets],
    },
    /* entrances (general) */
    {
      hasCorrectProperties: (f) =>
        f.properties.entrance !== undefined &&
        ["yes", "main", "secondary"].includes(f.properties.entrance),
      msgTrue: (f) =>
        (f.properties.entrance === "main"
          ? lang.featureAccessibilityMain
          : f.properties.entrance === "secondary"
          ? lang.featureAccessibilitySecondary
          : "") + lang.featureAccessibilityEntrance,
      msgFalse: null,
      userGroups: allGroups,
      iconFilename: ICONS.ENTRANCE,
      tags: [UserFeaturesEnum.entrancesExits],
    },
    /* emergency exits (general) */
    {
      hasCorrectProperties: (f) =>
        (f.properties.exit !== undefined &&
          ["yes", "emergency"].includes(f.properties.exit)) ||
        (f.properties.entrance !== undefined &&
          ["exit", "emergency"].includes(f.properties.entrance)),
      msgTrue: lang.featureAccessibilityExit,
      msgFalse: null,
      userGroups: allGroups,
      iconFilename: ICONS.EMERGENCY_EXIT,
      tags: [UserFeaturesEnum.emergencyExits],
    },
    /* information boards (general, except blind people) */
    {
      hasCorrectProperties: (f) =>
        f.properties.information !== undefined &&
        ["board", "map"].includes(f.properties.information),
      msgTrue: lang.featureAccessibilityInformationBoard,
      msgFalse: null,
      userGroups: [
        UserGroupsEnum.noImpairments,
        UserGroupsEnum.wheelchairUsers,
      ],
      iconFilename: ICONS.INFO,
      tags: [UserFeaturesEnum.service, UserFeaturesEnum.tactileLines],
    },

    /* stairs (general, except wheelchair users) */
    {
      hasCorrectProperties: (f) =>
        (f.properties.highway !== undefined &&
          f.properties.highway === "steps") ||
        (f.properties.stairs !== undefined && f.properties.stairs === "yes"),
      msgTrue: lang.userProfileStairs,
      msgFalse: null,
      userGroups: [UserGroupsEnum.noImpairments, UserGroupsEnum.blindPeople],
      iconFilename: ICONS.STAIRS,
      tags: [UserFeaturesEnum.stairs],
    },
  ];
