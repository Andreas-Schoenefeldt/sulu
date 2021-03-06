// @flow
import React from 'react';
import sectionStyles from './section.scss';
import type {Node} from 'react';

type Props = {
    children?: Node,
    title?: string,
};

export default class Section extends React.PureComponent<Props> {
    render() {
        const {
            children,
            title,
        } = this.props;

        return (
            <div className={sectionStyles.section}>
                {title &&
                    <div className={sectionStyles.title}>{title}</div>
                }
                <div className={sectionStyles.children}>
                    {children}
                </div>
            </div>
        );
    }
}
