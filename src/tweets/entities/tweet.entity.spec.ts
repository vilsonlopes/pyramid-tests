import mongoose from 'mongoose';
import { Tweet, TweetSchema } from "./tweet.entity";

describe('Tweet Tests', () => {
    describe('Tweet Class', () => {
        it('shoud create a tweet', () => {
            const tweet = new Tweet({
                content: 'Hello world',
                screen_name: 'Vilson Lopes',
            });

            expect(tweet.content).toBe('Hello world');
            expect(tweet.screen_name).toBe('Vilson Lopes');
        });
    });

    describe('Using MongoDB', () => {
        let conn: mongoose.Mongoose;

        beforeEach(async () => {
            conn = await mongoose.connect(
                'mongodb://root:root@db:27017/tweets_entity_test?authSource=admin',
            );
        });

        afterEach(async () => {
            await conn.disconnect();
        });

        it('create a tweet document', async () => {
            const TweetModel = conn.model('Tweet', TweetSchema);
            const tweet = new TweetModel({
                content: 'Hello world',
                screen_name: 'Vilson Lopes',
            });
            await tweet.save();

            const tweetCreated = await TweetModel.findById(tweet._id);
            
            expect(tweetCreated.content).toBe('Hello world');
            expect(tweetCreated.screen_name).toBe('Vilson Lopes');
        });
    });
});