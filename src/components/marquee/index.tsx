import React, { useEffect, useState } from "react";
import css from './index.module.scss'

interface Props {
    children: React.ReactNode;
    interval?: number;
}

const Marquee: React.FC<Props> = ({ children, interval = 100 }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        console.log('children', children);
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === React.Children.count(children) - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        return () => clearInterval(intervalId);
    }, [children, interval]);

    return (
        <div className="marquee-container">
            {
                React.Children.count(children) > 0 && <div className={css.logoWall}>
                    <div className={css.logoWrapper}>
                        {React.Children.map(children, (child: React.ReactNode, index: number): React.ReactElement => {
                            return <div
                                key={index}
                                className={css.logo} >
                                {child}
                            </div>
                        })}
                    </div>
                </div>
            }
        </div>
    );
};


export default Marquee