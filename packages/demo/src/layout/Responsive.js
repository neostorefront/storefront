import { createComponent } from 'react-fela';
import { mapValueToMediaQuery } from 'fela-tools';

const Responsive = ({ width, widths }) => ({
    height: '100%',
    margin: '0 auto',
    padding: '0 1em',
    width,
    extend: [mapValueToMediaQuery(widths, value => ({ width: value }))],
});

export default createComponent(Responsive);
