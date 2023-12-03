import redis

class Cache: 
    # Create a redis client
    redisClient = redis.Redis(host='localhost', port=6379, db=0)

    def __init__(self) -> None:
        # Check the connection
        if self.redisClient.ping():
            print('Connected to Redis server')
        else:
            print('Failed to connect to Redis server')
        pass

    def set(self, key, value):
        self.redisClient.set(name=key, value=value)
        
    def get(self, key,): 
        return self.redisClient.get(name=key)