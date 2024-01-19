from flask import Blueprint, request
import pandas as pd
from io import BytesIO

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route("/xls", methods=['POST'])
def postXlsFile():
    print(list(request.files.keys()))
    fileData = request.files.get('file')
    print(fileData)


    if fileData :
        file_stream = BytesIO(fileData.read())
        df = pd.read_excel(file_stream,  engine = "openpyxl")
        return df.to_json(orient='records')
    else:
        return "File not received"

