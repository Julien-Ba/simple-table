import './table.scss';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { convertString } from 'str-case-converter';
import { ChevronDown } from './subcomponents/icons';
import PageSizeSelector from './subcomponents/PageSizeSelector';
import TablePagination from './subcomponents/TablePagination';
import TableSearch from './subcomponents/TableSearch';

export default function Table({
    name = '',
    data = [],
    itemsPerPage = 10,
    pageSizeOptions = [5, 10, 25, 50],
    searchAriaLabel,
    searchPlaceHolder,
    disableSearch = false,
    disablePageSize = false,
}) {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(itemsPerPage);
    const columns = Object.keys(data[0] || {});

    const filteredAndSortedData = useMemo(() => {
        let processedData = [...data];

        if (searchTerm) {
            processedData = processedData.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (sortConfig.key) {
            processedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return processedData;
    }, [data, searchTerm, sortConfig]);

    useEffect(() => {
        if (currentPage > 1 && filteredAndSortedData.length <= (currentPage - 1) * pageSize) {
            setCurrentPage(currentPage - 1);
        }
    }, [filteredAndSortedData, currentPage, pageSize]);

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortConfig.key === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key: column, direction });
    };

    const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div
            className={`table table__container${name && ` ${convertString.toKebab(name)}__table`}`}
        >
            <div className='table__controls'>
                {!disableSearch && (
                    <TableSearch
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        name={name}
                        searchAriaLabel={searchAriaLabel}
                        searchPlaceHolder={searchPlaceHolder}
                    />
                )}
                {!disablePageSize && (
                    <PageSizeSelector
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        pageSizeOptions={pageSizeOptions}
                    />
                )}
            </div>
            <table className='table__table'>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                onClick={() => handleSort(column)}
                                className='table__table__header-cell'
                            >
                                <div className='table__table__header-cell-content'>
                                    <span>{convertString.toTitle(column)}</span>
                                    {sortConfig.key === column && (
                                        <ChevronDown
                                            className='table__table__header-cell-icon'
                                            rotate={sortConfig.direction === 'asc' ? true : false}
                                        />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((entry) => (
                            <tr key={`${entry.id || JSON.stringify(entry)}`}>
                                {columns.map((column) => (
                                    <td key={column}>{entry[column]}</td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className='table__empty'>
                                <div className='table__empty-message'>No results found</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={pageSize}
                totalItems={filteredAndSortedData.length}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

Table.propTypes = {
    name: PropTypes.string,
    data: PropTypes.array,
    itemsPerPage: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    searchAriaLabel: PropTypes.string,
    searchPlaceHolder: PropTypes.string,
    disableSearch: PropTypes.bool,
    disablePageSize: PropTypes.bool,
};
