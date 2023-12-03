import pymysql
import os
import datetime

import peewee as pw
from dotenv import load_dotenv

load_dotenv()
db_name = os.getenv("MYSQL_DATABASE")
db_host = os.getenv("MYSQL_HOST")
db_password = os.getenv("MYSQL_ROOT_PASSWORD") 

conn = pymysql.connect(host=db_host, port=3306, user='root', password=db_password)
cursor = conn.cursor()
cursor.execute(f"SHOW DATABASES LIKE '${db_name}'")
result = cursor.fetchall()
if result:
    print("Database exists")
else:
    print("Database not exists")
    cursor.execute(f'CREATE DATABASE ${db_name}')
conn.close()

myDB = pw.MySQLDatabase(
    host=db_host,
    port=3306,
    user="root",
    passwd=db_password,
    database=db_name
)

class MySQLModel(pw.Model):
    """A base model that will use our MySQL database"""
    id = pw.PrimaryKeyField(null=False)
    createdAt = pw.DateTimeField(default=datetime.datetime.now)
    updatedAt = pw.DateTimeField()
    
    def save(self, *args, **kwargs):
        self.updatedAt = datetime.datetime.now()
        return super(MySQLModel, self).save(*args, **kwargs)

    class Meta:
        database = myDB
        legacy_table_names = False

class QuestionModel(MySQLModel):
    email = pw.CharField(50)
    question = pw.TextField()
    answer = pw.TextField()

myDB.connect()
myDB.create_tables([QuestionModel])