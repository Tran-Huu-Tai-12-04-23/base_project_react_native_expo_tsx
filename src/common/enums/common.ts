import { Item } from "react-native-picker-select";

export const reverseEnjums = <T = any>(input: T, prefix: string) => {
    const output = {};
    Object.keys(input).forEach(key => {
        const value = input[key];
        Object.assign(output, {
            [`${value}`]: `[${prefix}] ${key}`.trim()
        })
    })
    return output;
}
export const createPickerData = (input: object, prefix: string): Item[] => {
    return Object.keys(input).map(key => {
        return {
            value: input[key],
            label: `[${prefix}] ${key}`.trim()
        }
    })
}