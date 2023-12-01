FROM python:3.7

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
ENV FLASK_APP=app.py
EXPOSE 5000

WORKDIR /app/deploy
CMD ["flask", "run", "--host=0.0.0.0"]
