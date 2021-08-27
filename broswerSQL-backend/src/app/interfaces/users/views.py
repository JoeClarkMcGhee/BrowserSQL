from django.contrib.auth import models
from rest_framework import generics

from . import serilizers


class ListUsers(generics.ListAPIView):
    queryset = models.User.objects.all()
    serializer_class = serilizers.UserSerializer


class DetailUserView(generics.RetrieveAPIView):
    queryset = models.User.objects.all()
    serializer_class = serilizers.UserSerializer


class DeleteUserView(generics.DestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serilizers.UserSerializer
