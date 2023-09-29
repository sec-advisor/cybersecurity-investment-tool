import os
import requests
import json
import matplotlib.pyplot as plt

url = 'http://localhost:3333/api/analyse-companies'

target_company = {
    "cloud": 2,
    "country": "GER",
    "multifactor": 0,
    "organizationSize": 'Medium',
    "remote": 45,
    "id": 1,
    "revenue": 7000000,
    "marketShare": 9,
    "growthRate": 4,
    "cybersecurityBudget": 7000,
    "cybersecurityStaffing": 3,
    "cybersecurityTrainingInvestment": 0,
    "cybersecurityInsuranceInvestment": 1000,
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
    "cybersecurityInvestment": 6000
  }

response = requests.post(os.path.join(url, 'custom-companies'), json={'company': target_company, 'compareCompanies': file_contents })
response_json = response.json()
print(response_json)
eBusinessCompanies = response_json["pearsonCorrelationBusiness"]
eBusinessValues = list(map(lambda x: x["pearsonCorrelationBusiness"], eBusinessCompanies))

# Plot data
x = eBusinessValues
y = list(map(lambda x: 1, eBusinessValues))

print(x)

# Create a line plot
plt.plot(x, y, marker='o', linestyle='None', color='b', label='Company')

# Add company id
for idx, value in enumerate(x):
    # if (idx == 1):
    #    plt.text(value, 1.005, str(eBusinessCompanies[1]["id"]) +', ' + str(eBusinessCompanies[2]["id"]))
    # if (idx == 0):
    #   plt.text(value, 1.005, eBusinessCompanies[idx]["id"])
    plt.text(value, 1.005, eBusinessCompanies[idx]["id"])



# Add labels and title
plt.xlabel('Pearson Correlation')

plt.yticks([])
# Add a legend
plt.legend()

# Display the plot
plt.show()

