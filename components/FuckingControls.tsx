// import { ICardProps } from "../types/commonTypes";
import { IFuckingControlsProps } from '../types/commonTypes';
import styles from './../styles/FuckingControls.module.css';

export default function FuckingCard({ onChange, onNewView, currentView }: IFuckingControlsProps) {

    function viewFactory(text: string): any {
        return (): void => {
            onNewView(text)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputsWrapper}>
                <input onChange={onChange} className={styles.input} type={'text'} placeholder='filter fucks' />
                <div className={styles.inputIcon}><i className="fas fa-search"></i></div>
            </div>
            <div className={styles.switchesWrapper}>
                <div className={[styles.switcher, currentView == 'ceil' && styles.activeSwitcher].join(' ')} onClick={viewFactory('ceil')}>
                    <p><i className="fas fa-table"></i></p>
                    <p>table</p>
                </div>
                <div className={[styles.switcher, currentView == 'list' && styles.activeSwitcher].join(' ')} onClick={viewFactory('list')}>
                    <p><i className="fas fa-list-ul"></i></p>
                    <p>list</p>
                </div>
            </div>
        </div>
    );
}
