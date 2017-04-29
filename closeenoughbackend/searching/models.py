# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Account(models.Model):
    name = models.TextField()
    is_worker = models.BooleanField()
    email = models.EmailField()
    picture = models.ImageField()
    url = models.TextField(default="lol")

    def __str__(self):
        return self.name


class Offer(models.Model):
    account = models.ForeignKey('Account', on_delete=models.CASCADE)
    position = models.TextField()
    min_salary = models.IntegerField()
    max_salary = models.IntegerField()
    localization_x = models.FloatField()
    localization_y = models.FloatField()

    def __str__(self):
        return str(self.account) + "offert"