from app.data import models
from app.domain import database_connections
from rest_framework import generics, response, status, views

from . import serilizers


class _DatabaseStatus:
    def __init__(self, connection_status):
        self.connection_status = connection_status


class SetDatabaseConnection(generics.CreateAPIView):
    serializer_class = serilizers.DatabaseConnectionSerializer


class GetCurrentDatabaseConnection(generics.RetrieveAPIView):
    queryset = models.RemoteDatabaseConnections.objects.all()
    serializer_class = serilizers.DatabaseConnectionSerializer

    def get_object(self) -> models.RemoteDatabaseConnections:
        return self.queryset.latest("created_at")


class GetConnectionStatus(views.APIView):
    def get(self, request, **kwargs) -> response.Response:
        connection_status = database_connections.get_connection_status()
        status_obj = serilizers.DatabaseConnectionStatus(
            _DatabaseStatus(connection_status)
        )
        return response.Response(status_obj.data)


class QueryRemoteDB(views.APIView):
    def post(self, request, **kwargs) -> response.Response:
        # Check connection status, return a 500 if the connection is not valid.
        connection_status = database_connections.get_connection_status()
        if not database_connections.is_valid_connection(connection_status):
            return response.Response(
                "bad remote db connection", status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Parse the query string from the request.
        query_string = request.data["query"].strip()

        # Try to query the remote DB with query_string. Return a 500 if an Exception is
        # raised or the result of the query as list of tuples, one tuple of each DB row.
        try:
            results = database_connections.query_remote_db(query_string)
        except Exception as e:
            return response.Response(
                f"bad query: {e}", status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return response.Response(status=status.HTTP_200_OK, data=results)
