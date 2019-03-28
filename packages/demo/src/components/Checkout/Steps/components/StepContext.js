// @flow
import { createContext } from 'react';

type StepContextType = {
    open: (name: string) => void,
};

const StepContext = createContext<StepContextType>({
    open: () => {},
});

export default StepContext;
