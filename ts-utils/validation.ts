export const isEmptyObject = (value: any) => {
    return Object.keys(value).length === 0 && value.constructor === Object;
};