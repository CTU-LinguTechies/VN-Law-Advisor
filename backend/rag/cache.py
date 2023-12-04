import redis
from dotenv import load_dotenv
import os
load_dotenv()
redis_host = os.getenv("REDIS_HOST")
redisClient = redis.Redis(host=redis_host, port=6379, db=0)

