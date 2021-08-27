import datetime

from domain.database_connections import query_remote_db


def test():
    query_str = "select * from db_table1;"
    # Call the function that we use to query the DB 100 times. We should expect
    # this to complete in a reasonable amount of time i.e < 1 second.
    for _ in range(1000):
        query_remote_db(query_str=query_str)


if __name__ == "__main__":
    time_start = datetime.time
    test()
    time_end = datetime.time

    print(time_end - time_start)
