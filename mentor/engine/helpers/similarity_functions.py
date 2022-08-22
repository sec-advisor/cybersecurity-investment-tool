import numpy as np
from decimal import Decimal

def square_rooted(x):
    return np.sqrt(sum([a * a for a in x]))


def cosine_similarity(x, y):
    numerator = sum(a*b for a, b in zip(x, y))
    denominator = square_rooted(x)*square_rooted(y)
    return numerator/float(denominator)


def jaccard_similarity(x, y):
    intersection_cardinality = len(set.intersection(*[set(x), set(y)]))
    union_cardinality = len(set.union(*[set(x), set(y)]))
    return intersection_cardinality/float(union_cardinality)


def euclidean_distance(x, y):
    return np.sqrt(sum(pow(a-b, 2) for a, b in zip(x, y)))


def manhattan_distance(x, y):
    return sum(abs(a-b) for a, b in zip(x, y))


def pearson_correlation(x, y):
    return np.corrcoef(x, y)[0, 1]


def nth_root(value, n_root):
    root_value = 1 / float(n_root)
    return float(round(Decimal(value) ** Decimal(root_value), 3))


def minkowski_distance(x, y, p_value):
    return nth_root(sum(pow(abs(a - b), p_value) for a, b in zip(x, y)), p_value)
