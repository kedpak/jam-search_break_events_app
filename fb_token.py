#!/usr/bin/python3
"""
Access token for Facebook's Graph Api
"""
import facebook

token = 'EAAIawWZATGhsBAL6EZCbhEvAeUZAGpITigblKu2ZCIrZBFko1DfOQJTjRgVHSdzlXFNvij9DdS6fnORhge2FUpSAMhlfJSQ4wZAf5PbZCiOrZAkPMFqMiur5pZBPZAwcVYtVTRrJLWjp1cgn4FrgGMVQ165XF1S0Tupp0ZD'

graph = facebook.GraphAPI(access_token=token, version = 2.10)
