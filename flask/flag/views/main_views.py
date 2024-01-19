from flask import Blueprint, request
from io import BytesIO
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import random
import seaborn as sns
from prophet import Prophet

bp = Blueprint('main', __name__, url_prefix='/')


import pandas as pd

def read_file(file_stream):
    file_extension = file_stream.name.split('.')[-1]

    if file_extension.lower() == 'csv':
        df = pd.read_csv(file_stream)
    elif file_extension.lower() in ['xls', 'xlsx']:
        df = pd.read_excel(file_stream, engine='openpyxl')
    else:
        raise ValueError("Unsupported file format")

    return df


@bp.route("/api/prophet", methods=['POST'])
def postXlsFile():
    fileData = request.files.get('file')

    if fileData:
        file_stream = BytesIO(fileData.read())
        df = pd.read_excel(file_stream, engine="openpyxl")

        for column in df.keys()[1:] :
            single_df = df[['Date', column]]
            single_df = single_df.rename(columns={'Date': 'ds', column: 'y'})

            m = Prophet()
            m.fit(single_df)

            future = m.make_future_dataframe(periods = 365)
            forcast = m.predict(future)
            print(forcast)
        return df.to_json(orient='records')
        # return "Good"
    else:
        return "File not received"
