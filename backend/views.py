from rest_framework import generics
from django.http import HttpResponse
from django.views import View
from .models import NGO
from .serializers import NGOSerializer
from django.db import connection
from rest_framework.response import Response
from collections import namedtuple
import json
import requests
from django.conf import settings

# Create your views here.
class NGOList(generics.ListAPIView):
    serializer_class = NGOSerializer
    
    def get(self, request):
        serializer = None
        lon = request.query_params.get('lon', None)
        lat = request.query_params.get('lat', None) 
        
        if lon is not None and lat is not None:
            
            address_dict = dict()
            # address_dict = self.get_address(lon, lat)

            # if address_dict['status'] == 'fail':
            #     return Response({"found_entries": 0})
            
            address_dict['postal_code'] = '560102'

            query = "select * from backend_ngo where (pincode='{}.0')".format(address_dict['postal_code'])
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query)
                    desc = cursor.description
                    nt_result = namedtuple('Result', [col[0] for col in desc])
                    model_tuple = [nt_result(*row) for row in cursor.fetchall()]
                    serializer = self.serializer_class(model_tuple, many=True)
            except :
                pass
            return Response(serializer.data)
        else:
            return Response({"found_entries": 0})

    def get_address(self, lon, lat):
        apikey = json.loads(open(settings.CONFIG_FILE_PATH, 'r').read())['GoogleAPIKey']
        mapsURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng={},{}&key={}'.format(lat,lon,apikey)
        address_dict = dict()
        address_dict['status'] = 'fail'
        try:
            response = requests.get(mapsURL) 
            if response.status_code == 200 and response.json()['status'] == 'OK':
                address_dict['status'] = 'ok'
                for result in response.json()['results'][0]['address_components']:
                    if 'postal_code' in result['types']:
                        address_dict['postal_code'] = result['long_name']
                    elif 'country' in result['types']:
                        address_dict['country'] = result['long_name']
                    elif 'administrative_area_level_1' in result['types']: # State
                        address_dict['state'] = result['long_name']
                    elif 'locality' in result['types']: # City
                        address_dict['city'] = result['long_name']
        except:
            print('Error in Maps API')

        return address_dict
                

class CityList(View):
    def get(self, request):
        response = {'status': 'fail'}
        query = "select DISTINCT city from backend_ngo ORDER by city ASC"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                result = [val[0] for val in cursor.fetchall()]
                response['data'] = result
                response['entries'] = str(len(result))
                response['status'] = 'ok'
        except :
            pass
        return HttpResponse(json.dumps(response))