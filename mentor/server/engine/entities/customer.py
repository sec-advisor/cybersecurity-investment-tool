class Customer:
    "General modeling of a customer"
    id = None
    name = None

    region = None
    max_price = None
    currency = None
    priceWeight = None

    deploymentTime = None
    deploymentWeight = None

    leasingPeriod = None
    leasingWeight = None

    serviceType = None
    serviceTypeWeight = None

    services = []
    serviceSimilarity = None