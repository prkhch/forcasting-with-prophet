from flask import Blueprint, request
from io import BytesIO
import pandas as pd
from prophet import Prophet
from prophet.plot import add_changepoints_to_plot, plot_weekly, plot_yearly
import matplotlib
from PIL import Image
import base64
import json

matplotlib.use('Agg')
bp = Blueprint('main', __name__, url_prefix='/')

def encode_image_to_base64(fig):
    buf = BytesIO()
    fig.savefig(buf, format='png')
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return image_base64

def read_file(fileData):
    file_extension = fileData.filename.split('.')[-1]
    file_stream = BytesIO(fileData.read())

    if file_extension.lower() == 'csv':
        df = pd.read_csv(file_stream, encoding='cp949')
    elif file_extension.lower() in ['xls', 'xlsx']:
        df = pd.read_excel(file_stream, engine='openpyxl')
    else:
        raise ValueError("Unsupported file format")

    return df

@bp.route("/api/pandas", methods=['POST'])
def toPandas():
    fileData = request.files.get('file')
    if fileData:
        df = read_file(fileData)
        return df.to_json(orient='records')
    else:
        return "File not received"

@bp.route("/api/prophet", methods=['POST'])
def toProphet():
    fileData = request.files.get('file')
    options = request.form.get("options")

    print("asdasdasdsd@@@@@@@@@@@@", options)

    if fileData:
        df = read_file(fileData)
        images_dict = {}

        for column in df.keys()[1:]:
            print(column)
            single_df = df[['Date', column]]  # 데이터셋 분리
            single_df = single_df.rename(columns={'Date': 'ds', column: 'y'})  # 데이터셋 열이름 변경
            m = Prophet(changepoints=['2022-05-12', '2022-10-23', '2022-02-03', '2022-07-07', '2022-06-06', '2022-03-03', '2022-04-05', '2022-08-08', '2022-09-09'])  # 모델 생성
            m.add_country_holidays(country_name='KR') # 공휴일 국가코드 설정
            m.fit(single_df)  # 피팅
            if 'yearly' in m.seasonalities:
                plot_yearly(m)
            if 'weekly' in m.seasonalities:
                plot_weekly(m)
            future = m.make_future_dataframe(periods=365)  # 365일 간
            forecast = m.predict(future)  # 예측
            print(forecast)

            # y ds
            fig1 = m.plot(forecast) # 이미지 저장
            add_changepoints_to_plot(fig1.gca(), m, forecast) # change_points
            # fig1.savefig('static/images/prophet_plot.png')

            # components ds
            fig2 = m.plot_components(forecast)
            # fig2.savefig('static/images/prophet_plot2.png')

            # image to json
            encoded_fig1 = encode_image_to_base64(fig1)
            encoded_fig2 = encode_image_to_base64(fig2)
            images_dict[column] = [encoded_fig1, encoded_fig2]

        images_json = json.dumps(images_dict)
        return images_json
    else:
        return "File not received"
