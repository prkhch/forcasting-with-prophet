from flask import Blueprint, request

bp = Blueprint('main', __name__, url_prefix='/')

@bp.route("/xls", methods=['GET', 'POST'])
def postXlsFile():

    import pandas as pd

    if request.method == 'POST':
        fileData = request.files.get('fileData')
        fileName = request.files.get('fileName')
    return 'asdasd'