FROM python:3.8-alpine

COPY . /app
WORKDIR /app

# RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENV PORT 8000
EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]