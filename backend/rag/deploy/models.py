import pymysql
import os
import datetime

import peewee as pw
from dotenv import load_dotenv

load_dotenv()
db_password = os.getenv("MYSQL_ROOT_PASSWORD") 

conn = pymysql.connect(host='localhost', user='root', password=db_password)
cursor = conn.cursor()
cursor.execute("SHOW DATABASES LIKE 'rag_service'")
result = cursor.fetchall()
if result:
    print("Database exists")
else:
    print("Database not exists")
    cursor.execute('CREATE DATABASE rag_service')
conn.close()

myDB = pw.MySQLDatabase(
    host="localhost",
    port=3306,
    user="root",
    passwd=db_password,
    database="rag_service"
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
    
class CommentModel(MySQLModel): 
    email  = pw.CharField(50)
    question_id = pw.ForeignKeyField(QuestionModel)
    content = pw.TextField()

myDB.connect()
myDB.create_tables([QuestionModel, CommentModel])