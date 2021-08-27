from typing import List

import psycopg2
from app.data import models
from cryptography import fernet
from django.conf import settings

VALID_CONNECTION = "Valid connection"


def _decrypt_password(password: str) -> str:
    key = settings.ENCRYPTION_KEY.encode("utf_8")
    f = fernet.Fernet(key)
    bytes_pw = password[2:-1].encode("utf_8")
    decrypted_pw = f.decrypt(bytes_pw)
    return decrypted_pw.decode("utf_8")


def get_connection_status() -> str:
    try:
        current_connection_object = _get_current_connection_object()
    except models.RemoteDatabaseConnections.DoesNotExist:
        return "No db connection config set"

    connection_params = _get_connection_params(current_connection_object)

    try:
        connection = psycopg2.connect(**connection_params)
    except Exception as e:
        return f"Invalid db connection config: {e}"

    connection.close()
    return VALID_CONNECTION


def is_valid_connection(connection_status: str) -> bool:
    return True if connection_status == VALID_CONNECTION else False


def _get_current_connection_object() -> models.RemoteDatabaseConnections:
    return models.RemoteDatabaseConnections.objects.all().latest("created_at")


def _get_connection_params(connection_object: models.RemoteDatabaseConnections) -> dict:
    return {
        "host": connection_object.host,
        "port": connection_object.port,
        "database": connection_object.database,
        "user": connection_object.user,
        "password": _decrypt_password(connection_object.password),
    }


def query_remote_db(query_str: str) -> List[dict]:
    current_connection_object = _get_current_connection_object()
    connection_params = _get_connection_params(current_connection_object)
    out = []
    with psycopg2.connect(**connection_params) as connection:
        with connection.cursor() as cursor:
            cursor.execute(query_str)
            column_names = [desc[0] for desc in cursor.description]
            results = cursor.fetchall()
            for row in results:
                out.append(dict(zip(column_names, row)))
    return out
