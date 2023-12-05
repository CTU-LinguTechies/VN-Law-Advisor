import redis
from dotenv import load_dotenv
import os
load_dotenv()
redis_host = os.getenv("REDIS_HOST") 
# Create a redis client
redisClient = redis.Redis(host=redis_host, port=6379, db=0)

# Check the connection
if redisClient.ping():
    print('Connected to Redis server')
else:
    print('Failed to connect to Redis server')
