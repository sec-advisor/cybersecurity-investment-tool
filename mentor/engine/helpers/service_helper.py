from engine.helpers.const.service_characteristics import TYPE, REGIONS, DEPLOYMENT_TIME, LEASING_PERIOD


class ServiceHelper:
    """Service Helper"""

    def __init__(self, services, customer_budget):
        self.customer_budget = customer_budget
        self.services = services
        self.type_dict = self.dict_characteristics(TYPE)
        self.region_dict = self.dict_characteristics(REGIONS)
        self.deployment_dict = self.dict_characteristics(DEPLOYMENT_TIME)
        self.leasing_dict = self.dict_characteristics(LEASING_PERIOD)

    def dict_characteristics(self, service_characteristic):
        """Return a dictionary of a given characteristic with calculated indices"""
        assert isinstance(service_characteristic, list), "Characteristic should be a list"
        return {service_characteristic[i]: (i+1) * ((self.customer_budget/2) / len(service_characteristic)) for i in range(0, len(service_characteristic))}

    def calculate_index(self, service_characteristic, indiv_characteristic):
        assert isinstance(service_characteristic, dict), "Characteristic should be a dictionary"
        assert isinstance(indiv_characteristic, list) or isinstance(indiv_characteristic, str)
        index = 0

        if isinstance(indiv_characteristic, list):
            for key, value in service_characteristic.items():
                if key in indiv_characteristic:
                    index += value
        elif isinstance(indiv_characteristic, str):
            for key, value in service_characteristic.items():
                if indiv_characteristic == key:
                    index = value

        return index

    def filter_by_price(self, max_price = None, updated_services = None):
        """Return services between a price range"""
        services_found = []
        if updated_services is not None:
            services = updated_services
        else:
            services = self.services
        if max_price:
            for s in services:
                if s.price <= max_price:
                    services_found.append(s)
        return services_found

    def filter_by_type(self, types, updated_services = None):
        """Return services of a given type"""
        assert isinstance(types, list), "Service Type should be a list"
        services_found = []
        if updated_services is not None:
            services = updated_services
        else:
            services = self.services
        for s in services:
            if set(types) <= set(s.type):
                services_found.append(s)
        return services_found

    def filter_by_attack_type(self, attack_types, updated_services = None):
        """Return services that protect against a given attack type"""
        assert isinstance(attack_types, list), "Service Type should be a list"
        services_found = []
        if updated_services is not None:
            services = updated_services
        else:
            services = self.services
        for s in services:
            if set(attack_types) <= set(s.features):
                services_found.append(s)
        return services_found

    def filter_by_region(self, regions, updated_services = None):
        """Return services of a given region"""
        assert isinstance(regions, list), "regions should be a list"
        services_found = []
        if updated_services is not None:
            services = updated_services
        else:
            services = self.services
        for s in services:
            if set(regions) <= set(s.region):
                services_found.append(s)
        return services_found

    def apply_filters_to_services(self, cs):
        list = self.filter_by_price(cs.budget)
        list = self.filter_by_region(cs.region, list)
        list = self.filter_by_type(cs.serviceType, list)
        list = self.filter_by_attack_type(cs.attackType, list)
        self.services = list