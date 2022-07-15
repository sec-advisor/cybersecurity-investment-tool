FROM python:3.9-alpine

WORKDIR /server

COPY requirements.txt .

RUN apk --no-cache add musl-dev linux-headers g++

RUN pip install -r requirements.txt

COPY . .

ENV PORT=8000

CMD [ "python3", "./server.py" ]