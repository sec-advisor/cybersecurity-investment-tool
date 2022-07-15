FROM python:latest

# Set the working directory to /server
WORKDIR /server
# copy everything into the container at /server
COPY . .
ENV PORT=5001
# Make port 5001 available to the world outside this container
EXPOSE 5001
# install dependencies
RUN pip install -r requirements.txt
# Run the app when the container launches
CMD [ "python3", "./server.py" ]