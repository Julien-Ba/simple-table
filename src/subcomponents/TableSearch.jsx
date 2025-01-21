import './tableSearch.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Search } from './icons';
import { convertString } from 'str-case-converter';

export default function TableSearch({
    searchTerm,
    onSearchChange,
    name,
    searchAriaLabel = 'Search table entries',
    searchPlaceHolder = 'Search...',
}) {
    const kebabName = `${convertString.toKebab(name)}-table-search`;
    return (
        <div className='table__search'>
            <input
                {...(kebabName ? { id: kebabName } : {})}
                name={kebabName || 'table-search'}
                className='table__search-input'
                aria-label={searchAriaLabel}
                type='text'
                placeholder={searchPlaceHolder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className='table__search-icon' />
        </div>
    );
}

TableSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    searchAriaLabel: PropTypes.string,
    searchPlaceHolder: PropTypes.string,
};
