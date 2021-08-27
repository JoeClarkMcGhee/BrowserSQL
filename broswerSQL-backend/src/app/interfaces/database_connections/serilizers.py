from app.data import models
from rest_framework import serializers


class DatabaseConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RemoteDatabaseConnections
        fields = ("host", "port", "database", "user", "password")


class DatabaseConnectionStatus(serializers.Serializer):
    connection_status = serializers.CharField()
