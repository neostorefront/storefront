export function transformMagentoFeed(feed) {
    return feed.map(item => ({
        id: item.id,
        sku: item.sku,
        name: item.name,
        price: item.price.regularPrice.amount.value,
        qty: 1,
        url: `/${item.url_key}/`,
        image: item.image,
    }));
}
