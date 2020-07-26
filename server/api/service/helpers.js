import { Domain, Review, ReviewLegend } from '~/server/models';
import { config } from '~/server/config';

export const getServicePages = async (service, clientID) => {
    // const clientOrigins = await Review.find({ owner: clientID }, 'origin');
    // const origins = clientOrigins.map(({ origin }) => origin);
    // console.log(origins)
    
    switch(service) {
        case(config.services.reviews) :
            return Review.find({ owner: clientID }, ['origin', 'href', 'hasNew']);
        
        default:
            return [];
    }
};

export const getServiceCounts = async (service, clientID) => {
    switch(service) {
        case(config.services.reviews): {
            const reviews = await Review.find({ owner: clientID });
            return reviews.reduce((init, next) => ({
                ...init,
                [next.origin]: {
                    ...(init[next.origin] || []),
                    hasNew: !!reviews.find(item => item.origin === next.origin && !!item.hasNew),
                    [next.href]: {
                        count: reviews.filter(item => item.href === next.href).length,
                        hasNew: !!reviews.find(item => item.href === next.href && !!item.hasNew),
                    },
                },
            }), {});
        }
        
        default:
            return {};
    }
};
