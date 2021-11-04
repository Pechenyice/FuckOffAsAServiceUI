import { Dispatch, SetStateAction } from "react";
import { IFuck } from "../types/commonTypes";

interface IReplaceQueryParams {
    cardData: IFuck,
    from: string,
    to: string,
    setText: Dispatch<SetStateAction<string>>
}

export function replaceQueryParams({cardData, from, to, setText} : IReplaceQueryParams): void {
    if (from && to) setText(cardData.text.replace(/from/i, from).replace(/to/i, to).replace(/noun/i, to).replace(/language/i, to).replace(/company/i, to).replace(/name/i, to))
        else if (from) setText(cardData.text.replace(/from/i, from))
        else if (to) setText(cardData.text.replace(/to/i, to).replace(/noun/i, to).replace(/language/i, to).replace(/company/i, to).replace(/name/i, to))
        else setText(cardData.text.replace(/@from@/i, '@from@').replace(/@to@/i, '@to@').replace(/@noun@/i, '@noun@').replace(/@language@/i, '@language@').replace(/@company@/i, '@company@').replace(/@name@/i, '@name@'))
}