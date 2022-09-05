FROM python:3.10-alpine

WORKDIR /server

COPY requirements.txt .

RUN apk --no-cache add musl-dev linux-headers g++ imagemagick imagemagick-dev
RUN pip install Wand
RUN export MAGICK_HOME=/usr

RUN pip install -r requirements.txt

COPY . .

ENV PORT=8000



CMD [ "python3", "./server.py" ]