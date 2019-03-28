import React from 'react';
import { MorphReplace } from 'react-svg-morph';
import { FelaComponent } from 'react-fela';

const strokeWidth = 5;
class Checked extends React.Component {
    render() {
        return (
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path
                        fill="none"
                        stroke="#fff"
                        strokeLinejoin="bevel"
                        strokeWidth="5"
                        d="M 12.972944,50.936147 51.027056,12.882035"
                    />
                    <path
                        fill="none"
                        strokeLinejoin="bevel"
                        d="m 5.1969746,31.909063 53.8166424,0"
                        opacity="0"
                        transform="s1 1"
                    />
                    <path
                        fill="none"
                        stroke="#fff"
                        strokeLinejoin="bevel"
                        d="M 12.972944,12.882035 51.027056,50.936147"
                    />
                </g>
            </svg>
        );
    }
}

class CheckBox extends React.Component {
    render() {
        return (
            <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path
                        fill="none"
                        stroke="#fff"
                        strokeLinejoin="bevel"
                        d="m 5.0916789,20.818994 53.8166421,0"
                    />
                    <path
                        fill="none"
                        stroke="#fff"
                        strokeLinejoin="bevel"
                        d="m 5.1969746,31.909063 53.8166424,0"
                        opacity="1"
                    />
                    <path
                        fill="none"
                        stroke="#fff"
                        strokeLinejoin="bevel"
                        d="m 5.0916788,42.95698 53.8166422,0"
                    />
                </g>
            </svg>
        );
    }
}

export default class Hamburger extends React.Component {
    constructor(props) {
        super(props);
    }

    toggleChecked() {
        this.props.onClick();
    }

    render() {
        return (
            <div onClick={this.toggleChecked.bind(this)}>
                <FelaComponent style={{ '>svg>path': { strokeWidth: 3 } }}>
                    <MorphReplace
                        width={64}
                        height={64}
                        rotation="none"
                        duration={150}
                    >
                        {this.props.checked ? (
                            <Checked key="checked" />
                        ) : (
                            <CheckBox key="checkbox" />
                        )}
                    </MorphReplace>
                </FelaComponent>
            </div>
        );
    }
}
