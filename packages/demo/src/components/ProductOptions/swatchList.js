import React, { Component } from 'react';
import { arrayOf, object, shape, string } from 'prop-types';
import { List } from '@magento/peregrine';

import Swatch from './swatch';

class SwatchList extends Component {
    static propTypes = {
        items: arrayOf(object)
    };

    render() {
        return <List renderItem={Swatch} {...this.props} />;
    }
}

export default SwatchList;
