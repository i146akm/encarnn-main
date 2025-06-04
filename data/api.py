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
            GROUP BY car_number
        );


    ''')
    tables = cursor.fetchall()

    for table in tables:
        table_name = table[0]
        if table_name != 'sqlite_sequence':  # системная таблица автоинкремента
            cursor.execute(f'DELETE FROM vehicles')
            print(f"Удалена таблица: {table_name}")

    conn.commit()
    conn.close()

drop_all_tables()
