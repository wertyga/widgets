import { Review } from '~/server/models';
import { config } from '~/server/config';

export const getServicePages = async (service, clientID, options = {}) => {
    const { offset, limit } = options;
    switch(service) {
        case(config.services.reviews) :
            return Review.find({ owner: clientID }).skip(parseInt(offset)).limit(parseInt(limit));
        
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
