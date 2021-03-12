import React, { useEffect, useState } from 'react';
import moment from "moment";

const ListTable = (props: any) => {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        setColumns(props.columns);
        setRows(props.rows);
    }, [props]);
    
    
    const optionValue = (st: any, val: any, key: any) => {
        try {
            if (key && key.length === 4) {
                return <ol>{
                    key.map((element: any) =>
                        <li>{val[element]}</li>
                    )}</ol>
            }
            return ''
        } catch (error) {
            return ''
        }
    }

    const [startingVal, setStartingVal] = useState(0);
    const [endingVal, setEndingVal] = useState(props.paginate ? props.paginate : rows.length - 1);
    const paginateRows = (rows: any) => {
        return rows ? rows.slice(startingVal, endingVal) : 1;
    }
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        let totalPages: number = 0;
        if (rows) {
            totalPages = parseInt(Math.ceil((rows.length / props.paginate)).toFixed(0));
        }
        setTotalPages(totalPages);
    }, [props.paginate, rows]);

    const sliced = (st: any, val: any, key: string) => {
        try {
            if (st) {
                return val[key].slice(0, st)
            } else {
                return val[key]
            }
        } catch (error) {
            return ''
        }
    }

    const paginate = (val: number) => {
        if (val === 1) {
            if (endingVal > rows.length - 1) {
                return;
            } else {
                setStartingVal(startingVal + props.paginate);
                setEndingVal(endingVal + props.paginate);
            }
        } else {
            if (startingVal < 1) {
                return;
            } else {
                setStartingVal(startingVal - props.paginate);
                setEndingVal(endingVal - props.paginate);
            }
        }
        if (pageNumber !== startingVal && pageNumber !== endingVal) {
            setPageNumber(pageNumber + val);
        }
    }

    const hasActions = () => {
        return props.downloadAction ||
            props.addAction ||
            props.editAction ||
            props.viewAction ||
            props.deleteAction;
    }

    return (
        <div className="list-table card bg-light outline mb-md">
            <div className="table-headers">
                {
                    columns.map((header: any, key: any) => (
                        <div
                            className={`table-header-items ${header.headerClasses} flex-${header.flexVal} text-${header.align}`}
                            key={key}
                        >
                            {header.label}
                        </div>
                    ))
                }
                {
                    hasActions() &&
                    <div className={`table-header-items actions flex-2`}>Actions</div>
                }
            </div>
            {
                rows && rows.length !== 0 ?
                    <div className="table-body">
                        {
                            paginateRows(rows).map((rowData: any, key: any) => (
                                <div className="table-row" key={key}>
                                    {
                                        columns.map((columnHeader: any, key: any) =>
                                        (
                                            <div
                                                className={`table-body-items ${columnHeader.headerClasses} flex-${columnHeader.flexVal} text-${columnHeader.align}`}
                                                key={key}>
                                                <span
                                                    className={`${columnHeader.boxed ? rowData[columnHeader.field] : ''} pa-xs`}>
                                                    {columnHeader.date ?
                                                        moment(new Date(rowData[columnHeader.field])).format('YYYY-MM-DD') :
                                                            columnHeader.optionsArray ? optionValue(columnHeader.sliced, rowData, columnHeader.field)
                                                                    : sliced(columnHeader.sliced, rowData, columnHeader.field)}
                                                </span>
                                            </div>
                                        ))
                                    }
                                    {
                                        hasActions() &&
                                        (
                                            <div className="actions table-body-items flex-2">
                                                {props.viewAction ? <div className="flex items-center pointer" onClick={() => props.viewAction(rowData)}>
                                                    <i className="material-icons text-primary">visibility</i>
                                                    {props.viewText && props.viewText}
                                                </div> : ''}
                                                {props.downloadAction ? <div><i className="material-icons text-primary"
                                                    onClick={() => props.downloadAction(rowData.id)}>get_app</i>
                                                </div> : ''}
                                                {props.addAction ? <div><i className="material-icons text-primary"
                                                    onClick={() => props.addAction(rowData)}>add</i>
                                                </div> : ''}
                                                {props.editAction ? <div><i className="material-icons text-primary"
                                                    onClick={() => props.editAction(rowData)}>edit</i>
                                                </div> : ''}
                                                {props.deleteAction ? <div><i className="material-icons text-danger"
                                                    onClick={() => props.deleteAction(rowData)}>delete</i>
                                                </div> : ''}
                                            </div>
                                        )
                                    }

                                </div>
                            ))
                        }
                    </div> :
                    <div className="flex-centered">No Items Found.</div>
            }
            {
                props.paginate ?
                    <div className={'pagination-area pt-md flex items-center justify-end'}>
                        <label>Page {pageNumber} of {totalPages}</label>
                        <div className="button-area flex items-center">
                            <i className="material-icons" onClick={() => paginate(-1)}>chevron_left</i>
                            <i className="material-icons" onClick={() => paginate(1)}>chevron_right</i>
                        </div>
                    </div> : ''
            }
        </div>
    )
}

export default ListTable;
