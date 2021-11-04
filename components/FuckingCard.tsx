import { useEffect, useState } from "react";
import { ICardProps } from "../types/commonTypes";
import styles from './../styles/FuckingCard.module.css';

export default function FuckingCard({to, from, cardData, type}: ICardProps) {
    let [text, setText] = useState(cardData.text);

    useEffect(() => {
        // if (from && to) setText(cardData.text.split(':from').join(`<b>:from</b>`).split(':to').join(`<b>:to</b>`).split(':company').join(`<b>:company</b>`).split(':name').join(`<b>:name</b>`))
        // else if (from) setText(cardData.text.split(':from').join('<b>:from</b>'))
        // else if (to) setText(cardData.text.split(':to').join('<b>:to</b>').split(':company').join('<b>:company</b>').split(':name').join('<b>:name</b>'))
        // else setText(cardData.text.split(':from').join('<b>:from</b>').split(':to').join('<b>:to</b>').split(':company').join('<b>:company</b>').split(':name').join('<b>:name</b>'))

        if (from && to) setText(cardData.text.replace(/:from/i, from).replace(/:to/i, to).replace(/:company/i, to).replace(/:name/i, to))
        else if (from) setText(cardData.text.replace(/:from/i, from))
        else if (to) setText(cardData.text.replace(/:to/i, to).replace(/:company/i, to).replace(/:name/i, to))
        else setText(cardData.text.replace(/:from/i, ':from').replace(/:to/i, ':to').replace(/:company/i, ':company').replace(/:name/i, ':name'))
    }, [from, to]);

    return (
        <div className={styles[type]}>
            <h2>{cardData.title}</h2>
            <p>{text}</p>
        </div>
    );
}