"""closeenoughbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import searching.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^top_result/', searching.views.top_result),
    url(r'^offers/(?P<pk>[0-9]+)/$', searching.views.OfferDetail.as_view()),
    url(r'^offers/$', searching.views.OfferList.as_view()),
    url(r'^account/(?P<pk>[0-9]+)/$', searching.views.AccountDetail.as_view()),
    url(r'^account/$', searching.views.AccountList.as_view()),
]
