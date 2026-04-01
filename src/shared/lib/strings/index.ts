
export const format2 = (n: number) => String(n).padStart(2, "0");

export const clampMin = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

export const splitTextByDot = (text: string) => {
    return text
        .split(".")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => `${item}.`);
};

export const addLeadingZero = (value: number | string) => {
    return String(value).padStart(2, "0");
};