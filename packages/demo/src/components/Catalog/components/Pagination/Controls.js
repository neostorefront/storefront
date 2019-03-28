import React from 'react';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import ChevronsLeft from 'react-feather/dist/icons/chevrons-left';
import ChevronsRight from 'react-feather/dist/icons/chevrons-right';
import { FelaComponent } from 'react-fela';
import Tiles from './Tiles';
import { getLeadTile } from './utils';

const control = ({ isActive }) => ({
    border: '1px solid #d8d8d8',
    backgroundColor: '#fff',
    cursor: isActive ? 'pointer' : 'not-allowed',
    padding: '2px',
    height: '22px',
    verticalAlign: 'middle',

    '&:hover': {
        backgroundColor: '#ddd',
    },
});

const Control = props => {
    const { icon: Icon, isActive, onClick, label } = props;

    return (
        <FelaComponent style={control} isActive={isActive}>
            {({ className }) => (
                <button
                    aria-label={label}
                    onClick={onClick}
                    className={className}
                    disabled={!isActive}
                >
                    <Icon size={16} />
                </button>
            )}
        </FelaComponent>
    );
};

const controls = {
    display: 'flex',
    justifyContent: 'center',

    '> button:not(:first-child)': {
        borderLeft: 'none',
    },

    '> button:first-child': {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
    },

    '> button:last-child': {
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px',
    },
};

const Controls = ({ currentPage, totalPages, setPage, tileBuffer }) => {
    const leadTile = getLeadTile(currentPage, totalPages, tileBuffer);
    const rightSkip = Math.min(
        totalPages,
        leadTile + tileBuffer * 2 + (tileBuffer + 1)
    );
    const leftSkip = Math.max(1, leadTile - (tileBuffer + 1));
    const isActiveLeft = !(currentPage === 1);
    const isActiveRight = !(currentPage === totalPages);

    return (
        <FelaComponent style={controls}>
            <Control
                icon={ChevronsLeft}
                isActive={isActiveLeft}
                onClick={() => setPage(leftSkip)}
                label="move to the first page"
            />
            <Control
                icon={ChevronLeft}
                isActive={isActiveLeft}
                onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                label="move to the previous page"
            />

            <Tiles
                currentPage={currentPage}
                totalPages={totalPages}
                setPage={setPage}
                tileBuffer={tileBuffer}
            />

            <Control
                icon={ChevronRight}
                isActive={isActiveRight}
                onClick={() =>
                    currentPage < totalPages && setPage(currentPage + 1)
                }
                label="move to the next page"
            />
            <Control
                icon={ChevronsRight}
                isActive={isActiveRight}
                onClick={() => setPage(rightSkip)}
                label="move to the last page"
            />
        </FelaComponent>
    );
};

export default Controls;
