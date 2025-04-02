import os
import pandas as pd
import matplotlib.pyplot as plt
from sqlalchemy import create_engine
from matplotlib.ticker import MaxNLocator
from datetime import datetime

engine = create_engine("mysql+pymysql://a23inbnavnav_root:Pedralbes2023@dam.inspedralbes.cat/a23inbnavnav_dualspirit")

output_dir = "estadisticas_ranks"
os.makedirs(output_dir, exist_ok=True)

log_dir = "logs"
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, "logs.txt")

df = pd.read_sql("SELECT gamesPlayed FROM Users", con=engine)

ranks = {
    "Novato": df[df.gamesPlayed <= 2].shape[0],
    "Jugador Activo": df[(df.gamesPlayed > 2) & (df.gamesPlayed <= 5)].shape[0],
    "Leyenda": df[df.gamesPlayed > 5].shape[0]
}

fig, ax = plt.subplots()
bars = ax.bar(ranks.keys(), ranks.values(), color=['orange', 'yellow', 'green'])
ax.set_title("Jugadores por Rango")
ax.set_ylabel("Cantidad de Jugadores")
ax.set_xlabel("Rango")
ax.yaxis.set_major_locator(MaxNLocator(integer=True))

for bar in bars:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2, height + 0.1, str(int(height)), ha='center', fontsize=10)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
image_name = f"grafico_rangos_{timestamp}.png"
image_path = os.path.join(output_dir, image_name)

plt.savefig(image_path)
plt.close()

print(f"Gráfico creado: {image_path}")

log_message = f"[{datetime.now().isoformat()}] [ESTADISTICA] Estadística generada: {image_name} con datos → Novato: {ranks['Novato']}, Activo: {ranks['Jugador Activo']}, Leyenda: {ranks['Leyenda']}\n"

try:
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(log_message)
    print("Log guardado en logs.txt")
except Exception as e:
    print(f"Error al guardar log en archivo: {e}")
