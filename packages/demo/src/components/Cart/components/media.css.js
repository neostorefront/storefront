// TODO use layout instead
const sizes = {
    desktop: 992,
    tablet: 800,
    phone: 576,
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = styles => ({
        [`@media (max-width: ${sizes[label] / 16}em)`]: {
            ...styles,
        },
    });

    return acc;
}, {});
