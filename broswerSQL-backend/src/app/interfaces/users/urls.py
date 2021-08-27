from django import urls

from . import views

urlpatterns = [
    urls.path("", views.ListUsers.as_view()),
    urls.path("<int:pk>/", views.DetailUserView.as_view()),
    urls.path("delete/<int:pk>/", views.DeleteUserView.as_view()),
]
