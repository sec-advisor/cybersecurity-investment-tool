import os
import requests
import json
import matplotlib.pyplot as plt

url = 'http://localhost:3333/api/analyse-companies'

target_company = {
    "cloud": 2,
    "country": "GER",
    "multifactor": 0,
    "organizationSize": 'Small',
    "remote": 45,
    "id": 1,
    "revenue": 7000000,
    "marketShare": 9,
    "growthRate": 4,
    "cybersecurityBudget": 40000,
    "cybersecurityStaffing": 5,
    "cybersecurityTrainingInvestment": 3000,
    "cybersecurityInsuranceInvestment": 6000,
    "cyberAttackThreats": 2,
    "networkInfrastructure": 0,
    "remoteAccess": 0,
    "bpf": "v/(1+(z/(L*0.001)))",
    "sharedData": [
      "cloud",
      "country",
      "multifactor",
      "remote",
      "marketShare",
      "growthRate",
      "cybersecurityBudget",
      "cybersecurityTrainingInvestment",
      "cyberAttackThreats",
      "remoteAccess",
      "cybersecurityInvestment",
      "bpf"
    ],
    "cybersecurityInvestment": 30000
  }

with open('assets/mock-companies.json') as companies_file:
  file_contents = json.load(companies_file)

response = requests.post(os.path.join(url), json={'company': target_company})
response_json = response.json()
eBusinessCompanies = response_json["pearsonCorrelationTechnical"]
eBusinessValues = list(map(lambda x: x["pearsonCorrelationTechnical"], eBusinessCompanies))[:10]
print(eBusinessValues)
# Plot data
x = eBusinessValues
y = list(map(lambda x: 1, eBusinessValues))

# print(x)

# Create a line plot
plt.plot(x, y, marker='o', linestyle='None', color='b', label='Company')

# Add company id
for idx, value in enumerate(x):
    print(idx)
    print(eBusinessCompanies[idx]["id"])

    if (idx == 0):
       plt.text(value - 0.0000000001, 1.005, str(eBusinessCompanies[9]["id"]) +', ' + str(eBusinessCompanies[8]["id"])+', ' + str(eBusinessCompanies[7]["id"])+', ' + str(eBusinessCompanies[6]["id"])+', ' + str(eBusinessCompanies[5]["id"])+', ' + str(eBusinessCompanies[4]["id"])+', ' + str(eBusinessCompanies[3]["id"])+', ' + str(eBusinessCompanies[2]["id"])+', ' + str(eBusinessCompanies[1]["id"])+', ' + str(eBusinessCompanies[0]["id"]))
    # if (idx == 3):
    #    plt.text(value, 1.005, str(eBusinessCompanies[3]["id"]) +', ' + str(eBusinessCompanies[4]["id"])+', ' + str(eBusinessCompanies[5]["id"])+', ' + str(eBusinessCompanies[6]["id"])+', ' + str(eBusinessCompanies[7]["id"]))
    # elif(idx == 8 or idx == 9):
    #   if (idx %2 == 0):
    #     plt.text(value, 1.005, eBusinessCompanies[idx]["id"])
    #   else:
    #     plt.text(value, 0.995, eBusinessCompanies[idx]["id"])
       

    # if (idx %2 == 0):
    #   plt.text(value, 1.005, eBusinessCompanies[idx]["id"])
    # else:
    #   plt.text(value, 0.995, eBusinessCompanies[idx]["id"])
    



# Add labels and title
plt.xlabel('Pearson Correlation')

plt.yticks([])
# Add a legend
plt.legend()

# Display the plot
plt.show()

