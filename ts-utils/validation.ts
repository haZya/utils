export const isEmptyObject = (value: object | { [key: string]: any; }) => {
    return Object.keys(value).length === 0 && value.constructor === Object;
};