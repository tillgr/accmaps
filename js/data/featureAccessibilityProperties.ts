import {FeatureAccessibilityPropertiesInterface} from "../interfaces/featureAccessibilityPropertiesInterface";

export const featureAccessibilityProperties: FeatureAccessibilityPropertiesInterface[] = [
    {name: 'handrail', value: true, message: 'handrail available'},
    {name: 'tactile_paving', value: true, message: 'tactile paving available'},
    {name: 'amenity', value: 'toilets', message: 'toilet'},
    {name: 'male', value: true, message: 'male'},
    {name: 'female', value: true, message: 'female'},
    {name: 'wheelchair', value: 'no', message: 'no wheelchair access'},
    {name: 'wheelchair', value: 'yes', message: 'wheelchair access possible'},
    {name: 'wheelchair:description:en', value: true, message: null},
    {name: 'wheelchair:description:de', value: true, message: null},
    {name: 'speech_output:de', value: true, message: 'speech output (German)'},
    {name: 'speech_output:en', value: true, message: 'speech output (English)'},
]
