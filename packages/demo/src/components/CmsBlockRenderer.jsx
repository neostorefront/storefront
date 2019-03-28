// @flow
import React, { Fragment, useEffect } from 'react';
import { navigate } from 'gatsby';
import ProductsList from 'components/CmsBlock/ProductsList';

/**
 * CmsBlockRenderer Properties
 */
type Props = {
    nodes: Object[],
};

const CmsBlockRenderer = ({ nodes }: Props) => {

    useEffect(function() {
        const links = document.querySelectorAll('.widget a');
        for(const link of links) {
            link.onclick = (e) => {
                const {target, currentTarget}= e
                e.preventDefault()

                if(target.href) {
                    const url = new URL(target.href);
                    navigate(url.pathname)
                }
                if(currentTarget.href) {
                    const url = new URL(currentTarget.href);
                    navigate(url.pathname)
                }
                return false;
            }
        }
    });

    return nodes.map((block, idx) => {
        const result = [];

        console.log("block:", block)

        switch (block.type) {
            case 'text':
                return (
                    <div
                        className="widget"
                        key={block.type + '-' + idx}
                        dangerouslySetInnerHTML={{ __html: block.value.replace(/.html/g, '') }}
                    />
                );

            case 'products':
                return (<ProductsList key={block.type + '_' + idx} {...block}/>)
        }

        return result;
    });
};

export default CmsBlockRenderer;
