import { MongooseModule} from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
//import { it } from 'node:test';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    const uri = 'mongodb://root:root@db:27017/tweets_service_test?authSource=admin';
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const tweet = await service.create({
      content: 'Hello world',
      screen_name: 'Vilson Lopes',
    });

    expect(tweet.content).toBe('Hello world');
    expect(tweet.screen_name).toBe('Vilson Lopes');
  });
});
