// import { ICardProps } from "../types/commonTypes";
import { IFuckingControlsProps } from '../types/commonTypes';
import styles from './../styles/FuckingControls.module.css';

export default function FuckingCard({onChange, onNewView, currentView} : IFuckingControlsProps) {

    function viewFactory(text: string): any {
        return (): void  => {
            onNewView(text)
        }
    }

    return (
        <div className={styles.wrapper}>
            <input onChange={onChange} className={styles.input} type={'text'} placeholder='filter fucks' />
            <div className={styles.switchesWrapper}>
                <div className={[styles.switcher, currentView == 'ceil' && styles.activeSwitcher].join(' ')} onClick={viewFactory('ceil')}>
                    &#9638;
                </div>
                <div className={[styles.switcher, currentView == 'list' && styles.activeSwitcher].join(' ')} onClick={viewFactory('list')}>
                    &#9636;
                </div>
            </div>
        </div>
    );
}
