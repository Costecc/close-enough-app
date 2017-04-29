# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
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

@csrf_exempt
def top_result(request):
    data = request.POST
    # data["localization_x"]
    # data["localization_y"]
    # data["is_worker"]
    # data["position"]
    # data["min_salary"]
    # data["transport"]
    # print(data)
    result = Offer.objects.all()
        # .filter(position=data["position"])
    # result = filter(lambda x: x.account.is_worker != data["is_worker"], result)
    # result = filter(lambda x: x.min_salary > data["min_salary"], result)
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

    return HttpResponse(json.dumps(sorted(new_result, key=lambda entity: entity['time'])))
    # return HttpResponse("lol")