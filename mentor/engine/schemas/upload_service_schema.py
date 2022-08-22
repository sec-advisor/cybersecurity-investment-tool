from schema import Schema, And, Use
from engine.helpers.const.service_characteristics import TYPE, REGIONS, DEPLOYMENT_TIME, LEASING_PERIOD

upload_service_schema = Schema({'productName': Use(str),
                                'Service':  Use(str),
                                'logo':  Use(str),
                                'fileName':  Use(str),
                                'description':  Use(str),
                                'region':  [And(str, Use(str.upper), lambda s: s in REGIONS)],
                                'serviceType': [And(str, Use(str.upper), lambda s: s in TYPE)],
                                'attackType': [And(Use(str.upper))],
                                'deploymentTime': And(str, Use(str.upper), lambda s: s in DEPLOYMENT_TIME),
                                'leasingPeriod': And(str, Use(str.upper), lambda s: s in LEASING_PERIOD),
                                'price': And(Use(int), lambda n: n > 0),
                                'txHash': Use(str),
                                'serviceHash': Use(str)})
