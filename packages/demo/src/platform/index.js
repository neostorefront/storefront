// @flow
import { createContext } from 'react';

type CartItem = {
    id: number,
};

type Platform = {
    loadCart(): void,
    addItem(item: any): void,
    updateItem(item: Object): void,
    setShippingAddress(address: Object): void,
    setBillingAddress(address: Object): void,
    setShippingMethod(method: String): void,
};

const notImplemented = () => {
    console.error('not implemented!');
};

export const PlatformContext = createContext<Platform>({
    loadCart: notImplemented,
    addItem: notImplemented,
    updateItem: notImplemented,
    setShippingAddress: notImplemented,
    setBillingAddress: notImplemented,
    setShippingMethod: notImplemented,
});

type Catalog = {
    items: Object[],
    setItems: (Object[]) => void,
};

export const CatalogContext = createContext<Catalog>({
    items: [],
    setItems: notImplemented,
});
