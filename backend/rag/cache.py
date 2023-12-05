import redis
 
# Create a redis client
redisClient = redis.Redis(host='localhost', port=6379, db=0)

# Check the connection
if redisClient.ping():
    print('Connected to Redis server')
else:
    print('Failed to connect to Redis server')
