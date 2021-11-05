import { useEffect, useState } from "react";
import { ICardProps } from "../types/commonTypes";
import Link from 'next/link';
import styles from './../styles/FuckingCard.module.css';
import { replaceQueryParams } from "../helpers/replacer";

export default function FuckingCard({ showNotice, href, as, to, from, cardData, type }: ICardProps) {
    let [text, setText] = useState(cardData.text);

    useEffect(() => {
        replaceQueryParams({cardData, from, to, setText});
    }, [from, to]);

    function handleCopyClick(): void {
        navigator.clipboard.writeText(text.replace(/:/g, ''))
            .then(() => {
                showNotice();
            })
    }
    return (
        <div className={styles[type]}>
            <Link href={href} as={as}>
                <a>
                    <div className={styles.filler}>
                        <h2>{cardData.title}</h2>
                        {/* <p>{text}</p> */}
                        <p>
                            {
                                text.split('@').map((f, i) => !(i % 2) ? <span key={`pieceParsed-${cardData.title}-${i}`}>{f.toString()}</span> : <b key={`pieceParsed-${cardData.title}-${i}`}>{f.toString()}</b>)
                            }
                        </p>
                        <div className={styles.arrow}>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </a>
            </Link>
            <div className={styles.copy} onClick={handleCopyClick}>
                <div className={styles.wideCopy}>Copy to clipboard</div>
                <div className={styles.copySign}><i className="far fa-copy"></i></div>
            </div>
        </div>
    );
}