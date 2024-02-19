from flask import Blueprint, request, jsonify
from io import BytesIO
import pandas as pd
from prophet import Prophet
from prophet.plot import add_changepoints_to_plot, plot_weekly, plot_yearly
import matplotlib
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
    file_data = request.files.get('file')
    string_options = request.form.get("options")
    options = json.loads(string_options)

    if file_data:
        df = read_file(file_data)
        images_dict = {}

        try :
            for column in df.keys()[1:]:
                single_df = df[['Date', column]]  # 데이터셋 분리
                single_df = single_df.rename(columns={'Date': 'ds', column: 'y'})  # 데이터셋 열이름 변경
                m = Prophet(
                    growth=options["growth"],
                    changepoint_prior_scale=options["cpScale"],
                    changepoints=options["cpList"],
                    holidays_prior_scale=options["holidayScale"],
                    yearly_seasonality=options["yearlyScale"],
                    weekly_seasonality=options["weeklyScale"],
                    seasonality_mode=options["seasonMode"],
                    seasonality_prior_scale=options["seasonScale"]
                )  # 모델 생성
                if options["growth"] == 'logistic':
                    if options["dfCap"]:
                        single_df['cap'] = options["dfCap"]
                    if options["dfFloor"]:
                        single_df['floor'] = options["dfFloor"]
                if options["holidays"] != "none":
                    m.add_country_holidays(country_name=options["holidays"])  # 공휴일 국가코드 설정
                m.fit(single_df)  # 피팅
                if 'yearly' in m.seasonalities:
                    plot_yearly(m)
                if 'weekly' in m.seasonalities:
                    plot_weekly(m)
                future = m.make_future_dataframe(periods=options["periods"])  # 예측 기간
                if options["growth"] == 'logistic':
                    if options["ftCap"]:
                        future['cap'] = options["ftCap"]
                    if options["ftFloor"]:
                        future['floor'] = options["ftFloor"]
                forecast = m.predict(future)  # 예측
                # print(forecast)
                # print(m.growth)
                # print(m.changepoint_prior_scale)
                # print(m.changepoints)
                # print(m.holidays_prior_scale)
                # print(m.yearly_seasonality)
                # print(m.weekly_seasonality)
                # print(m.seasonality_mode)
                # print(m.seasonality_prior_scale)
                # print(m.country_holidays)

                # y ds
                fig1 = m.plot(forecast, figsize=(8, 8))  # 이미지 저장
                add_changepoints_to_plot(fig1.gca(), m, forecast, threshold=options["cpThreshold"])  # change_points

                # components ds
                fig2 = m.plot_components(forecast, figsize=(8, 8))

                # save local
                # fig1.savefig('static/images/prophet_plot.png')
                # fig2.savefig('static/images/prophet_plot2.png')

                # image to json
                encoded_fig1 = encode_image_to_base64(fig1)
                encoded_fig2 = encode_image_to_base64(fig2)
                images_dict[column] = [encoded_fig1, encoded_fig2]
        except ValueError as e :
            return jsonify({'error': str(e)}), 400

        images_json = json.dumps(images_dict)
        return images_json
    else:
        return "File not received"
