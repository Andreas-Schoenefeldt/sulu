// @flow
import React from 'react';
import {isArrayLike, toJS} from 'mobx';
import {SingleSelect} from 'sulu-admin-bundle/components';
import type {FieldTypeProps} from 'sulu-admin-bundle/types';

export default class PageSettingsShadowLocaleSelect extends React.Component<FieldTypeProps<string>> {
    handleChange = (value: string) => {
        const {onChange, onFinish} = this.props;

        onChange(value);
        onFinish();
    };

    render() {
        const {disabled, formInspector, value} = this.props;
        const contentLocales = toJS(formInspector.getValueByPath('/contentLocales'));
        const locale = formInspector.locale;

        if (!isArrayLike(contentLocales)) {
            throw new Error('The "contentLocales" should be an array!');
        }

        const filteredContentLocales = contentLocales.filter(
            (contentLocale) => locale && contentLocale !== locale.get()
        );

        return (
            <SingleSelect disabled={!!disabled} onChange={this.handleChange} value={value}>
                {filteredContentLocales.length > 0 && filteredContentLocales.map((contentLocale) => {
                    if (typeof contentLocale !== 'string') {
                        throw new Error('All entries in the "contentLocales" array must be strings!');
                    }

                    return (
                        <SingleSelect.Option
                            key={contentLocale}
                            value={contentLocale}
                        >
                            {contentLocale}
                        </SingleSelect.Option>
                    );
                })}
            </SingleSelect>
        );
    }
}
