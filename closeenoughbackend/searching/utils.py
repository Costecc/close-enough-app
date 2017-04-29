import googlemaps
import responses

class DistanceMatrix(object):

    def __init__(self, key='AIzaSyBTxamLvsUkEb5yo-i7NxTgsZOuoAvbmIU'):
        self.client = googlemaps.Client(key=key)
        self.matrix = {}


    def calc_matrix(self, olat, olng, dst, transport):

        responses.add(responses.GET,
                      'https://maps.googleapis.com/maps/api/distancematrix/json',
                      body='{"status":"OK","rows":[]}',
                      status=200,
                      content_type='application/json')

        origins = olat, olng
        destinations = dst

        if(transport == 'driving'):
            mode = 'driving'
            self.matrix = self.client.distance_matrix(origins, destinations, mode)
        elif(transport == 'transit'):
            mode = 'transit'
            transit_mode = 'rail|bus'
            self.matrix = self.client.distance_matrix(origins, destinations, mode, transit_mode)
        elif(transport == 'bicycling'):
            mode = 'bicycling'
            self.matrix = self.client.distance_matrix(origins, destinations, mode)
        elif(transport == 'walking')
            mode = 'walking'
            self.matrix = self.client.distance_matrix(origins, destinations, mode)
        print(self.matrix)

        return self.matrix

