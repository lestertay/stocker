export enum PageStatus {
    Loading = 'LOADING',
    Ready = 'READY',
    Error = 'ERROR',
}

export enum Predicted {
    Positive = 'POSITIVE',
    Negative = 'NEGATIVE',
    Neutral = 'NEUTRAL',
    Unavailable = 'UNAVAILABLE',
}

export const predicatedEnumMap: {[key: string]: Predicted} = {
    'positive': Predicted.Positive,
    'negative': Predicted.Negative,
    'neutral': Predicted.Neutral,
}

export type ResultsData = {
    username: string,
    handle: string,
    comments: string,
    replies: number,
    retweets: number,
    likes: number,
    predicted: Predicted,
    timestamp: string,
    imageSrc?: string
}