from schema import Schema, And, Use
from engine.helpers.const.service_characteristics import TYPE, REGIONS, DEPLOYMENT_TIME, LEASING_PERIOD

recommend_service_schema = Schema({'region': [And(str, Use(str.upper), lambda s: s in REGIONS)],
                                    'serviceType':  [And(str, Use(str.upper), lambda s: s in TYPE)],
                                    'attackType':  [And(Use(str.upper))],
                                    'deploymentTime':  And(str, Use(str.upper), lambda s: s in DEPLOYMENT_TIME),
                                    'deploymentTimeWeight': And(Use(int), lambda n: 1 <= n <= 3),
                                    'leasingPeriod': And(str, Use(str.upper), lambda s: s in LEASING_PERIOD),
                                    'leasingPeriodWeight': And(Use(int), lambda n: 1 <= n <= 3),
                                    'budget': And(Use(int), lambda n: n > 0),
                                    'budgetWeight': And(Use(int), lambda n: 1 <= n <= 3)})
