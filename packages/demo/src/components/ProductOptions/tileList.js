import React, { Component } from 'react';
import { arrayOf, object, shape, string } from 'prop-types';
import { List } from '@magento/peregrine';

import Tile from './tile';

class TileList extends Component {
    static propTypes = {
        items: arrayOf(object)
    };

    render() {
        return <List renderItem={Tile} {...this.props} />;
    }
}

export default TileList;
