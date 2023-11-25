from models.models import *
import pandas
# query = PDDieu.select().join(PDDeMuc)

# for dieu in query:
#     chude_id = dieu.demuc_id.chude_id.id
#     dieu.chude_id = chude_id
#     PDDieu.update(chude_id=chude_id).where(PDDieu.mapc == dieu.mapc).execute()
#     print("Updated dieu: " + dieu.mapc)

chude = PDChuDe.select()
for cd in chude:
    query = PDDieu.select().where(PDDieu.chude_id == cd.id)
    df = pandas.DataFrame(list(query.dicts()))
    df.to_csv("./dieu_corpus/" + cd.id + ".csv", index=False)
