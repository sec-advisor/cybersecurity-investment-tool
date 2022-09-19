FROM mongo

COPY *.json ./

CMD mongoimport --host mongodb --db sec-advisor --collection segment-definitions --authenticationDatabase admin --username root --password aWEsomeDatabase --type json --file /segment-definitions.json --jsonArray && mongoimport --host mongodb --db sec-advisor --collection optimal-investment-equations --authenticationDatabase admin --username root --password aWEsomeDatabase --type json --file /optimal-investment-equations.json --jsonArray
