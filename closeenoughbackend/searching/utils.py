import googlemaps
import responses

class DistanceMatrix(object):

    def __init__(self, key='AIzaSyBTxamLvsUkEb5yo-i7NxTgsZOuoAvbmIU'):
        self.client = googlemaps.Client(key=key)
        self.matrix = {}

    def calc_matrix(self, olat, olng, dst):

        responses.add(responses.GET,
                      'https://maps.googleapis.com/maps/api/distancematrix/json',
                      body='{"status":"OK","rows":[]}',
                      status=200,
                      content_type='application/json')

        origins = olat, olng
        destinations = dst

        self.matrix = self.client.distance_matrix(origins, destinations)
        print(self.matrix)

        return self.matrix

