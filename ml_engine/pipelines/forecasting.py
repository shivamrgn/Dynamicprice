import pandas as pd
from prophet import Prophet
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

class DemandForecaster:
    def __init__(self):
        self.prophet_model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
        self.xgb_model = xgb.XGBRegressor(objective='reg:squarederror', n_estimators=100)
    
    def train_prophet(self, df: pd.DataFrame, date_col: str, target_col: str):
        """
        Train Prophet model.
        df requires 'ds' (date) and 'y' (target) columns.
        """
        prophet_df = df[[date_col, target_col]].rename(columns={date_col: 'ds', target_col: 'y'})
        self.prophet_model.fit(prophet_df)
        return {"status": "success", "message": "Prophet model trained successfully."}

    def predict_prophet(self, periods: int = 30):
        future = self.prophet_model.make_future_dataframe(periods=periods)
        forecast = self.prophet_model.predict(future)
        return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]

    def train_xgb(self, X: pd.DataFrame, y: pd.Series):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.xgb_model.fit(X_train, y_train)
        preds = self.xgb_model.predict(X_test)
        rmse = mean_squared_error(y_test, preds, squared=False)
        return {"status": "success", "rmse": rmse}

    def predict_xgb(self, X: pd.DataFrame):
        return self.xgb_model.predict(X)
