from django import urls

from . import views

urlpatterns = [
    urls.path("set-database-config/", views.SetDatabaseConnection.as_view()),
    urls.path("get-database-config/", views.GetCurrentDatabaseConnection.as_view()),
    urls.path("get-status/", views.GetConnectionStatus.as_view()),
    urls.path("query-remote-db/", views.QueryRemoteDB.as_view()),
]
