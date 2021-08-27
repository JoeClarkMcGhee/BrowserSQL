from django.contrib import admin
from django.urls import include, path

VERSION_ONE = "api/v1"

urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{VERSION_ONE}/api-auth/", include("rest_framework.urls")),
    path(f"{VERSION_ONE}/dj-rest-auth/", include("dj_rest_auth.urls")),  # login
    path(
        f"{VERSION_ONE}/dj-rest-auth/registration/",
        include("dj_rest_auth.registration.urls"),
    ),  # signup
    path(f"{VERSION_ONE}/users/", include("app.interfaces.users.urls")),
    path(
        f"{VERSION_ONE}/database-connections/",
        include("app.interfaces.database_connections.urls"),
    ),
]
