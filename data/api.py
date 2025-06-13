import sqlite3

def drop_table():
    conn = sqlite3.connect('db/test.db')
    conn.execute("DROP TABLE IF EXISTS cars")
    conn.commit()
    conn.close()


def remove_duplicates():
    conn = sqlite3.connect('db.sqlite3')
    conn.execute("""
        DELETE FROM cars
        WHERE rowid NOT IN (
            SELECT MIN(rowid)
            FROM cars
            GROUP BY car_number
        )
    """)
    conn.commit()
    conn.close()

drop_table()