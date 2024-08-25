import pandas as pd
import json
from flask import Flask,jsonify
from flask_cors import CORS


# Load the CSV file
df = pd.read_csv("Westbengalcompanies.csv")

# Define the Company class
class Company:
    def __init__(self, row):
        self.cin = row['CIN']
        self.name = row['CompanyName']
        self.roc_code = row['CompanyROCcode']
        self.category = row['CompanyCategory']
        self.sub_category = row['CompanySubCategory']
        self.claas = row['CompanyClass']
        self.authorized_capital = row['AuthorizedCapital']
        self.paidup_capital = row['PaidupCapital']
        self.registrationdate_date = row['CompanyRegistrationdate_date']
        self.office_address = row['Registered_Office_Address']
        self.listing_status = row['Listingstatus']
        self.company_status = row['CompanyStatus']
        self.state_code = row['CompanyStateCode']
        self.indian_foreign = row['CompanyIndian/Foreign Company']
        self.nic_code = row['nic_code']
        self.industrial_classification = row['CompanyIndustrialClassification']
        self.genuinity = 0
    def to_dict(self):
        return self.__dict__

# Create a list to store the company objects
data = []

# Iterate through the rows of the DataFrame and create Company objects
for index, row in df.iterrows():
    company = Company(row)
    data.append(company.to_dict())  # Convert each company object to a dictionary

def update_genScore():
    for x in data:
        if x['listing_status'] == 'Listed':
            x['genuinity'] += 10
        else:
            x['genuinity'] = 0
        if x['company_status'] == 'Active':
            x['genuinity'] += 15
        elif x['company_status'] == 'Under process of striking off':
            x['genuinity'] += 2
        elif x['company_status'] == 'Under Liquidation':
            x['genuinity'] += 2
        elif x['company_status'] == 'Strike off':
            x['genuinity'] += 0
        elif x['company_status'] == 'Dissolved (Liquidated)':
            x['genuinity'] += 0
        elif x['company_status'] == 'Converted to LLP':
            x['genuinity'] += 4
        elif x['company_status'] == 'Amalgamated':
            x['genuinity'] += 8
        elif x['company_status'] == 'Dormant under section 455':
            x['genuinity'] += 5
        else:
            x['genuinity'] += 3
        if x['claas'] == 'Public':
            x['genuinity'] += 5
        elif x['claas'] == 'Private':
            x['genuinity'] += 2
        elif x['claas'] == 'One Person Company':
            x['genuinity'] += 1
        else:
            x['genuinity'] += 0
        length = len(str(x['registrationdate_date']))
        year = 0
        for y in range(length-4,length):
            year += int(y)
        if year < 2000:
            x['genuinity'] += 10
        elif year < 2010 and year >= 2000:
            x['genuinity'] += 5
        else:
            x['genuinity'] += 2
        if x['category'] == 'Company limited by shares':
            x['genuinity'] += 10
        elif x['category'] == 'Company limited by guarantee':
            x['genuinity'] += 5
        if x['sub_category'] == 'Non-government company':
            x['genuinity'] += 5
        elif x['sub_category'] == 'Guarantee and association Company':
            x['genuinity'] += 2
        elif x['sub_category'] == 'Subsidiary of company incorporated outside India':
            x['genuinity'] += 5
        elif x['sub_category'] == 'Unclassified':
            x['genuinity'] += 0
        else:
            x['genuinity'] += 10
        if x['authorized_capital'] >= 100000000:
            x['genuinity'] += 20
        elif x['authorized_capital'] > 10000000 and x['authorized_capital'] <= 99999999:
            x['genuinity'] += 18
        elif x['authorized_capital'] > 5000000 and x['authorized_capital'] <= 10000000:
            x['genuinity'] += 15
        elif x['authorized_capital'] > 2000000 and x['authorized_capital'] <= 5000000:
            x['genuinity'] += 14
        elif x['authorized_capital'] > 1000000 and x['authorized_capital'] <= 2000000:
            x['genuinity'] += 13
        elif x['authorized_capital'] > 500000 and x['authorized_capital'] <= 1000000:
            x['genuinity'] += 12
        elif x['authorized_capital'] > 100000 and x['authorized_capital'] <= 500000:
            x['genuinity'] += 11
        elif x['authorized_capital'] < 100000 and x['authorized_capital'] > 1000:
            x['genuinity'] += 10
        else:
            x['genuinity'] += 0
        if x['authorized_capital'] != 0:
            if x['paidup_capital']/x['authorized_capital'] >= 1:
                x['genuinity'] += 0
            elif x['paidup_capital']/x['authorized_capital'] >= 0.8 and x['paidup_capital']/x['authorized_capital'] < 1:
                x['genuinity'] += 5
            elif x['paidup_capital']/x['authorized_capital'] >= 0.5 and x['paidup_capital']/x['authorized_capital'] < 0.8:
                x['genuinity'] += 10
            elif x['paidup_capital']/x['authorized_capital'] >= 0.2 and x['paidup_capital']/x['authorized_capital'] < 0.5:
                x['genuinity'] += 15
            elif x['paidup_capital']/x['authorized_capital'] > 0 and x['paidup_capital']/x['authorized_capital'] < 0.2:
                x['genuinity'] += 5
        else:
            x['genuinity'] += 0
update_genScore()

# result_df = df[df['CompanyName'].str.contains('tr', case=False, na=False)]
# print(result_df.head()['CompanyName'])

app = Flask(__name__)

CORS(app)

# Define a route that accepts a name as a string parameter
@app.route('/database/<name>')
def get_company(name):
    for x in data:
        # print(f"name ",name,x['name'])
        if x['name'].lower() == name.lower():  # Case-insensitive comparison
            return {
                "name": x['name'],
                "CIN": x['cin'],
                "ROC_code": x['roc_code'],
                "Company_Category": x['category'],
                "Company_sub_category": x['sub_category'],
                "Company_Class": x['claas'],
                "Authorized_Capital": x['authorized_capital'],
                "Paidup_Capital": x['paidup_capital'],
                "Registration_Date": x['registrationdate_date'],
                "Office_Address": x['office_address'],
                "Listing_Status": x['listing_status'],
                "Company_Status": x['company_status'],
                "State_Code": x['state_code'],
                "Indian_Foreign": x['indian_foreign'],
                "NIC_code": x['nic_code'],
                "Industrial_Classification": x['industrial_classification'],
                "Genuinity": x['genuinity']
            }
    return {"ERROR": 'Company Not Found'}

@app.route('/database/<category>/<name>')
def get_company_category(category,name):
    for x in data:
        if x['Industrial Classification'].lower() == category.lower() and x['name'].lower() == name.lower():
            return {
                "name": x['name'],
                "CIN": x['cin'],
                "ROC_code": x['roc_code'],
                "Company_Category": x['category'],
                "Company_sub_category": x['sub_category'],
                "Company_Class": x['claas'],
                "Authorized_Capital": x['authorized_capital'],
                "Paidup_Capital": x['paidup_capital'],
                "Registration_Date": x['registrationdate_date'],
                "Office_Address": x['office_address'],
                "Listing_Status": x['listing_status'],
                "Company_Status": x['company_status'],
                "State_Code": x['state_code'],
                "Indian_Foreign": x['indian_foreign'],
                "NIC_code": x['nic_code'],
                "Industrial_Classification": x['industrial_classification']
            }
    return {"error": 'Company Not Found'}

if __name__ == '__main__':
    app.run(port=5100)