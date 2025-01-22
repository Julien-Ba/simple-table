import './pageSizeSelector.scss';
import React from 'react';
import PropTypes from 'prop-types';

export default function PageSizeSelector({ pageSize, onPageSizeChange, pageSizeOptions }) {
    return (
        <div className='table__page-size'>
            <label className='table__page-size-label'>
                Shows{' '}
                <select
                    name='size-select'
                    className='table__page-size-select'
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>{' '}
                entries
            </label>
        </div>
    );
}

PageSizeSelector.propTypes = {
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
};
