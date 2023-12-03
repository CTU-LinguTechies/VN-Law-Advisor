FROM python:3.7

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
ENV FLASK_APP=app.py

CMD ["flask", "run", "--host=0.0.0.0", "--port=5001"]
