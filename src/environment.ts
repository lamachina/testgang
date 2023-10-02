export function bitcoindUrl() {
    return 'https://bit.mattercloud.io';
}

export function mediaUrl() {
    return process.env.REACT_APP_MEDIA_API;
}

export function serverApiUrl() {
    return process.env.REACT_APP_BASE_API;
}

export function stripePublishKey() {
    return process.env.REACT_APP_STRIPE_PUBLISH_KEY;
}

