# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
import math
from django.shortcuts import render
from django.http import HttpResponse
from .models import Offer, Account
from rest_framework import generics
from .serializers import AccountSerializer, OfferSerializer
from .utils import DistanceMatrix
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Create your views here.

dist_matrix_util = DistanceMatrix()

@method_decorator(csrf_exempt, name='dispatch')
class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

@method_decorator(csrf_exempt, name='dispatch')
class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

@method_decorator(csrf_exempt, name='dispatch')
class OfferList(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

@method_decorator(csrf_exempt, name='dispatch')
class OfferDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer


def points2distance(olat, olng, dlat, dlong):
    start_long = math.radians(olng)
    start_latt = math.radians(olat)
    end_long = math.radians(dlong)
    end_latt = math.radians(dlat)
    d_latt = end_latt - start_latt
    d_long = end_long - start_long
    a = math.sin(d_latt / 2) ** 2 + math.cos(start_latt) * math.cos(end_latt) * math.sin(d_long / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    return 6371 * c

@csrf_exempt
def top_result(request):
    data = request.POST
    result = filter(lambda x: x.account.is_worker != data["is_worker"], Offer.objects.all())

    print(map(lambda x: (x.localization_x, x.localization_y), result))
    arr_matrix = dist_matrix_util.calc_matrix(data["localization_x"], data["localization_y"],
                                              map(lambda x: (x.localization_x, x.localization_y), result),
                                              data["transport"])



    new_result = []
    for i in range(0, len(arr_matrix["rows"][0]["elements"])):
        if arr_matrix["rows"][0]["elements"][i]["duration"]["value"] < data["max_time"]:
            new_result.append({"location_x": result[i].localization_x,
                               "location_y": result[i].localization_y,
                               "min_salary": result[i].min_salary,
                               "max_salary": result[i].max_salary,
                               "street": arr_matrix["destination_addresses"][i],
                               "time": arr_matrix["rows"][0]["elements"][i]["duration"]["value"],
                               "name": result[i].account.name,
                               "url": result[i].account.url})

    new_result.sort(key=lambda entity: entity['time'])

    if(len(new_result) < 4):
        radius = points2distance(data["localization_x"], data["localization_y"],new_result[len(new_result)-1]["location_x"], new_result[len(new_result)-1]["location_y"])
    else:
        radius = points2distance(data["localization_x"], data["localization_y"],new_result[3]["location_x"], new_result[3]["location_y"])

    new_result.append({"radius": radius})

    return HttpResponse(json.dumps(new_result))
    # return HttpResponse("lol")