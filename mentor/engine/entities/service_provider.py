class Service:
    "General modeling of a protection service"

    # General characteristics
    id = None
    serviceName = None
    # description = None
    type = None
    region = None
    deployment = None  # time to market
    leasingPeriod = None

    # Costs
    price = None
    currency = None

    # User definitions
    priority = None
    userRating = None

    # Recommender rating
    rating = None

    # Metrics
    cosineSimilarity = None
    jaccardSimilarity = None
    euclideanDistance = None
    manhattanDistance = None
    # TODO create sub classes with more specialized parameters
