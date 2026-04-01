import { ImageShape } from "@/shared/model/types";


export type IResult = {
    id: number | string;
    header: string;
    description: string;
    imageBefore: ImageShape | null;
    imageAfter: ImageShape | null;
    timing: string;
}