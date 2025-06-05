import sqlite3

def drop_all_tables():
    db_path = 'db/vehicles.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Получаем список всех пользовательских таблиц
    cursor.execute('''
        DELETE FROM vehicles
        WHERE id NOT IN (
            SELECT MIN(id)
            FROM vehicles
            GROUP BY car_number, price_won, title
        );
    ''')

    conn.commit()
    conn.close()

drop_all_tables()
