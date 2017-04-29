from .models import Offer, Account
from rest_framework import serializers


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name', 'is_worker', 'email', 'picture')

class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('id', 'account', 'position', 'min_salary', 'max_salary', 'localization_x', 'localization_y')