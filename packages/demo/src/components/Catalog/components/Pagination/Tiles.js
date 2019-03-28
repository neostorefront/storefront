import React from 'react';
import { FelaComponent } from 'react-fela';
import { getLeadTile } from './utils';

const tile = ({ isActive }) => ({
    backgroundColor: isActive ? '#f2c862' : '#fff',
    border: '1px solid #d8d8d8',
    cursor: 'pointer',
    padding: '2px 6px',
    height: '22px',
    width: '26px',
    verticalAlign: 'middle',
    fontWeight: 600,

    '&:hover': {
        backgroundColor: '#ddd',
    },
});

const Tile = ({ onClick, isActive, children }) => {
    return (
        <FelaComponent style={tile} isActive={isActive}>
            {({ className }) => (
                <button onClick={onClick} className={className}>
                    {children}
                </button>
            )}
        </FelaComponent>
    );
};

const Tiles = ({ currentPage, totalPages, setPage, tileBuffer }) => {
    const tiles = [];
    const visibleBuffer = Math.min(tileBuffer * 2, totalPages - 1);
    const leadTile = getLeadTile(currentPage, totalPages, tileBuffer);

    for (let i = leadTile; i <= leadTile + visibleBuffer; i++) {
        const tile = i;
        tiles.push(tile);
    }

    return (
        <>
            {tiles.map(tile => (
                <Tile
                    key={tile}
                    onClick={() => setPage(tile)}
                    isActive={currentPage === tile}
                >
                    {tile}
                </Tile>
            ))}
        </>
    );
};

export default Tiles;
